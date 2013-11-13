<!DOCTYPE HTML>
<html>
	<head>
		<title>PHP Database Test</title>
		<link rel="stylesheet" href="css/style.css">
	</head>
	<body>
		<section id="main">
			<article id="add-messages">
				<h1>Add SMS Messages to the Database</h1>
				<p>These messages must be in the correct format.</p>
				<p>They must be a three or four digit number, and start with either 1 or 2.</p>
				<p>The list of correct codes can be viewed in poster form: <a href="img/poster-01.jpg">English</a> | <a href="img/poster-02.jpg">Zulu</a>
				<h4>You can also add messages using SMS messages by sending a correctly formatted message to: (646) 824 - 4143</h4>
				<form action="index.php" method="post">
					<h3>From (#)</h3><input type="text" name="from">
					<h3>Message</h3><input type="text" name="message">
					<input type="submit" id="submit">
				</form>
			</article>

			<article id="main-table">
			<h2>All Incoming Messages</h2>
			<table cellspacing="0">
				<tbody>
					<tr>
						<th>Code</th>
						<th>Date</th>
						<th>From</th>
					</tr>

<?php
	
	//These two arrays are used to sort the database items according to message or by phone number.
	$messageList = array();
	$fromList = array();

	//Connect to database
	$mysql = mysql_connect('127.0.0.1', 'root', '*******');

	// Check connection
	if (mysqli_connect_errno()){
  		echo "Failed to connect to MySQL: " . mysqli_connect_error();
  	}

  	//Select our table
	mysql_select_db('hpca', $mysql);

	//Get all items in database
	$sql = "SELECT * FROM Basic";
	$query = mysql_query($sql);
	
	//Loop through our items.
	while ($data = mysql_fetch_assoc($query)){

		//Put the messages and phone numbers into their respective arrays (so that we can sort them later)
		array_push($messageList, $data['message']);
		array_push($fromList, $data['from_num']);

		//Add more rows to the table
		echo "<tr>";
		echo "<td>" . $data['message'] . "</td>";
		echo "<td>" . $data['date_sent'] . "</td>";
		echo "<td>" . $data['from_num'] . "</td>";
		echo "</tr>";
	}

	echo "</tbody>";
	echo "</table>";
	echo "</article>"

?>
	<article id="common-codes-table">
	<h2>Most Requested Codes</h2>
	<table cellspacing="0">
				<tbody>
					<tr>
						<th>#</th>
						<th>From</th>
						<th>Num. of Requests</th>
					</tr>

<?php
	
	//We need to sort our messages by the number of times they are present.
	//The function array_count_values returns an array that allows us to see this.
	//The array is formatted as follows: ["111" => "1", "121" => "3", "1311" => "3"]
	//where "111" is the message and "1" is the number of times it is present
	//We then sort the array to have our most frequent messages first.
	$countMessages = array_count_values($messageList);
	arsort($countMessages);

	//Loop through this array and put new rows in the table,
	//but only if the frequency of the message is more than one.
	$num = 1;
	foreach( $countMessages as $x=>$x_value) {
		if ($x_value > 1) {
			echo "<tr>";
			echo "<td>" . $num . "</td>";
			echo "<td>" . $x . "</td>";
			echo "<td>" . $x_value . " Requests</td>";
			echo "</tr>";

			$num += 1;
		}
	}

	echo "</tbody>";
	echo "</table>";
	echo "</article>";

?>	<article id="common-numbers-table">
	<h2>Most Common Phone Numbers</h2>
	<table cellspacing="0">
				<tbody>
					<tr>
						<th>#</th>
						<th>From</th>
						<th>Num. of Requests</th>
					</tr>

<?php

	//Same as above, but with different values.
	//This time we use the phone numbers.
	$countFrom = array_count_values($fromList);
	arsort($countFrom);

	$num = 1;
	foreach($countFrom as $x=>$x_value) {
		if ($x_value > 1) {
			echo "<tr>";
			echo "<td>" . $num . "</td>";
			echo "<td>" . $x . "</td>";
			echo "<td>" . $x_value . "</td>";
			echo "</tr>";

			$num += 1;
		}
	}

	echo "</tbody>";
	echo "</table>";
	echo "</article>";


	//Get information from form
	if( isset( $_POST['from']) && isset( $_POST['message']) ) {

		//If no information is entered, prompt the user to try again.
		if ($_POST['from'] == "" || $_POST['message'] == "") {
			echo "<div id='alert'><h3>You did not enter all of the fields. Please try again.</h3></div>";
		}
		else {
			//If we have our info, put that info in variables.
			$message = $_POST['message'];

			//Get the first digit and the length in order to check to see if the code is correctly formatted.
			$first = substr($message, 0, 1);
			$length = strlen($message);

			//Only add message to database if it is correctly formatted.
			if ($first == '1' || $first == '2') {
				if ($length == 3 || $length == 4) {
					//These next few lines allow us to assign the next number to be the id.
					//For example, if there are 15 items in the database, the next id will be 16
					$sql = "SELECT id FROM Basic";
					$query = mysql_query($sql);

					while ($data = mysql_fetch_assoc($query)) {
						$last_id = $data['id'];
					}

					$id = $last_id + 1;

					//Because we are sort of cheating and adding fake SMS messages to the database,
					//we should just assign a random number as the message_id (which would normally
					//just be assigned)
					$message_id = rand(1000000, 9999999);
					$from = $_POST['from'];
					$date = date('d-m-Y H:i:s');

					//Insert the info into our database
					$sql = "INSERT INTO Basic (id, message_id, from_num, message, date_sent) VALUES ('$id' ,'$message_id', '$from' , '$message' , '$date')";
					$query = mysql_query($sql);

					echo mysql_error();
				}
			}
			//If the code is incorrectly formatted, prompt the user to try again.
			else {
				echo "<div id='alert'><h3>You submitted an incorrectly formatted message! Please try again.</h3></div>";
			}
		}
	}


?>

		<footer>
			<p>HPCA  |  Parsons The New School for Design  |  Open Society Foundations &copy; 2013</p>
		</footer>
	</section>
	</body>
</html>