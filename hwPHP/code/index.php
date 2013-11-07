<!DOCTYPE HTML>
<html>
<head>
	<title>Weather</title>
	<link rel="stylesheet" href="css/style.css">
</head>

<body>



<?php
	
  //Set up these variables that we will use later. Initialize them to be "undefined."
	$location = "Undefined"; //The city from which we're pulling data
	$temp_f = "Undefined"; //The temperature, which I don't use right now (but maybe someday!)
	$weather = "Undefined"; //The forecast (clear, overcast, rain, etc.)
	$error = "Undefined"; //If we find an error message (i.e. location does not exist)


  //This is the main functionality. If we have $_GET['zip'], that means that the user has
  //inputted a zip code in order to find the weather. If they have done this, let's get the right
  //weather info and display that. If the zip code does not exist, we'll tell the user that and prompt
  //them to try another zip code.
  if (isset($_GET['zip'])):

    //If we have sent a zip code via the form, run the following function, which accesses the
    //Weather Underground API and returns the weather from that specific zip
  	getWeatherInfo();

    //If there was no error, display the weather and another input box in case they want to enter another zip.
  	if ($error != 'querynotfound') {
  		echo '<h1 id="location">The weather in ' . $location . ' is</h1>';
  		checkWeather();
  		drawInputBoxSuccess();	
  	}
    //If the zip does not exist, display that and prompt for another zip.
  	else {
  		echo "<h1 id='error'>That place doesn't exist. Try again.</h1>";
  		drawInputBoxError();	
  	}

  //The following code is what is initially displayed when the user first reaches the site.
  //This means that there that $_GET['zip'] does not yet exist. Prompt the user to enter
  //a zip code via the form.
  else:?>
  	<section id="form">
  	<form action="index.php" method="get">
  	<h1>Want to know the weather?</h1>
	<h1>You should enter your zip code.</h1>
	<input type="text" name="zip">
	<input type="submit" id="submit">
	</section>
  <?php endif;

  //This function accesses the Weather Underground API and parses the JSON data we receive.
  function getWeatherInfo() {

    //We get the zip function the user submitted earlier in order to use it in our call to WU API
    //We also need to declare these variables as global because we use them outside of this local function
  	$zip = $_GET['zip'];
  	global $location;
  	global $temp_f;
  	global $weather;
  	global $error;

    //Let's get that data.
    $key = "ENTER YOUR KEY HERE";
  	$json_string = file_get_contents("http://api.wunderground.com/api/" . $key . "/conditions/q/" . $zip . ".json");
  	$parsed_json = json_decode($json_string);
  	$error = $parsed_json->{'response'}->{'error'}->{'type'};

    //If we do not find an error, get the location, temperature, and forecast.
  	if ($error != 'querynotfound') {
	  	$location = $parsed_json->{'current_observation'}->{'display_location'}->{'city'};
	  	$temp_f = $parsed_json->{'current_observation'}->{'temp_f'};
	  	$weather = $parsed_json->{'current_observation'}->{'weather'};
  	}
  }

  //This is the input box that the user sees when the zip code entered is incorrect or has an error.
  function drawInputBoxError() {
  	?>
  	<section id="form-small">
  	<form action="index.php" method="get">
  	<h2>Zip code, please.</h1>
	<input type="text" name="zip">
	<input type="submit" id="submit">
	</section>
  <?php }

  //This is the input box that the user sees underneath the giant weather status.
    function drawInputBoxSuccess() {
  	?>
  	<section id="form-small">
  	<form action="index.php" method="get">
  	<h2>More weather? Enter a zip code.</h1>
	<input type="text" name="zip">
	<input type="submit" id="submit">
	</section>
  <?php }

  //This function checks the status of the weather and displays the correct term on the screen.
  //Weather Underground has a finite list of terms that may appear, so we check the data and
  //guide to the correct if statement. We then create an element on the page according to
  //the correct data from WU.
  function checkWeather() {
  	global $weather;

  	if ($weather == 'Overcast') {
  		echo "<section id='weather'>";
      echo "<h1 id='weather-type'>OVERCAST</h1>";
  		echo "</section>";
  	}

  	else if ($weather == 'Partly Cloudy' || $weather == 'Mostly Cloudy' || $weather == 'Scattered Clouds') {
  		echo "<section id='weather'>";
      echo "<h1 id='weather-type'>CLOUDY</h1>";
  		echo "</section>";
  	}

  	else if ($weather == 'Clear') {
  		echo "<section id='weather'>";
      echo "<h1 id='weather-type'>CLEAR</h1>";
  		echo "</section>";
  	}

  	else if ($weather == 'Rain' || $weather == 'Drizzle' || $weather == 'Spray' || $weather == 'Rain Mist' || $weather == 'Rain Showers') {
  		echo "<section id='weather'>";
      echo "<h1 id='weather-type'>RAIN</h1>";
  		echo "</section>";
  	}

  	else if ($weather == 'Snow' || $weather == 'Snow Grains' || $weather == 'Low Drifting Snow' || $weather == 'Blowing Snow' || $weather == 'Snow Showers' || $weather == 'Snow Blowing Snow Mist') {
  		echo "<section id='weather'>";
      echo "<h1 id='weather-type'>SNOW</h1>";
  		echo "</section>";
  	}

  	else if ($weather == 'Thunderstorm' || $weather == 'Thunderstorms and Rain') {
  		echo "<section id='weather'>";
      echo "<h1 id='weather-type'>STORMS</h1>";
  		echo "</section>";
  	}

  	else if ($weather == 'Patches of Fog' || $weather == 'Shallow Fog' || $weather == 'Partial Fog') {
  		echo "<section id='weather'>";
      echo "<h1 id='weather-type'>FOGGY</h1>";
  		echo "</section>";
  	}
  }
?>

<script>
  //A little bit of JS that will give us a random background color each time that we load the page. Nice!
	var pallette = ["#014261", "#699A81", "#BD9E65", "#C27860", "#506C81"];
	var rand = Math.floor(Math.random() * pallette.length);
	document.body.style.backgroundColor = pallette[rand];
</script>
</body>

</html>