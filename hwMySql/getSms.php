<?php

/*
This code is triggered when an SMS message is sent via SmsSync (an Android application).
The information from the message message is collected, interpreted, and added to the database.
*/

/*=================================================================*/
/*=====SET UP INITIAL VARIABLES AND CODE ARRAYS FROM XML FILES=====*/
/*=================================================================*/

//Initial variables (in case we want to test locally)
$from = "12314513512";
$message = "123";
$msg = "If you get this, nothing worked.";

//Set the data that the message was received.
date_default_timezone_set('Africa/Johannesburg');
$date = date('d-m-Y H:i:s');

//Load in XML files with code information
$xmlzulu = simplexml_load_file("information_zulu.xml");
$xmlenglish = simplexml_load_file("information_english.xml");
$xmlhospice = simplexml_load_file("hospice_list.xml");

//Load in list of questions
$file = "questionlist.xml";
$questionlist = simplexml_load_file($file);

//Load in list of contacts
$numberfile = "numberlist.xml";
$numberlist = simplexml_load_file($numberfile);

//Add all Zulu codes to an array
foreach($xmlzulu->subject as $z) {
$subjectzulu[] = $z;
}

$zululength = sizeof($subjectzulu);

//Load all English codes to an array
foreach($xmlenglish->subject as $e) {
$subjectenglish[] = $e;
}

$englishlength = sizeof($subjectenglish);

//Load all hospice codes to an array
foreach($xmlhospice as $h) {
$hospicelist[] = $h;
}

$hospicelength = sizeof($hospicelist);

//This variable is used to determine whether the code was formatted correctly
$correct = false;

/*=================================================================*/
/*================GET INFO FROM INCOMING SMS MESSAGE===============*/
/*=================================================================*/

// Get the phone number that sent the SMS.
if (isset($_POST['from'])) {
    $from = $_POST['from'];
}
 
// Get the SMS aka the message sent.
if (isset($_POST['message'])) {
    $message = $_POST['message'];
}
 
// Get secret key to validate later.
if (isset($_POST['secret'])) {
    $secret = $_POST['secret'];
}
 
// Get the timestamp of the SMS
if(isset($_POST['sent_timestamp'])) {
    $sent_timestamp = $_POST['sent_timestamp'];
}
 
// Get phone number of the SMSSync device
if (isset($_POST['sent_to'])) {
    $sent_to = $_POST['sent_to'];
}
 
// Get the unique message id
if (isset($_POST['message_id'])) {
    $message_id = $_POST['message_id'];
}

/*=================================================================*/
/*=======SET UP MYSQL CONNECTION & ADD MESSAGE TO DATABASE=========*/
/*=================================================================*/

	//Connect to MySQL database
	$mysql = mysql_connect('127.0.0.1', 'root', '*******');

		// Check connection
		if (mysqli_connect_errno()){
	  		echo "Failed to connect to MySQL: " . mysqli_connect_error();
	  	}

	//Select our table
	mysql_select_db('hpca', $mysql);

	//If we have all of the information from the SMS message, add that information to the database
	if (isset($_POST['from']) && isset($_POST['message']) && isset($_POST['sent_timestamp']) && isset($_POST['message_id'])) {
		//These next few lines allow us to assign the next number to be the id.
		//For example, if there are 15 items in the database, the next id will be 16
		$sql = "SELECT id FROM Basic";
		$query = mysql_query($sql);
		while ($data = mysql_fetch_assoc($query)) {
			$last_id = $data['id'];
		}

		$id = $last_id + 1;

		//Insert all of this information into the database
		$sql = "INSERT INTO Basic (id, message_id, from_num, message, date_sent) VALUES ('$id' , '$message_id' , '$from' , '$message' , '$date')";
		$query = mysql_query($sql);

		echo mysql_error();
	}

/*=================================================================*/
/*==========LOOP THROUGH CODE ARRAYS AND CHECK FOR MATCH===========*/
/*=================================================================*/

