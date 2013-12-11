<?php
	function saveImage() {
		$imgWidth = 500;
		$imgHeight = 500;

		$layers = array();
		$layers[] = imagecreatefrompng("img/create-image/bg/bg1.png");
		$layers[] = imagecreatefrompng("img/create-image/character/character1.png");
		$layers[] = imagecreatefrompng("img/create-image/text/text1.png");

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

	if ( isset($_GET['save']) ) {
		saveImage();
	}
?>

<!doctype HTML>
<html>
<head>
	<title>JAM CENTRAL</title>

	<link rel="stylesheet" type="text/css" href="css/style.css">
</head>
<body>
	<section id="content">
		<h1>JAM CENTRAL</h1>
		<h3>Create your special SPACE JAM&copy; souvenir!</h3>
		<section id="image">

			<div id="bgParent">
			<img id="bgImg" class="customImg" src="img/create-image/bg/bg0.png">
			<div id="bgLeft" class="arrow arrow-left"></div>
			<div id="bgLabel" class="label-hidden"><h3>Background</h3></div>
			<div id="bgRight" class="arrow arrow-right"></div>
			</div>

			<div id="characterParent">
			<img id="characterImg" class="customImg" src="img/create-image/character/character0.png">
			<div id="characterLeft" class="arrow arrow-left"></div>
			<div id="characterLabel" class="label-hidden"><h3>Character</h3></div>
			<div id="characterRight" class="arrow arrow-right"></div>
			</div>

			<div id="textParent">
			<img id="textImg" class="customImg" src="img/create-image/text/text0.png">
			<div id="textLeft" class="arrow arrow-left"></div>
			<div id="textLabel" class="label-hidden"><h3>Text</h3></div>
			<div id="textRight" class="arrow arrow-right"></div>
			</div>
		</section>
		<!--<a id="save-image" href="jamcentral.php?save=true">Save image!</a>-->
		<a id="save-image" href="#">Save image!</a>
		<a href="#">Upload to Facebook!</a>
	</section>
	</section>

	<script src="js/create-image.js"></script>
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
</body>
</html>