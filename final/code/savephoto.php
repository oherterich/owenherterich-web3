<?php

	//This is where we get the index of the photos, sent via Javascript
	if ( isset( $_POST['bg']) && isset( $_POST['character']) && isset( $_POST['text'])){
		//There are three different photos: background, character, and text.
		$bg = $_POST['bg'];
		$character = $_POST['character'];
		$text = $_POST['text'];

		//Get the three index numbers and run the save image function I created.
		saveImage($bg, $character, $text);
	}

	//This function is where the real magic happens.
	function saveImage($bg, $character, $text) {

		//First we should define the dimensions of our image.
		$imgWidth = 500;
		$imgHeight = 500;

		//Create an array that will serve as the layers of our image.
		$layers = array();

		//Add our three layers to the layers array.
		$layers[] = imagecreatefrompng("img/create-image/bg/bg" . $bg . ".png");
		$layers[] = imagecreatefrompng("img/create-image/character/character" . $character . ".png");
		$layers[] = imagecreatefrompng("img/create-image/text/text" . $text . ".png");

		//These next lines were taken from the PHP reference for saving a PNG image.
		//Define a variable for the final output image.
		$image = imagecreatetruecolor($imgWidth, $imgHeight);

		//Turn on alpha blending while we are combining layers
		imagealphablending($image, true);

		//For each layer in our array, run the imagecopymerge_alpha PHP function.
		//This is how the layers are combined.
		for ($i = 0; $i < count($layers); $i++) {
			//I found the following function on the PHP reference site. It combines our layers with the alpha values intact.
		  	imagecopymerge_alpha($image, $layers[$i], 0, 0, 0, 0, $imgWidth, $imgHeight, 100);
		}
		//Kind of strange, but we need to turn the alpha blending back off after we've combined our layers.
		imagealphablending($image, false);
		imagesavealpha($image, true);

		//Create a new, unique id for each photo.
		$photoid = uniqid();
		$photourl = "img/jamcentral-user-img/" . $photoid . ".png";

		//In addition to saving the image with a unique id, we save it as the "current photo"
		//Just something I added in that makes it easier to send to Facebook later.
		$currentPhoto = "img/current-user-saved.png";

		//imagepng() saves our images. I save two, one as the current photo and one with the unique id.
		imagepng($image, $photourl);
		imagepng($image, $currentPhoto);

		///Run the save to database function, which saves the unique image url as well as the date.
		saveToDatabase( $photourl );

		//We want to give the unique id back to our Javascript file so that we can draw the photos on the page.
		echo $photourl;
	}

	//I found this function on the PHP reference site. Saves image layers together.
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

    //Simple function that just saves our photo url and the date to the database I have set up.
    function saveToDatabase ( $photourl ) {
    	$currentDate = date('d-m-Y H:i:s');

    	//Connect to database
    	$mysql = mysql_connect('127.0.0.1', 'root', 'abc123');

    	// Check connection
		// if (mysqli_connect_errno()){
	 //  		echo "Failed to connect to MySQL: " . mysqli_connect_error();
	 //  	}

	  	mysql_select_db('spacejam', $mysql);

	  	$sql = "INSERT INTO jamcentral ( url, date_saved ) VALUES ( '$photourl', '$currentDate' )";
	  	//$sql = "INSERT INTO jamcentral () VALUES ()";
	  	$query = mysql_query($sql);
    } 

?>