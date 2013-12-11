<?php

	if ( isset( $_POST['bg']) && isset( $_POST['character']) && isset( $_POST['text'])){
		$bg = $_POST['bg'];
		$character = $_POST['character'];
		$text = $_POST['text'];

		saveImage($bg, $character, $text);
	}

	function saveImage($bg, $character, $text) {
		$imgWidth = 500;
		$imgHeight = 500;

		$layers = array();
		$layers[] = imagecreatefrompng("img/create-image/bg/bg" . $bg . ".png");
		$layers[] = imagecreatefrompng("img/create-image/character/character" . $character . ".png");
		$layers[] = imagecreatefrompng("img/create-image/text/text" . $text . ".png");

		$image = imagecreatetruecolor($imgWidth, $imgHeight);

		imagealphablending($image, true);
		for ($i = 0; $i < count($layers); $i++) {
		  imagecopymerge_alpha($image, $layers[$i], 0, 0, 0, 0, $imgWidth, $imgHeight, 100);
		}
		imagealphablending($image, false);
		imagesavealpha($image, true);

		imagepng($image, "hello.png");
	}

	function imagecopymerge_alpha($dst_im, $src_im, $dst_x, $dst_y, $src_x, $src_y, $src_w, $src_h, $pct){ 
        // creating a cut resource 
        $cut = imagecreatetruecolor($src_w, $src_h); 

        // copying relevant section from background to the cut resource 
        imagecopy($cut, $dst_im, 0, 0, $dst_x, $dst_y, $src_w, $src_h); 
        
        // copying relevant section from watermark to the cut resource 
        imagecopy($cut, $src_im, 0, 0, $src_x, $src_y, $src_w, $src_h); 
        
        // insert cut resource to destination image 
        imagecopymerge($dst_im, $cut, $dst_x, $dst_y, 0, 0, $src_w, $src_h, $pct); 
    } 

    //saveImage();

?>