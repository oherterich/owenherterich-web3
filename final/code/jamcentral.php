<?php
	//Connect to database
	$mysql = mysql_connect('127.0.0.1', 'root', 'root');

	// Check connection
	if (mysqli_connect_errno()){
  		echo "Failed to connect to MySQL: " . mysqli_connect_error();
  	}

  	//Select our table
	mysql_select_db('spacejam', $mysql);
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
			<h3><a href="#">Upload to Facebook!</a></h3>
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