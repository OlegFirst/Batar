angular.module('comparingModule').controller('comparingController',function($scope, $rootScope){
	
	//This page content correction
	$scope.$emit('ngViewChanged','comparingController');
	
	//Create view model
	$scope.comparingView=comparing;
	
	//Correct '.comparingList', '.comparingList-item', 'body' width
	let comparingListItem_width=$(".comparingList-item").width();
	let comparingList_width=comparingListItem_width*(comparing.array.length+2)+10;
	let body_currentWidth=$("body").width();
	let body_width=comparingList_width*100/80;
	$(".comparingList").css("width",comparingList_width+"px");
	
	//Remove item from comparing list
	$scope.removeItem=function(index){
		comparing.remove(index);
		$scope.$emit('comparingCounter',comparing.array.length);
	}
		
});

//Compare MODEL -----------------------------------
var comparing=new Object({
	
	tableName: "",
	category: "",
		
	//Goods array for compare
	array: [],
	imageArray: [],
	arrayLenMax: 20,
	
	//Comparing clear
	clear: function(){
		this.goodsName="";
		this.category = "";
		this.array=[];
		this.imageArray=[];
	},
	
	//Get 'id' list of the comparing goodsName
	getIdList: function(){
		idList=[];
		this.array.forEach(function(elements){
			res=elementIndex(elements,"id");
			if (res.isPresent){
				idList.push(+elements[res.index].value);
			}
		});
		return idList;
	},
	
	//Insert element
	insert: function(obj){
		//Check 'id'
		var res=id=inserted="";
		var isComparingFull = false;
		//Get current 'id' if this one is present
		res=elementIndex(obj,"id");
		if (res.isPresent){
			id=+obj[res.index].value;
		}
		//Check if current 'id' is new
		var equal=false;
		this.array.forEach(function(elements,i,thisArray){
			res=elementIndex(elements,"id");
			if (res.isPresent)
				if (+elements[res.index].value==id){
					equal=true;
					//Remove this item from the 'array'
					thisArray.splice(i,1);
				}
		});
		inserted=false;
		if (!equal && this.array.length<this.arrayLenMax){
			//Insert image as first element in the 'array'
			let imageURL="";
			for (var i=0; i<obj.length; i++){
				if (comparingImage(obj[i])){
					imageURL=obj[i].value;
					break;
				}
			}
			this.imageArray.push(imageURL);
			//Mark elements for showing/hiding in the view
			for (var i=0; i<obj.length; i++){
				obj[i].isVisible=comparingException(obj[i].name);
				//Mark 'dimension'==""
				obj[i].isDimensionEmpty=(obj[i].dimension=="") ? true : false;
			}
			//Insert
			this.array.push(obj);
			inserted=true;
		}
		if (!equal && this.array.length>=this.arrayLenMax && !inserted){
			isComparingFull = true;
			//alert("Кількість товарів для порівняння має бути меншою 20");
		}
		return {inserted: inserted, isComparingFull: isComparingFull};
	},
	
	//Remove element
	remove: function(index){
		this.array.splice(index,1);
		this.imageArray.splice(index,1);
	}
	
});

function elementIndex(array,itemName){
	let res={
		isPresent: false,
		index: 0
	};
	array.forEach(function(item,i){
		if (item.name===itemName){
			res.isPresent=true;
			res.index=i;
		}
	});
	return res;
}

//Get image
function comparingImage(item){
	let res=false;
	if (item.name==="imageURL1" || item.name==="imageURL2" || item.name==="imageURL3"){
		if (item.value!="None")
			res=true;
	}
	return res;
}

//Exceptions
function comparingException(arg){
	let res=true;
	if (arg==="id" || arg==="caption" || arg==="file" || arg==="imageURL1" || arg==="imageURL2" || arg==="imageURL3") 
		res=false;
	return res;
}