<?php

	include "../config.php";
	include "solarPanel.php";//Read solar panel data from DB
	
	/* REQUEST
	*
	* $input - 'filter' parameters in JSON format
	* $key1 - goods name
	* $key2 - start reading
	* $key3 - end reading
	*
	* P.S.
	* - If $key2 & $key3 not present then read all elements
	* - If $key3 not present then read elements from $key2 to end
	*/
	$method=$_SERVER['REQUEST_METHOD'];//Request method
	$request=explode('/',trim($_SERVER['PATH_INFO'],'/'));
	$data=file_get_contents('php://input');//Request data
	$input=json_decode($data,true);
	$key1=array_shift($request);
	$key2=array_shift($request);
	$key3=array_shift($request);
		
	//Request handler
	if ($method==="GET"){
		switch ($key1){
			case "readOne":
				if (strlen($key2)>0){
					echo json_encode(readAll($key2));
				}
				else{
					//Bad request
					header("HTTP/1.1 400 Bad request parameters");
				}					
			break;
			case "readPair":
				//Read two tables
				if (strlen($key2)>0 && strlen($key3)>0){
					$res=array();
					$data=readAll($key2);
					$res[]=$data;
					$data=readAll($key3);
					$res[]=$data;
					echo json_encode($res);
				}
				else{
					//Bad request
					header("HTTP/1.1 400 Bad request parameters");
				}
			break;
			case "solarPanel":
				if (strlen($key2)>0){
					//Read several
					$data=solarPanel_read("solarpanel_goods");
					if (count($data)>0){
						//Filtering data
						$data=filtering($data,$key2);
						//Remove unequal records
						$data=recordRemove($data);
						//Pagination
						//Response
						echo json_encode($data);
					}
				}
			break;
			case "getResponse":
				//Return response
				header("HTTP/1.1 400 Return response");
				//echo "return";
				prn($input);
				prn($key1);
				prn($key2);
			break;
			default:
				//Bad request
				header("HTTP/1.1 400 Bad request");
				prn($input);
		}
	}
	else{
		//Bad request
		header("HTTP/1.1 400 This is not GET-request");
		echo "Not GET request";
	}
	
	//Filtering data
	function filtering($data,$filter){
		$filter=json_decode($filter,true);
		//Loop thorough FILTER
		foreach ($filter as $item){
			$itemName_filter=$item['itemName'];
			$itemValues_filter=$item['itemValues'];
			//Loop through DATA. Search equals elements
			$data=search($data,$itemName_filter,$itemValues_filter);
		}
		return $data;
	}
	//Search equals elements
	function search($data,$itemName_filter,$itemValues_filter){
		$index=0;
		foreach ($data as $record){
			if ($record['id']!=-1){
				//This record is TRUE
				//prn1("RECORD");			
				//prn($data[$index]);			
				//prnM("value",$data[$index]['id']);			
				//prn1($index);			
				//prn($record);
				//Get data element
				$itemValue=$record[$itemName_filter];
				//prnM("itemName_filter=",$itemName_filter);
				//prnM("itemValues_filter=",$itemValues_filter);
				//Value comparing
				$isSearched=false;
				//prn("foreach");
				foreach ($itemValues_filter as $value){
					//prnM("itemValue=",$itemValue);
					//prnM("value=",$value);
					// Case insensitive comparing
					//if (strcasecmp($itemValue,$value)==0)
						//echo "EQUALS";
					if ($itemValue==$value){
						$isSearched=true;
						//prn1("true");
					}
				}
				if (!$isSearched){
					//Mark this record as unequal 
					$data[$index]['id']=-1;
				}
			}
			$index++;
		}		
		return $data;		
	}
	//Remove DATA record
	function recordRemove($data){
		$dataRes=array();
		for ($i=0; $i<count($data); $i++){
			if ($data[$i]['id']!=-1)
				$dataRes[]=$data[$i];
		}
		return $dataRes;
	}
		
	//Pagination. Get several elements from arguments
	function pagination(){}
	
	//Read ---------------------------------------------
	
	//Read all data from the table
	function readAll($tableName){
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
			echo "readAll. 0 results";
		$conn->close();
		return $matrix;
	}
	
	
	function prn($arg){
		print_r($arg);
		echo "<br>";
	}
	function prn1($arg){
		echo "<p style='color: red;'>".$arg."</p>";
	}
	function prnM($msg,$arg){
		echo $msg." ";
		print_r($arg);
		echo "<br>";
	}
?>