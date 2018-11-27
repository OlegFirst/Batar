<?php
	
	include "../config.php";
	
	$method = $_SERVER['REQUEST_METHOD'];
	$input = file_get_contents("php://input");
	
	
	$to = $GLOBALS['eMail'];
	$subject = $GLOBALS['subject'];
	$message = "";
	
	if ($method==="POST") {
		$request = json_decode($input, true);
		
		$message = $message."Name: ".$request[0]['name']."\r";
		$message = $message."Surname: ".$request[0]['surname']."\r";
		$message = $message."E-mail: ".$request[0]['eMail']."\r";
		$message = $message."Location: ".$request[0]['location']."\r";
		$message = $message."Remark: ".$request[0]['remark']."\r";
		$message = $message."Basket:\r";
		
		$basket = $request[0]['basket'];
		for ($i = 0; $i < count($basket); $i++) {
			$item = "";
			$item = "- ".$item."Title: ".$basket[$i]['title'];
			$item = $item.", id=".$basket[$i]['id'];
			$item = $item.", count=".$basket[$i]['count'];
			$message = $message.$item."\r";
		}
		
		//$message = wordwrap($message, 70, "\r\n");
		if (mail($to, $subject, $message)) {
			echo json_encode($message);
		}
		else {
			echo "The server failed to send the message";
		}
	}

?>