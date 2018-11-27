<?php
	//For computer
	$serverName="localhost";
	$userName="user";
	$password="1234";
	$dbName="batar";
	
	//For hosting
	/*$serverName="e0000.mysql.tools";
	$userName="e0000_db";
	$password="pxn2Qm84";
	$dbName="e0000_db";*/
	
	//Photos folder
	$photosFolder="photoes";
	
	//e-mail for get letter
	$eMail = "OlegFIRST@ukr.net";
	$subject = "From Batar";
	//$eMail = "sun.energy.if@gmail.com";
	
	//Data base UTF-8 correction
	function utf($conn){
		$sql="SET NAMES 'utf8' CALLATE 'utf8_general_ci'";
		$conn->query($sql);
		$sql="SET CHARACTER SET 'utf8'";
		$conn->query($sql);
	}
?>