//Loop through our code arrays and determine which response to send back.
//This is pretty confusing initially, because we have to check to see whether
//the replies have multiple parts. This is because SMS messages are concatenated.
for ($i = 0; $i < $zululength; $i++) {
	
	if ($message == $subjectzulu[$i]->code) { 
		
		$correct = true;

		$msg = (string)$subjectzulu[$i]->info;
		$reply[0] = array("to" => $from, "message" => $msg);

		$message2 = $subjectzulu[$i]->info2;
		if ($message2 != "") {
		 	$msg = (string)$subjectzulu[$i]->info2;
		 	$reply[1] = array("to" => $from, "message" => $msg);
		 }
		
		$message3 = $subjectzulu[$i]->info3;
		if ($message3 != "") {
			$msg = (string)$subjectzulu[$i]->info3;
		 	$reply[2] = array("to" => $from, "message" => $msg);
		}
		
		$message4 = $subjectzulu[$i]->info4;
		if ($message4 != "") {
			$msg = (string)$subjectzulu[$i]->info4;
		 	$reply[3] = array("to" => $from, "message" => $msg);
		}
		
		$message5 = $subjectzulu[$i]->info5;
		if ($message5 != "") {
			$msg = (string)$subjectzulu[$i]->info5;
		 	$reply[4] = array("to" => $from, "message" => $msg);
		} 
	}
		
	if ($message == $subjectenglish[$i]->code) { 
		
		$correct = true;

		$msg = (string)$subjectenglish[$i]->info;
		$reply[0] = array("to" => $from, "message" => $msg);

		$message2 = $subjectenglish[$i]->info2;
		if ($message2 != "") {
		 	$msg = (string)$subjectenglish[$i]->info2;
		 	$reply[1] = array("to" => $from, "message" => $msg);
		 }
		
		$message3 = $subjectenglish[$i]->info3;
		if ($message3 != "") {
			$msg = (string)$subjectenglish[$i]->info3;
		 	$reply[2] = array("to" => $from, "message" => $msg);
		}
		
		$message4 = $subjectenglish[$i]->info4;
		if ($message4 != "") {
			$msg = (string)$subjectenglish[$i]->info4;
		 	$reply[3] = array("to" => $from, "message" => $msg);
		}
		
		$message5 = $subjectenglish[$i]->info5;
		if ($message5 != "") {
			$msg = (string)$subjectenglish[$i]->info5;
		 	$reply[4] = array("to" => $from, "message" => $msg);
		} 
	}
		
}

/*=================================================================*/
/*==============CHECK FOR MISCELLANEOUS OTHER CODES================*/
/*=================================================================*/

//Sending responses to hospice location requests	
for ($j = 0; $j < $hospicelength; $j++) {
	if ($message == $hospicelist[$j]->code) { 
	$correct = true;
		$msg = (string)$hospicelist[$j]->info;
		$reply[0] = array("to" => $from, "message" => $msg);
	}
}

//For questions that are submitted
if (substr($message,0,4) == "000 ") {
	$correct = true;
	$msg = "Thank you for submitting your question or suggestion.";
	$reply[0] = array("to" => $from, "message" => $msg);


	$question = substr($message,4);
	$newMessage = $questionlist->addChild("message");
	$newMessage->addChild("question", $question);
	$newMessage->addChild("date", $date);
	$newMessage->addChild("from", $from);
	
	$dom = new DOMDocument("1.0");
	$dom->preserveWhiteSpace = false;
	$dom->formatOutput = true;
	$dom->loadXML($questionlist->asXML());
	$dom->saveXML();

	$dom->save($file);
}

//For adding contacts to messaging list
if (substr($message,0,8) == "hospice " || substr($message,0,8) == "Hospice " || substr($message,0,8) == "HOSPICE ") {
	$correct = true;
	
	foreach($numberlist->contact as $n) {
		if ($n->number == $from) {
			$msg = "Sorry, but it seems that you are already a member of our messaging list!";
			$reply[0] = array("to" => $from, "message" => $msg);

			$duplicate = true;
		}
	}
	
	if (!$duplicate) {
			$msg = "Thank you for signing up to our messaging list. You will now receive news, updates, and information from HPCA.";
			$reply[0] = array("to" => $from, "message" => $msg);

			$name = substr($message, 7);
			$newContact = $numberlist->addChild("contact");
			$newContact->addChild("name", $name);
			$newContact->addChild("number", $from);
	
			$dom = new DOMDocument("1.0");
			$dom->preserveWhiteSpace = false;
			$dom->formatOutput = true;
			$dom->loadXML($numberlist->asXML());
			$dom->saveXML();

			$dom->save($numberfile);
	}
}

//Automatic response if SMS received is incorrect
if ($correct == false) { 
	$msg = "The code or question you sent was incorrectly formatted or missing. Please make sure you are sending a valid SMS.";
	$reply[0] = array("to" => $from, "message" => $msg);
}

/*=================================================================*/
/*===========REPLY BACK TO SENDER WITH CORRECT MESSAGE=============*/
/*=================================================================*/

echo json_encode(array("payload"=>array(
    "success"=>"true",
    "task"=>"send",
    "messages"=>array_values($reply))));

?>