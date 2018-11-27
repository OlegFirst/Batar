<?php

	function solarPanel_read($tableName){
		$conn=new mysqli($GLOBALS['serverName'],$GLOBALS['userName'],$GLOBALS['password'],$GLOBALS['dbName']);
		if ($conn->connect_error)
			die("Connection failed: ".$conn->connect_error);
		//UTG-8 correction
		utf($conn);
		//UTG-8 correction_(end)
		$sql="SELECT * FROM $tableName";
		$result=$conn->query($sql);
		$matrix=array();
		if ($result->num_rows>0){
			while($row=$result->fetch_assoc()){
				$matrix[]=$row;
			}
		}
		else
			echo "solarPanel_read. 0 results";
		$conn->close();
		return $matrix;
	}
	
?>