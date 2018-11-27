angular.module('basketModule').controller('basketController',function($scope,$rootScope){
				
	//This page VIEW content correction. Call the 'globalController'.
	$scope.$emit('ngViewChanged','basketController');
	
	//Insert new item to the basket or remove from it
	$scope.basketInsert=function(event){
		// Try to insert goods into the basket
		var tableName = modelGeneral.goods[$rootScope.goodsShow.type-1].tableName;
		var res = basket.insert(this.obj, tableName);
		if (res.isInserted) {
			// Mark inserted goods
			$(event.currentTarget).addClass('selected');
			$(".basketFull").css('display','block');
			$rootScope.basketNumber=basket.array.length;
		}
		if (res.isPresent) {
			// Remove this goods from the basket and mark result
			let id=+this.obj.getter("id").value;
			$scope.$emit("globalCtrl_basketNumber", basket.removeUsingId(tableName, id));
			$(event.currentTarget).removeClass('selected');			
			if (basket.array.length==0)
				$(".basketFull").css('display','none');
		}
		if (res.isBasketFull) {
			// Show message about this event
			$rootScope.message.setter(true, "Basket", "Basket is full", [3]);
		}
	}
	
	//Remove item from the basket
	$scope.remove=function(index){
		$scope.$emit("globalCtrl_basketNumber", basket.remove());
	}
	
	//Show/hide more list content
	$scope.listOther=function(event,index){
		if ($scope.basket.information[index].listShow){
			$scope.basket.information[index].listShow=false;
			event.currentTarget.innerHTML="Меньше...";
		}
		else{
			$scope.basket.information[index].listShow=true;
			event.currentTarget.innerHTML="Більше...";
		}
	}
	
	//Basket model
	$scope.basket=basket;
	
	//Input field is changed
	$scope.fieldChanged=function(index,eventObj){
		$scope.basket.information[index].total=$scope.basket.information[index].count*$scope.basket.information[index].pricePerUnit;
		//Recalculate totalSum
		basket.totalSum_calculate();
	}
	
});

//Basket MODEL ----------------------------------------------
var basket=new Object({
	//Goods array
	array: [],
	//Other goods information
	information: [],
	informationNotInsert: ["id","model","maximumPower","makerId","panelHeight","panelWidth","panelThickness","productWarrantyId","caption","file","imageURL1","imageURL2","imageURL3","price1","price2"],
	arrayLenMax: 30,
	//All sum of the basket goods
	totalSum: 0,
	
	//Insert goods
	insert: function(obj, tableName){
		// Result pattern
		var res = {
			isInserted: false,
			isPresent: false,
			isBasketFull: false
		};
		// Inserting goods
		var goods = {
			tableName: tableName,
			id: obj.getter("id").value
		};
		// Check if this goods is new one
		if (this.information.length>0) {
			// - Loop through 'information'
			for (var i = 0; i<this.information.length; i++) {
				if (this.information[i].tableName==goods.tableName && this.information[i].id==goods.id) {
					res.isPresent = true;
					break;
				}						
			}
		}
		// - Try to insert
		if (!res.isPresent) {
			if (this.array.length<=this.arrayLenMax) {
				this.array.push(obj.elements);
				res.isInserted = true;
				this.informationInsert.call(this,obj.title,goods.id,tableName,obj.elements);
				this.totalSum_calculate();
			}
			else
				res.isBasketFull = true;
		}
		return res;
	},
	
	//Remove element
	remove: function(index){
		this.array.splice(index,1);
		this.information.splice(index,1);
		return this.array.length;
	},
	//Remove element using its 'id'
	removeUsingId: function(tableName, id){
		var index=null;
		for (var i=0; i<this.information.length; i++) {
			if (this.information[i].tableName==tableName)
				if (this.information[i].id==id) {
					index = i;
					break;
				}
		}
		if (index!=null){
			this.array.splice(index,1);
			this.information.splice(index,1);
		}
		else{
			console.error("basket.js->removeUsingId() ERROR");
		}
		return this.array.length;
	},
	
	totalSum_calculate: function(){
		this.totalSum=0;
		for (let i=0; i<this.information.length; i++){
			this.totalSum+=this.information[i].total;
		};
	},
	
	//Get item-object using its 'itemName'
	getter: function(index,itemName){
		let elements=this.array[index];
		let res="";
		for (var i=0; i<elements.length; i++){
			if (elements[i].name===itemName){
				res=elements[i];
				break;
			}
		}
		return res;
	},
	
	//Insert other goods information
	informationInsert: function(title,id,tableName,array){
		let obj={
			title: title,
			id: +id,
			tableName: tableName,
			array: [],
			listShow: true,
			pricePerUnit: 0,
			count: 1,
			total: 0
		}
		//Filter
		let isPresent=false;
		for (var i=0; i<array.length; i++){
			let itemName=array[i].name;
			let isPresent=false;
			for (var j=0; j<this.informationNotInsert.length; j++){
				if (itemName===this.informationNotInsert[j]){
					isPresent=true;
					break;
				}
			}
			if (!isPresent){
				obj.array.push(array[i]);
			}
		}
		//Insert goods price
		for (var i=0; i<array.length; i++){
			if (array[i].name==="price1"){
				obj.pricePerUnit=+array[i].value;
				obj.total=+array[i].value;
				break;
			}
		}
		//Insert goods
		this.information.push(obj);
	}
});