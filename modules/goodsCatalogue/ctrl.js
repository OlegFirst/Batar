var goods_showMore = null;

// Catalogue menu navigation
function catalogueNav(){
	let ul=document.querySelector(".catalogue-menu>ul");
	if (!$(ul).hasClass("goodsMenuButtonShow"))
		$(ul).addClass("goodsMenuButtonShow");
	else
		$(ul).removeClass("goodsMenuButtonShow");
}

function imageSelect(arg){
	$(".showMore-content-images-list img").removeClass('selectedImage');
	$(arg).addClass('selectedImage');
}

angular.module('catalogueModule')
	.controller('catalogueController',function($scope,$rootScope){
		
		$rootScope.pagination.indexActive = 0;
		
		//This page content correction
		$scope.$emit('ngViewChanged','catalogueController');		
		
		//Pass selected goods` object to the 'showMoreController'
		$scope.goodsPass=function(){
			goods_showMore=this.obj;
		}	
		
		//Catalogue menu item is clicked
		$scope.catalogueMenuItem = function(itemNumber){
			let selectedItem = "";
			switch (itemNumber){
				case 1:
					selectedItem = "Готові електростанції";
				break;
				case 2:
					selectedItem = "Сонячні панелі";					
				break;
				case 3:
					selectedItem = "Мережеві інвертори";
				break;
				case 4:
					selectedItem = "Монтажні конструкції";
				break;
				case 5:
					selectedItem = "Вітрові електростанції";
				break;
				case 6:
					selectedItem = "Додаткове обладнання";
			}
			//What textual information will be shown within cards
			$rootScope.goodsShow={
				selectedItem: selectedItem,
				type: itemNumber
			};
			
			//Menu closes
			$(".catalogue-menu-line ul").removeClass('goodsMenuButtonShow');
			
			//FILTER`s pattern clear
			modelGeneral.goodsPattern = [];
			
			//Goods and filter`s pattern updates. Call 'modelController'
			$scope.$broadcast('readGoods',selectedItem);	
			
		}
		
		$scope.$on('showMoreController',function(event,itemNumber){
			$scope.catalogueMenuItem(itemNumber);
		});		
		
	})
	
	/* Filter controller ------------------------------------ */
	.controller('filterController',function($scope,$rootScope){
				
		/* Filter show/hide */
		/*$("#catalogue-filter-button").click(function(){
			if (!$(".catalogue-filter").hasClass("catalogueFilterShow"))
				$(".catalogue-filter").addClass("catalogueFilterShow");
			else
				$(".catalogue-filter").removeClass("catalogueFilterShow");
		});*/
		
		// Filter instance creating. Wait while MODEL has been created or updated.
		//
		// There are two part of filtering:
		// 1. Filtering with item-id
		// 2. Filtering with two item values (from, to). It uses 'modelGeneral.filter'
		//
		//It gets some information from MODEL and makes FILTER
		$scope.$on('modelCreated',function(event,data){
			$rootScope.items = [];
			$rootScope.itemsInterval = [];
			//console.info("Create or update FILTER",data);
			switch ($rootScope.goodsShow.type){
				case 2:
					filter_solarPanel();
				break;
				case 3:
					filter_inverters();
				break;
			}			
			
			// Filter for SOLAR PANELS
			function filter_solarPanel(){
				//Maker
				let res=model.getter_filter("maker","");
				let filter=new Filter(res.itemName,res.itemTranslate);
				for (var i=0; i<res.itemValues.length; i++){
					filter.addElement(res.itemValues[i].id,res.itemValues[i].value,"");
				}
				$rootScope.items.push(filter);
				//Connector
				res=model.getter_filter("connector","");
				filter=new Filter(res.itemName,res.itemTranslate);
				for (var i=0; i<res.itemValues.length; i++){
					filter.addElement(res.itemValues[i].id,res.itemValues[i].value,"");
				}
				$rootScope.items.push(filter);
				//Frame
				res=model.getter_filter("frame","");
				filter=new Filter(res.itemName,res.itemTranslate);
				for (var i=0; i<res.itemValues.length; i++){
					filter.addElement(res.itemValues[i].id,res.itemValues[i].value,"");
				}
				$rootScope.items.push(filter);
				//Framecolor
				res=model.getter_filter("framecolor","");
				filter=new Filter(res.itemName,res.itemTranslate);
				for (var i=0; i<res.itemValues.length; i++){
					filter.addElement(res.itemValues[i].id,res.itemValues[i].value,"");
				}
				$rootScope.items.push(filter);
				//Manufacturer
				res=model.getter_filter("manufacturer","");
				filter=new Filter(res.itemName,res.itemTranslate);
				for (var i=0; i<res.itemValues.length; i++){
					filter.addElement(res.itemValues[i].id,res.itemValues[i].value,"");
				}
				$rootScope.items.push(filter);
				//Module efficiency
				res=model.getter_filter("moduleefficiency","");
				filter=new Filter(res.itemName,res.itemTranslate);
				for (var i=0; i<res.itemValues.length; i++){
					filter.addElement(res.itemValues[i].id,res.itemValues[i].value,"%");
				}
				$rootScope.items.push(filter);
				//Output warranty
				res=model.getter_filter("outputwarranty","");
				filter=new Filter(res.itemName,res.itemTranslate);
				for (var i=0; i<res.itemValues.length; i++){
					filter.addElement(res.itemValues[i].id,res.itemValues[i].value,yearCorrecting(res.itemValues[i].value));
				}
				$rootScope.items.push(filter);
				//Product warranty
				res=model.getter_filter("productwarranty","");
				res.itemDimension=yearCorrecting(res.itemDimension);
				filter=new Filter(res.itemName,res.itemTranslate,res.itemDimension);
				for (var i=0; i<res.itemValues.length; i++){
					filter.addElement(res.itemValues[i].id,res.itemValues[i].value,yearCorrecting(res.itemValues[i].value));
				}
				$rootScope.items.push(filter);
			}
			
			// Filter for INVERTERS
			function filter_inverters(){
				var filterInterval = [];
				//Maker
				let res=model.getter_filter("maker","");
				let filter=new Filter(res.itemName,res.itemTranslate);
				for (var i=0; i<res.itemValues.length; i++){
					filter.addElement(res.itemValues[i].id,res.itemValues[i].value,"");
				}
				$rootScope.items.push(filter);
				
				//outPutPower
				res = model.getter_filter("","outPutPower");
				filter=new Filter(res.itemName,res.itemTranslate);
				filterInterval = new FilterIntreval(res.itemName,res.itemTranslate,res.itemDimension);
				// - FilterInterval
				filterInterval.addElement({from: 2, to: 5});
				filterInterval.addElement({from: 5, to: 9});
				filterInterval.addElement({from: 10, to: 14});
				filterInterval.addElement({from: 15, to: 20});
				filterInterval.addElement({from: 20, to: 25});
				filterInterval.addElement({from: 26, to: 30});
				$rootScope.itemsInterval.push(filterInterval);
			}
		});
		
		/* Making filter collection. First part */
		function Filter(itemName,title){
			this.title=title;
			this.itemName=itemName;
			this.elements=[];
			this.addElement=function(id,elementName1,dimension){
				let obj={
					itemValues: id,
					elementName: elementName1,
					isSelected: false,
					itemDimension: dimension
				}
				this.elements.push(obj);
			}
		}
				
		/* Filter events. First part */
		$scope.filterChange=function(i){
			//Request creates
			var request=[];
			//-Loop through FILTER-rows
			$rootScope.items.forEach(function(item){
				let elements=item.elements;
				var obj={};
				obj={
					itemName: item.itemName,
					itemValues: []
				};
				//-Loop through FILTER-row->elements
				elements.forEach(function(element){
					if (element.isSelected)
						obj.itemValues.push(element.itemValues);
				});
				if (obj.itemValues.length>0)
					request.push(obj);
			});
			let json=JSON.stringify(request);
			//Read goods data. Call 'modelController'
			$scope.$emit('filterControllerSignal',json);
		}
		
		/* Making filter collection. Second part (without DB reading) */
		function FilterIntreval(itemName,title,itemDimension) {
			this.title=title;
			this.itemName=itemName;
			this.itemDimension=itemDimension;
			this.elements=[];
			this.addElement=function(values){
				let obj={
					valueFrom: values.from,
					valueTo: values.to,
					isSelected: false					
				}
				this.elements.push(obj);
			}
		}
		/* Filter events. Second part (without DB reading) */
		$scope.filterIntervalChange = function() {
			// Search selected elements of the 'filter interval' in the view model
			model.goods.forEach(function(table){
				// - Loop through 'filter interval'
				$rootScope.itemsInterval.forEach(function(filterInterval){
					// - Find equal element in the table
					var index = model.findItemName(table,filterInterval.itemName);
					if (index.id!=-1)
						table[index.id].itemDimension = false;
					if (index.itemName!=-1) {
						var value = table[index.itemName].itemValues;
						// - Loop through 'filterInterval'-elements
						filterInterval.elements.forEach(function(filterElement) {
							if (filterElement.isSelected) {
								if (filterElement.valueFrom<=value && filterElement.valueTo>=value) {
									// - Marking table
									if (index.id!=-1)
										table[index.id].itemDimension = true;									
								}
							}
						});
					}
				});
			});
			// 'viewController' updates according to the 'filterInterval'
			$scope.$emit('globalCtrl_filterIntervalUpdates',function(){
				$scope.filterIntervalUpdates();
			});	
		}
		
	})
	
	/* View controller ------------------------------------ */
	.controller('viewController',function($scope,$rootScope){
		
		$scope.$on('goodsModelCreated',function(event,data){
			// Update pagination
			$scope.$emit('paginationMain','Not Connected');
			//FILTER updates. Call 'filterController' using 'globalController'
			if (modelGeneral.isGoodsPatternUpdated){
				modelGeneral.isGoodsPatternUpdated = false;
				$scope.$emit('globalCtrl_filter',"FILTER updates");	
			}	
			//Showing goods model
			goUp();	
			$scope.emptyMessage={
				hide: true,
				msg: "Не знайдено жодного товару"
			}
			$rootScope.goods = [];
			var title=modelGeneral.getGoodsTitle($rootScope.goodsShow.type-1);
			//Creating view goods model
			model.goods.forEach(function(items){
				var index = model.findItemName(items,"none");
				if (index.id!=-1)
					if (items[index.id].itemDimension){
						let elements=new solarPanel(title);
						items.forEach(function(item){
							elements.setter(item.itemName,item.itemTranslate,item.itemValues,item.itemDimension);
						});
						$rootScope.goods.push(elements);
					
					}
			});
			//If '$rootScope.goods' is empty
			if ($rootScope.goods.length==0)
				$scope.emptyMessage.hide=false;
			//Mark goods are selected for comparing
			let idList=comparing.getIdList();
			$rootScope.goods.forEach(function(items,index,array){
				let itemsId=+items.getter("id").value;
				for (var i=0; i<idList.length; i++){
					if (itemsId==idList[i]){
						array[index].comparingSelected="selected";
						break;
					}
				}
			});
			//Mark goods are selected for basket
			var isSearched=null;
			var goodsTableName = modelGeneral.goods[$rootScope.goodsShow.type-1].tableName;
			$rootScope.goods.forEach(function(items,index,array){
				let itemsId=+items.getter("id").value;
				isSearched=false;
				// - Loop through basket goods
				for (var i=0; i<basket.array.length; i++){
					if (isSearched)
						break;
					basketTableName = basket.information[i].tableName;
					// - Check if both type of goods are equal
					if (goodsTableName==basketTableName) {
						let basketId = basket.information[i].id;
						if (basketId==itemsId){
							array[index].basketSelected="selected";
							isSearched=true;
							break;
						}
					}
				}
			});
		});
		
		//Class of 'view goods model'
		let i=0;
		//arg_ table name, table 'id'
		function solarPanel(title){
			this.title=title;
			this.elements=[];
			this.elementIndex={};
			//Insert class='selected' if this goods is selected for 'comparing' or 'basket'
			this.comparingSelected="";
			this.basketSelected="";
			//Inner variable
			i=0;
			this.setter=function(name,translate,value,dimension){
				let item={
					name: name,
					translate: translate,
					value: value,
					dimension: dimension
				};
				this.elements.push(item);
				this.elementIndex[name]=i;
				i++;
			}
			this.getter=function(name){
				return this.elements[this.elementIndex[name]];
			}
		}
		
		// FILTER. Second part. 'viewController' updates according to the 'filterInterval'
		/*$scope.$on('viewCtrl_filterIntervalUpdates',function(event,data){
			$scope.filterIntervalUpdates(data);
		});	
		$scope.filterIntervalUpdates = function(filterInterval) {
			console.log("$rootScope.solarPanels=",$rootScope.goods);
			console.log(filterInterval);
		}*/
		
	})
	
	/* 'Showmore' controller ---------------------------------------- */
	.controller('showMoreController',function($scope){
		
		modelGeneral.isGoodsImmutable = true;
		
		//Show 'nav'-menu
		$("nav").css("display","block");
		
		/* Catalogue menu navigation */
		$(".catalogue-menu-line .nav").on("click",function(){
			let ul=document.querySelector(".catalogue-menu>ul");
			if (!$(ul).hasClass("goodsMenuButtonShow"))
				$(ul).addClass("goodsMenuButtonShow");
			else
				$(ul).removeClass("goodsMenuButtonShow");
		});
		
		//Call 'catalogueController'
		$scope.catalogueMenuItem = function(itemNumber){
			console.log("m1");
			$scope.$emit('showMoreController',itemNumber);
			console.log("m2");
			//$scope.$broadcast('showMoreController',itemNumber);
		}
		
		$scope.obj=goods_showMore;
				
		$scope.images=[];
		
		//Mark showing and hiding items in the table
		for (let i=0; i<$scope.obj.elements.length; i++){
			$scope.obj.elements[i].isShow=true;
			let item=$scope.obj.elements[i];
			if (item.name==="id" || item.name==="file" || item.name==="caption" || item.name==="imageURL1" || item.name==="imageURL2" || item.name==="imageURL3" || item.name==="price1" || item.name==="price2")
				$scope.obj.elements[i].isShow=false;
		}
		//Mark showing and hiding images
		for (let i=0; i<$scope.obj.elements.length; i++){
			let item=$scope.obj.elements[i];
			if (item.name==="imageURL1" || item.name==="imageURL2" || item.name==="imageURL3"){
				if (item.value=="" || item.value==="None") continue;
				$scope.images.push(item.value);
			}
		}
		$scope.selectedImage=$scope.images[0];
				
		//If 'info file' able to download?
		$scope.infoFile=true;
		
		//Image is clicked
		$scope.imageClicked=function(index,arg){
			$scope.selectedImage=$scope.images[index];
		}
		
		//Content images size correction
		sizeCorrection();
		$(window).resize(function(){
			sizeCorrection();
		});
		function sizeCorrection(){
			//Get main image and its outer parameters
			let mainImageOuter={};
			mainImageOuter.obj=document.querySelector(".showMore-content-images-main-inner");
			mainImageOuter.size=getSize(mainImageOuter.obj);
			mainImageOuter.proportion=getProportion(mainImageOuter.size.width,mainImageOuter.size.height);
			let mainImage={};
			mainImage.obj=document.querySelector(".showMore-content-images-main-inner>img");
			mainImage.size=getSize(mainImage.obj);
			mainImage.proportion=getProportion(mainImage.size.width,mainImage.size.height);
			//Compare
			if (mainImageOuter.proportion>=mainImage.proportion){
				//Outer w/h >= img w/h -> img.w=auto, img.h=100%
				setSize(mainImage.obj,true);
			}
			else{
				//Outer w/h < img w/h -> img.w=100%, img.h=auto
				setSize(mainImage.obj,false);
			}
			//Vertical centring
			verticalCentring(mainImageOuter.obj,mainImage.obj);
			
			//console.dir("mainImageOuter",mainImageOuter);
			//console.dir("mainImage",mainImage);
			
			function getSize(obj){
				let size={
					width: "",
					height: ""
				};
				size.width=$(obj).css('width');
				size.width=+size.width.replace("px","");
				size.height=$(obj).css('height');
				size.height=+size.height.replace("px","");
				return size;
			}
			function setSize(obj,isWidthAuto){
				if (isWidthAuto)
					$(obj).css({
						"width": "auto",
						"height": "100%"
					});
				else
					$(obj).css({
						"width": "100%",
						"height": "auto"
					});
			}
			function getProportion(width,height){
				let koef=1;
				if (height>0)
					koef=width/height;
				return koef;
			}
			function verticalCentring(obj1,obj2){
				let obj1_size=getSize(obj1);
				let obj2_size=getSize(obj2);
				let move=(obj1_size.height-obj2_size.height)/2;
				$(obj2).css("top",move+"px");
			}
		}
		
	})
	
	.controller('paginationController', function($scope,$rootScope) {
		
		$scope.$on("paginationUpdates", function() {
			$rootScope.pagination.paginationCount = [];
			var index = 1;
			for (var i = 0; i < model.goods.length; i += 10) {
				var obj = {
					index : index,
					pageNumber : i
				};
				index++;
				$rootScope.pagination.paginationCount.push(obj);
			}
			$rootScope.pagination.min = $rootScope.pagination.paginationCount[0].pageNumber;
			$rootScope.pagination.max = $rootScope.pagination.paginationCount[1].pageNumber;
		});
		
		$scope.paginationEvent = function(index) {
			var len = $rootScope.pagination.paginationCount.length;
			var paginationMax = $rootScope.pagination.paginationCount[len-1].pageNumber+10;
			$rootScope.pagination.min = $rootScope.pagination.paginationCount[index].pageNumber;
			$rootScope.pagination.max = (index < len-1) ? $rootScope.pagination.paginationCount[index+1].pageNumber : paginationMax;
		}
		
	});