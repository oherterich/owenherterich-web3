<?php
	//Connect to database
	$mysql = mysql_connect('127.0.0.1', 'root', 'abc123');

	// Check connection
	if (mysqli_connect_errno()){
			echo "Failed to connect to MySQL: " . mysqli_connect_error();
		}

		//Select our table
	mysql_select_db('spacejam', $mysql);

  // Remember to copy files from the SDK's src/ directory to a
  // directory in your application on the server, such as php-sdk/
  require_once('facebook-php-sdk/src/facebook.php');

  //local appId: 351013658375343
  //loca appSecret: 5ba7e2031260e348231fd73299661f9e

  $config = array(
    'appId' => '1400866013489701',
    'secret' => '97eb8d60bbb5e91997f879303032886e',
    'fileUpload' => true,
    'allowSignedRequest' => false // optional but should be set to false for non-canvas apps
  );

  $facebook = new Facebook($config);
  $user_id = $facebook->getUser();

  $photo = 'img/current-user-saved.png'; // Path to the photo on the local filesystem
  $message = 'SPACE JAMMMMMMMM!!!!';
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
		<section id="save">
			<h3><a id="save-image" href="#">Save image!</a></h3>
			  <?php
			    if($user_id) {

			      // We have a user ID, so probably a logged in user.
			      // If not, we'll get an exception, which we handle below.
			      try {

			        // Upload to a user's profile. The photo will be in the
			        // first album in the profile. You can also upload to
			        // a specific album by using /ALBUM_ID as the path 
			        $ret_obj = $facebook->api('/me/photos', 'POST', array(
			                                         'source' => '@' . $photo,
			                                         'message' => $message,
			                                         )
			                                      );
			        //echo '<pre>Photo ID: ' . $ret_obj['id'] . '</pre>';
			        //echo '<br /><a id="facebook-upload" href="' . $facebook->getLogoutUrl() . '">logout</a>';
			      } catch(FacebookApiException $e) {
			        // If the user is logged out, you can have a 
			        // user ID even though the access token is invalid.
			        // In this case, we'll get an exception, so we'll
			        // just ask the user to login again here.
			        $login_url = $facebook->getLoginUrl( array(
			                       'scope' => 'photo_upload'
			                       )); 
			      	echo 	'<h3><a id="facebook-upload" class="facebook-hidden" href="' . $login_url . '">Upload to Facebook!</a></h3>';
			        error_log($e->getType());
			        error_log($e->getMessage());
			      }   
			    } else {

			      // No user, print a link for the user to login
			      // To upload a photo to a user's wall, we need photo_upload  permission
			      // We'll use the current URL as the redirect_uri, so we don't
			      // need to specify it here.
			      $login_url = $facebook->getLoginUrl( array( 'scope' => 'photo_upload') );
			      echo 	'<h3><a id="facebook-upload" class="facebook-hidden" href="' . $login_url . '">Upload to Facebook!</a></h3>';

			    }

			  ?>
		</section>
		<section id="img-feed">
			<h1>Recently created images!</h1>
			<?php
				//Get all items in database
				$sql = "SELECT * FROM jamcentral";
				$query = mysql_query($sql);

				//Loop through our items in the feed
				while ($data = mysql_fetch_assoc($query)){
					echo '<img class="user-img" src="' . $data['url'] . '">';
				}
			?>
		</section>
	</section>

	<script src="js/create-image.js"></script>
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
</body>
</html>