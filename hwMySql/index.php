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

	$messageList = [];
	$fromList = [];

	$mysql = mysql_connect('localhost', 'root', 'root');

	// Check connection
	if (mysqli_connect_errno()){
  		echo "Failed to connect to MySQL: " . mysqli_connect_error();
  	}

	mysql_select_db('hpca_test', $mysql);

	$sql = "SELECT * FROM Basic";
	$query = mysql_query($sql);
	
	while ($data = mysql_fetch_assoc($query)){

		array_push($messageList, $data['message']);
		array_push($fromList, $data['from_num']);

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

	$countMessages = array_count_values($messageList);
	arsort($countMessages);

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

		if ($_POST['from'] == "" || $_POST['message'] == "") {
			echo "<div id='alert'><h3>You did not enter all of the fields. Please try again.</h3></div>";
		}
		else {
			$message = $_POST['message'];
			$first = substr($message, 0, 1);
			$length = strlen($message);

			//Only add message to database if it is correctly formatted.
			if ($first == '1' || $first == '2') {
				if ($length == 3 || $length == 4) {
					$sql = "SELECT id FROM Basic";
					$query = mysql_query($sql);

					while ($data = mysql_fetch_assoc($query)) {
						$last_id = $data['id'];
					}

					$id = $last_id + 1;
					$message_id = rand(1000000, 9999999);
					$from = $_POST['from'];
					$date = date('d-m-Y H:i:s');

					$sql = "INSERT INTO Basic (id, message_id, from_num, message, date_sent) VALUES ('$id' ,'$message_id', '$from' , '$message' , '$date')";
					$query = mysql_query($sql);

					echo mysql_error();
				}
			}
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