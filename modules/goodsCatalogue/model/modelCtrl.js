/* Catalogue MODEL CONTROLLER & MODEL SERVICE*/
angular.module('modelModule')
	.controller('modelController',function($scope, modelService, $rootScope, $location){
		
		//Start
		start();
		//Read goods data. Catch signal from 'catalogueController'
		$scope.$on('readGoods',function(menuItem){
			// Goods updates
			$scope.modelUpdate();			
		});
		
		//This method work when 'modelController' is being initialized
		function start(){
			//$rootScope.screen=true;
			$rootScope.message.setter(true,"","Wait a moment, please",[]);
			//Read data from the DB and write it to the 'model.globalTables'
			modelService.readPair("translate","dimension",function(response){
				if (response.success){
					model.setter_globalTables(response.msg[0],response.msg[1]);
					modelCreate();
				}
				else {
					//$rootScope.screen=false;
					$rootScope.message.setter(false,"","",[]);					
				}
			});
		}	
		
		//FILTER has been changed
		$scope.$on('filterControllerSignal',function(event,json){
			$scope.modelUpdate(json);
			$location.path('/goodsCatalogue');
		});
		
		//Read all necessary tables for model
		function modelCreate(){
			// - Read data from the DB and write it to the 'model.tables'
			modelService.readPair("connector","frame",function(response){
				if (response.success){
					model.tables.connector=response.msg[0];
					model.tables.frame=response.msg[1];
					waiter();
				}
			});
			modelService.readPair("framecolor","maker",function(response){
				if (response.success){
					model.tables.framecolor=response.msg[0];
					model.tables.maker=response.msg[1];
					waiter();					
				}
			});
			modelService.readPair("manufacturer","moduleefficiency",function(response){
				if (response.success){
					model.tables.manufacturer=response.msg[0];
					model.tables.moduleefficiency=response.msg[1];
					waiter();
				}
			});
			modelService.readPair("outputwarranty","productwarranty",function(response){
				if (response.success){
					model.tables.outputwarranty=response.msg[0];
					model.tables.productwarranty=response.msg[1];
					waiter();
				}
			});
			// - Wait while all tables is being read from DB
			var count=0;
			function waiter(){
				count++;
				if (count>=4){
					// - Create FILTER instance. Call method in the 'filterController'
					//$scope.$broadcast('modelCreated',"Model has been created");
					// - Read all 'solarPanels' from the DB and write it to the 'goods.tables'
					$scope.modelUpdate();
				}
			}
		}
		
		//Read goods from the DB and write it to the 'goods.tables'
		$scope.modelUpdate=function(json){
			//$rootScope.screen=true;
			$rootScope.message.setter(true,"","Wait a moment, please",[]);
			//Get table name in the DB
			var goodsTableName=modelGeneral.getTableName($rootScope.goodsShow.type-1);
			if (arguments.length==0 && goodsTableName!=="none"){
				//Read goods data without FILTER
				modelService.readOne(goodsTableName,function(response){
				  	//Set general information
					
					modelGeneral.set(0);// ?
					
					//Read DB
					if (response.success){
						//console.info("Read goods data without FILTER. Create goods pattern");
						modelUpdateSecond(response.msg);
						//Call 'viewController'
						$scope.$broadcast('goodsModelCreated',"without FILTER");
					}
				});
			}
			else if (arguments.length!=0 && goodsTableName!=="none"){
				//Read goods data with FILTER
				modelService.readUsingFilter(json,function(response){
					if (response.success){
						//console.info("Read goods data with FILTER");
						modelUpdateSecond(response.msg);
						//Call 'viewController'
						$scope.$broadcast('goodsModelCreated',"with FILTER");
					}
				});
			}			
			else if (goodsTableName==="none"){
				console.error("Can`t find goods table name in 'modelGeneral'");
				modelUpdateSecond("none");
				$scope.$broadcast('goodsModelCreated',"error");
			}
			else 
				//$rootScope.screen=false;
				$rootScope.message.setter(false,"","",[]);
			
			//Create goods-model
			function modelUpdateSecond(data){
				//var data = arguments[0];
				//var isGoodsPatternCreated = (arguments.length==2) ? false : true;
				//$rootScope.screen=false;
				$rootScope.message.setter(false,"","",[]);
				if (data!=="none"){
					model.goodsPreparation(data);
					//model.goodsPreparation(data,isGoodsPatternCreated);
				}
				else
					model.clearGoods();				
			}
		}		
		
	})
	
	//Service ------------------------------------
	.service('modelService',function($http){
		//Read all data from the two DB tables
		this.readPair=function(tableName1,tableName2,callBack){
			var res={};
			$http({
				method: "GET",
				url: "server/goodsReader.php/readPair/"+tableName1+"/"+tableName2,
			})
			.then(function successCallback(response){
				res.success=true;
				res.msg=response.data;
				return callBack(res);
			},
			function errorCallback(response){
				console.error("Get data with 'modelService' error",response);
				res.success=false;
				res.msg=response.data;
				return callBack(res);
			});
		}
		
		//Read all data from the one DB table
		this.readOne=function(tableName,callBack){
			var res={};
			$http({
				method: "GET",
				url: "server/goodsReader.php/readOne/"+tableName,
			})
			.then(function successCallback(response){
				res.success=true;
				res.msg=response.data;
				return callBack(res);
			},
			function errorCallback(response){
				console.error("Get data with 'modelService' error",response);
				res.success=false;
				res.msg=response.data;
				return callBack(res);
			});
		}
		
		//Read all data from the one DB table
		this.readUsingFilter=function(json,callBack){
			//JSON 'itemName'-elements correction
			var array = JSON.parse(json);
			var pattern = modelGeneral.goodsPattern;
			if (pattern.length>0){
				array.forEach(function(item,i){
					var itemName = item.itemName.toLowerCase();
					var isSearched = false;
					pattern.forEach(function(item){
						if (itemName===item.toLowerCase()){
							itemName = item;
							isSearched = true;
						}
					});
					if (isSearched)
						array[i].itemName = itemName;
				});
			}
			json = JSON.stringify(array);
			var res={};
			$http({
				method: "GET",
				url: "server/goodsReader.php/solarPanel/"+json,
			})
			.then(function successCallback(response){
				res.success=true;
				res.msg=response.data;
				return callBack(res);
			},
			function errorCallback(response){
				console.error("Get data with 'modelService' error",response);
				res.success=false;
				res.msg=response.data;
				return callBack(res);
			});
		}
		
	});