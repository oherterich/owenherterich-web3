<!DOCTYPE HTML>
<html>
<head>
	<title>Weather</title>
	<link rel="stylesheet" href="css/style.css">
</head>

<body>



<?php
	
	$location = "Undefined";
	$temp_f = "Undefined"; 
	$weather = "Undefined";
	$error = "Undefined";


  if (isset($_GET['zip'])):
  	getWeatherInfo();
  	if ($error != 'querynotfound') {
  		echo '<h1 id="location">The weather in ' . $location . ' is</h1>';
  		checkWeather();
  		drawInputBoxSuccess();	
  	}
  	else {
  		echo "<h1 id='error'>That place doesn't exist. Try again.</h1>";
  		drawInputBoxError();	
  	}


  else:?>
  	<section id="form">
  	<form action="index.php" method="get">
  	<h1>Want to know the weather?</h1>
	<h1>You should enter your zip code.</h1>
	<input type="text" name="zip">
	<input type="submit" id="submit">
	</section>
  <?php endif;

  function getWeatherInfo() {
  	$zip = $_GET['zip'];
  	global $location;
  	global $temp_f;
  	global $weather;
  	global $error;

  	$json_string = file_get_contents("http://api.wunderground.com/api/b133584ee6715dbc/conditions/q/" . $zip . ".json");
  	$parsed_json = json_decode($json_string);
  	$error = $parsed_json->{'response'}->{'error'}->{'type'};

  	if ($error != 'querynotfound') {
	  	$location = $parsed_json->{'current_observation'}->{'display_location'}->{'city'};
	  	$temp_f = $parsed_json->{'current_observation'}->{'temp_f'};
	  	$weather = $parsed_json->{'current_observation'}->{'weather'};
  	}
  	else {
  		//do something else
  	}
  }

  function drawInputBoxError() {
  	?>
  	<section id="form-small">
  	<form action="index.php" method="get">
  	<h2>Zip code, please.</h1>
	<input type="text" name="zip">
	<input type="submit" id="submit">
	</section>
  <?php }

    function drawInputBoxSuccess() {
  	?>
  	<section id="form-small">
  	<form action="index.php" method="get">
  	<h2>More weather? Enter a zip code.</h1>
	<input type="text" name="zip">
	<input type="submit" id="submit">
	</section>
  <?php }

  function checkWeather() {
  	global $weather;

  	if ($weather == 'Overcast') {
  		echo "<section id='weather'>";
  		echo "<img src='img/overcast.png'>";
  		echo "</section>";
  	}

  	else if ($weather == 'Partly Cloudy' || $weather == 'Mostly Cloudy' || $weather == 'Scattered Clouds') {
  		echo "<section id='weather'>";
  		echo "<img src='img/cloudy.png'>";
  		echo "</section>";
  	}

  	else if ($weather == 'Clear') {
  		echo "<section id='weather'>";
  		echo "<img src='img/clear.png'>";
  		echo "</section>";
  	}

  	else if ($weather == 'Rain' || $weather == 'Drizzle' || $weather == 'Spray' || $weather == 'Rain Mist' || $weather == 'Rain Showers') {
  		echo "<section id='weather'>";
  		echo "<img src='img/rain.png'>";
  		echo "</section>";
  	}

  	else if ($weather == 'Snow' || $weather == 'Snow Grains' || $weather == 'Low Drifting Snow' || $weather == 'Blowing Snow' || $weather == 'Snow Showers' || $weather == 'Snow Blowing Snow Mist') {
  		echo "<section id='weather'>";
  		echo "<img src='img/snow.png'>";
  		echo "</section>";
  	}

  	else if ($weather == 'Thunderstorm' || $weather == 'Thunderstorms and Rain') {
  		echo "<section id='weather'>";
  		echo "<img src='img/storms.png'>";
  		echo "</section>";
  	}

  	else if ($weather == 'Patches of Fog' || $weather == 'Shallow Fog' || $weather == 'Partial Fog') {
  		echo "<section id='weather'>";
  		echo "<img src='img/foggy.png'>";
  		echo "</section>";
  	}
  }
?>

<script>
	var pallette = ["#014261", "#699A81", "#BD9E65", "#C27860", "#506C81"];
	var rand = Math.floor(Math.random() * pallette.length);
	console.log(pallette);
	document.body.style.backgroundColor = pallette[rand];
</script>
</body>

</html>