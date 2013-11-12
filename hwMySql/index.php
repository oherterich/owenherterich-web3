<!DOCTYPE HTML>
<html>
	<head>
		<title>PHP Database Test</title>
		<link rel="stylesheet" href="css/style.css">
	</head>
	<body>
		<section id="main">
			<h1>Add messages to database</h1>
			<form action="index.php" method="post">
				<h3>From (#)</h3><input type="text" name="from">
				<h3>Message</h3><input type="text" name="message">
				<input type="submit" id="submit">
			</form>
			<table cellspacing="0">
				<tbody>
					<tr>
						<th>Id</th>
						<th>From</th>
						<th>Message</th>
						<th>Date</th>
					</tr>

<?php

	$mysql = mysql_connect('localhost', 'root', 'root');

	// Check connection
	if (mysqli_connect_errno()){
  		echo "Failed to connect to MySQL: " . mysqli_connect_error();
  	}

	mysql_select_db('hpca_test', $mysql);

	$sql = "SELECT * FROM Basic";
	$query = mysql_query($sql);
	
	while ($data = mysql_fetch_assoc($query)){
		echo "<tr>";
		echo "<td>" . $data['id'] . "</td>";
		echo "<td>" . $data['from_num'] . "</td>";
		echo "<td>" . $data['message'] . "</td>";
		echo "<td>" . $data['date_sent'] . "</td>";
		echo "</tr>";
	}

	echo "</tbody>";
	echo "</table>";

	if( isset( $_POST['from']) && isset( $_POST['message']) ) {

		if ($_POST['from'] == "" || $_POST['message'] == "") {
			echo "You did not enter all of the fields.";
		}
		else {
			$sql = "SELECT id FROM Basic";
			$query = mysql_query($sql);
			while ($data = mysql_fetch_assoc($query)) {
				$last_id = $data['id'];
			}

			$id = $last_id + 1;
			$from = $_POST['from'];
			$message = $_POST['message'];
			$date = date('d-m-Y H:i:s');

			$sql = "INSERT INTO Basic (id, from_num, message, date_sent) VALUES ('$id' , '$from' , '$message' , '$date')";
			$query = mysql_query($sql);

			echo mysql_error();
		}
	}


?>



	</body>
</html>