(function(){
	
	'user strict';
	
	//Declare modules
	angular.module('mainModule',[]);
	angular.module('introductionModule',[]);
	angular.module('ourWorkModule',[]);
	angular.module('catalogueModule',[]);
	angular.module('notWorkModule',[]);
	angular.module('modelModule',[]);
	angular.module('comparingModule',[]);
	angular.module('basketModule',[]);
	angular.module('aboutUsModule',[]);
	angular.module('contactInformationModule',[]);
	angular.module('orderModule',[]);
	angular.module('interestingModule',[]);
	
	//Configure
	var app=angular.module('mainApp',[
		'mainModule',
		'introductionModule',
		'ourWorkModule',
		'catalogueModule',
		'notWorkModule',
		'modelModule',
		'comparingModule',
		'basketModule',
		'aboutUsModule',
		'contactInformationModule',
		'orderModule',
		'interestingModule',
		'ngRoute'
	])
	
	//'routeStyles'
	
	.config(['$routeProvider',function($routeProvider){
		$routeProvider
			.when('/mainPage',{
				templateUrl: 'modules/mainPage/view.html',
				controller: 'mainController'
			})
			.when('/introduction',{
				templateUrl: 'modules/mainPage/introduction/introductionView.html',
				controller: 'introductionController'
			})
			.when('/ourWork',{
				templateUrl: 'modules/ourWork/ourWork.html',
				controller: 'ourWorkController'
			})
			.when('/goodsCatalogue',{
				templateUrl: 'modules/goodsCatalogue/view.html',
				controller: 'catalogueController'
			})
			.when('/inverters',{
				templateUrl: 'modules/goodsCatalogue/inverters/invertersView.html'
			})
			.when('/gCshowMore',{
				templateUrl: 'modules/goodsCatalogue/showMore.html',
				controller: 'catalogueController'
			})
			.when('/goodsComparing',{
				templateUrl: 'modules/goodsComparing/goodsComparing.html',
				controller: 'comparingController'
			})
			.when('/basket',{
				templateUrl: 'modules/basket/basket.html',
				controller: 'basketController'
			})
			.when('/order',{
				templateUrl: 'modules/order/order.html',
				controller: 'orderController'
			})
			.when('/aboutUs',{
				templateUrl: 'modules/aboutUs/aboutUs.html',
				controller: 'aboutUsController'
			})
			.when('/contactInformation',{
				templateUrl: 'modules/contactInformation/contactInformation.html',
				controller: 'contactInformationController'
			})
			.when('/interesting',{
				templateUrl: 'modules/interesting/interestingView.html',
				controller: 'interestingController'
			})
			.otherwise({redirectTo: 'mainPage'});
	}])
	
	.run(function($location){
		//$location.path('modules/mainPage/view.html');
	});
	
	//Main controller. Menu navigation.
	app.controller('globalController',function($scope,$rootScope,$location){
		
		//'Solar panels' will be shown first		
		$rootScope.goodsShow={
			selectedItem: "Сонячні панелі",
			type: 2
		};
		
		//Screen
		$rootScope.screen=false;
		
		//Message
		$rootScope.message = {
			// - Field
			isVisible : false,
			title : "",
			content : "",
			buttons : [
				{id: 1, name: "ТАК", isVisible: true},
				{id: 2, name: "НІ", isVisible: true},
				{id: 3, name: "OK", isVisible: true}
			],
			clickedId: undefined,
			// - Methods
			setter : function(isVisible, title, content, buttons_id) {
				this.isVisible = isVisible;
				this.title = title;
				this.content = content;
				this.buttons.forEach(function(button,i) {
					this.buttons[i].isVisible = false;
				}.bind(this));
				if (buttons_id.length>=1) {
					buttons_id.forEach(function(button_id) {
						for (var j=0; j<this.buttons.length; j++) {
							if (button_id==this.buttons[j].id) {
								this.buttons[j].isVisible = true;
								break;
							}
						}
					}.bind(this));
				}
				this.clickedId = undefined;
			}
			
		};
		$scope.messageClick = function(buttonId) {
			$rootScope.message.clickedId = buttonId;
			$rootScope.message.isVisible = false;
			$("#messageFlag").trigger('click');
		}
		
		// Catalogue information
		$rootScope.catInformation = false;
		
		//Catalogue variables
		// - View goods model
		$rootScope.goods = [];
		
		//'Introduction' menu item number
		$scope.introductionItem = function(id){
			$rootScope.introductionItem = id;
		}
		
		// Pagination
		$rootScope.pagination = {
			paginationCount : [],
			indexActive: 0,
			min: undefined,
			max : undefined
		};
		
		//Pages PATH
		var stack=new Stack();
		stack.constructor("/mainPage");
		//Count goods in the COMPARING
		$scope.comparingCounter=0;		
						
		/* Main menu navigation */
		$scope.mainController_show=function(msg){
			//Clear selected item
			$(".nav-list-item>a").css({
				"-ms-transform": "scale(1,1)",
				"webkit-transform": "scale(1,1)",
				"transform": "scale(1,1)",
				"z-index": "10"
			});
			//Select new item
			if (msg==="mainPage"){
				$("nav").removeAttr("style");
				navMenuFixing=false;
				goUp();
			}
			else {
				$("nav").css("display","block");
				let id="#"+msg
				$(id).css({
					"-ms-transform": "scale(1.2,1.2)",
					"webkit-transform": "scale(1.2,1.2)",
					"transform": "scale(1.2,1.2)",
					"z-index": "20"
				});
				navMenuFixing=true;
			}
		
		}		
		//Show/hidden
		$scope.mainController_nav=function(){
			let navList=document.querySelector(".nav-list");
			if ($(navList).hasClass('navShow')==false)
				navList.classList.add('navShow');
			else
				$(navList).removeClass('navShow');
		}
		//Hiding left movable manu
		$scope.mainManuHide=function(){
			$(".nav-list").removeClass('navShow');
		}
		
		//Back
		$scope.globalController_back=function(){
			stack.pop();
			var path=stack.pop();
			$location.path(path);
		}
			
		//Site pages content hide/show after navigation event occurred. Modules behaviour.
		$scope.$on('ngViewChanged',function(event,data){
			$("body").removeAttr('style');
			//Save current page location
			var path=$location.path();
			stack.push(path);
			//
		if (data==="ourWorkController"  || data==="catalogueController" || data==="comparingController" || data==="basketController" || data==="aboutUsController" || data==="contactInformationController" || data==="orderController" || 'interestingController' || 'introductionController'){
				$('nav').css('display','block');
				$rootScope.catInformation = true;
				navMenuFixing=true;
				goUp();
				//Basket icon
				if (basket.array.length>0){
					$(".basketFull").css('display','block');
				}				
			}
			if (data==="mainController"){
				$('nav').css('display','none');
				$rootScope.catInformation = false;
			}			
			if (data==="basketController")
				$rootScope.catInformation = false;
			//Show Map
			if (data==="mainController" || data==="aboutUsController" || data==="contactInformationController")
				$scope.isMapVisible=true;
			else
				$scope.isMapVisible=false;
		 });
		
		//Compare view controller ---------------------------------------
		//Insert new goods to the list
		$scope.comparingInsert=function(arg){
						
			//Check goods name
			var tableName = modelGeneral.goods[$rootScope.goodsShow.type-1].tableName;
			var category = modelGeneral.goods[$rootScope.goodsShow.type-1].title;
			
			if (comparing.tableName==""){
				//None goods in the 'comparing'
				comparing.clear();
				comparing.tableName=tableName;
				comparing.category = category;
				var res = comparing.insert(this.obj.elements);
				iconSelect(!res.inserted);
			}
			else{
				if (comparing.tableName===tableName){
					//Goods category has not changed
					var res = comparing.insert(this.obj.elements);
					// Check if new goods has been inserted to the comparing list
					if (res.isComparingFull) {
						$rootScope.message.setter(true, "Порівняння", "Кількість товарів для порівняння має бути меншою 20",[3]);
						var promise = messageEvent().then(function(msg) {});
					}
					else
						iconSelect(!res.inserted);
				}
				else{
					//Goods category has changed
					$rootScope.message.setter(true, "Порівняння", "Інша категорія товарів. Стерти елементи для порівняння?",[1,2]);
					var promise = messageEvent().then(function(msg) {
						if ($rootScope.message.clickedId==1) {
							// Clearing comparing goods and insert new one
							comparing.clear();
							comparing.tableName=tableName;
							comparing.category = category;
							var res = comparing.insert(this.obj.elements);
							iconSelect(!res.inserted);
						}
					}.bind(this));
				}
			}
			
			//Correct comparing counter
			$scope.comparingCounter=comparing.array.length;
			//Select or not select clicked icon
			function iconSelect(isSelected){
				if (!isSelected)
					$(arg.currentTarget).addClass('selected');
				else
					$(arg.currentTarget).removeClass('selected');
			}
		}
		
		//Set comparing counter
		$scope.$on('comparingCounter',function(event,data){
			$scope.comparingCounter=data;
		});
		
		//Compare view controller_(end) ---------------------------------------
		
		//Call 'filterController'
		$scope.$on('globalCtrl_filter',function(event,data){
			$scope.$broadcast('modelCreated',"FILTER updating");
		});

		//Call 'viewController'
		$scope.$on('globalCtrl_filterIntervalUpdates',function(){
			$scope.$broadcast('goodsModelCreated');
		});
		
		//Updating value '$rootScope.basketNumber'
		$scope.$on('globalCtrl_basketNumber',function(event,data){
			$rootScope.basketNumber = data;
		});
		
		// Updating pagination after goods loaded
		$scope.$on('paginationMain', function() {
			$scope.$broadcast('paginationUpdates');
		});
		
		//Page PATH stack
		function Stack(){
			var items=[];
			var safeResult="";
			
			//Constructor
			this.constructor=function(arg){
				safeResult=arg;
				items.push("");
				items.push(arg);
			}
			
			//Push
			this.push=function(arg){
				//Ignore double pushing
				if (items[1]!==arg){
					items.shift();
					items.push(arg);
				}
			}
			
			//Pop
			this.pop=function(){
				let res=items.pop();
				items.unshift("");
				if (res==""){
					this.push(safeResult);
					res=safeResult;
				}
				return res;
			}
		}
		
	});
		
})();