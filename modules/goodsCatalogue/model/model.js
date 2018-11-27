/* Catalogue MODEL */

//General information about model
var modelGeneral={
	// For COMPARING
	index: -1,
	nameList: [['solarPanel','Сонячні панелі'],['someName','someName']],
	// For DB table names and translate
	nameListLen: 1,
	goods: [{title:'Готова електростанція',tableName:'none'},{title:'Сонячна панель',tableName:'solarpanel_goods'},{title:'Інвертор',tableName:'inverters_goods'},
			{title:'Мантажна конструкція',tableName:'none'},{title:'Вітрова електростанція',tableName:'none'},{title:'Додаткове обладнання',tableName:'none'}],
	// Mark if goods will be updated
	isGoodsImmutable: false,
	// Goods 'itemName' list
	isGoodsPatternUpdated: false,
	goodsPattern: []
}
modelGeneral.set=function(index){
	if (index>=0 && index<=this.nameListLen)
		this.index=index;
	else{
		this.index=-1;
		console.error("Incorrect index");
	}
}
modelGeneral.getTranslate=function(){
	let res="";
	if (this.index!=-1)
		res=this.nameList[this.index][1];
	return res;
}
modelGeneral.getTableName=function(index){
	var res="none";
	if (index>=0 && index<this.goods.length)
		res=this.goods[index].tableName;
	return res;
}
modelGeneral.getGoodsTitle=function(index){
	var res="none";
	if (index>=0 && index<this.goods.length)
		res=this.goods[index].title;
	return res;	
}

function Model(){
	//Private field
	var globalTables=Object.create(null);
	globalTables.translate=Object.create(null);
	globalTables.dimension=Object.create(null);
	
	//Global tables. Setter
	this.setter_globalTables=function(data1,data2){
		globalTables.translate=data1;
		globalTables.dimension=data2;
	}
	//Getter
	this.getter=function(){
		return globalTables;
	}
	//Global tables - 'translate'. Getter
	this.translate=function(itemName){
		//Cut 'Id'
		itemName=idCorrection(itemName);
		//Field correction
		//itemName=translateCorrection(itemName);
		var item1 = itemName.toLowerCase();
		//Search
		let res="";
		for (var i=0; i<globalTables.translate.length; i++){
			var item2 = globalTables.translate[i].itemName.toLowerCase();
			if (item2===item1){
				res=globalTables.translate[i].itemTranslate;
				break;
			}				
		}
		return res;
	}
	//Global tables - 'dimension'. Getter
	this.dimension=function(itemName){
		itemName=idCorrection(itemName);
		itemName=itemName.toLowerCase();
		let res="";
		for (var i=0; i<globalTables.dimension.length; i++){
			if (globalTables.dimension[i].itemName.toLowerCase()===itemName){
				res=globalTables.dimension[i].value;
				break;
			}				
		}
		return res;
	}
	//Global tables - 'values'. Getter for 'goods table'
	this.values=function(tableName,valuesId){
		tableName=tableName.toLowerCase();
		var res="";
		var table=null;
		let obj=model.tables;
		let index=null;
	//Search current table
		for (index in model.tables){
			if (tableName===index){
				table=obj[index];
				break;
			}
		}
		//Compare this table-id
		if (table!=null){
			table.forEach(function(element){
				if (valuesId==element.id)
					res=element.value;
			});
		}
		return res;
	}
	//Global tables - 'values'. Getter for FILTER
	this.valuesFILTER=function(tableName){
		var res="";
		let obj=model.tables;
		let index=null;
	//Search current table
		for (index in model.tables){
			if (tableName===index){
				res=obj[index];
				break;
			}
		}
		return res;
	}
	
	//Tables
	this.tables=Object.create(null);
		
	//Goods
	this.goods=[];
	
	//Goods-tables preparation to show
	this.goodsPreparation=function(data){
		if (modelGeneral.goodsPattern.length==0){
			// Goods pattern
			modelGeneral.goodsPattern = [];
			var obj = data[0];
			var index = null;
			for (index in obj){
				modelGeneral.goodsPattern.push(index);
			}
			//Mark that FILTER must be updated
			modelGeneral.isGoodsPatternUpdated = true;
		}
		// Goods
		this.goods=[];		
		//Get one goods
		data.forEach(function(obj){
			let element=[];
			//Loop through selected goods. Create object collection
			index=null;
			for (index in obj){
			let item={
				itemName: "",
				itemTranslate: "",
				itemValues: "",
				itemDimension: ""
			}
			// - Item Name
			item.itemName=index;
			// - Item translate
			item.itemTranslate=this.translate(index);
			// - Item value
			item.itemValues=this.values(idCorrection(index),obj[index]);
			if (item.itemValues=="")
				item.itemValues=obj[index];
			// - Item dimension
			item.itemDimension=this.dimension(index);
			// - 'id' correction
			if (item.itemName==="id")
				item.itemDimension = true;
			// - Image and file url correction
			if (item.itemName==="file" || item.itemName==="imageURL1" || item.itemName==="imageURL2" || item.itemName==="imageURL3")
				item.itemValues=urlCorrection(item.itemValues);
			// - 'Year' correction if it presents. (In 'javascript.js')
			if (item.itemDimension==="рік")
				item.itemDimension=yearCorrecting(item.itemValues);
			element.push(item);
			}
			this.goods.push(element);			
		}.bind(this));
		//Updating 'goodsParameters'
		goodsParametersUpdate(this);
	}
	
	//Clear goods
	this.clearGoods=function(){
		this.goods=[];
	}
	
	//Search 'itemName' and 'id' in the 'table'
	this.findItemName = function(table, itemName) {
		var index = {
			id: -1,
			itemName: -1
		};
		table.forEach(function(item, i) {
			if ('id'==item.itemName)
				index.id = i;
			if (itemName==item.itemName)
				index.itemName = i;
		});
		return index;
	}
	
	//FILTER method.
	this.getter_filter=function(tableName,itemName){
		var res = null;
		if (tableName!=""){
			//Read from 'globalTables'
			res={
				itemName: tableName+"Id",
				itemTranslate: "",
				itemValues: [],
				itemDimension: ""			
			};
			res.itemTranslate=this.translate(tableName);
			res.itemValues=this.valuesFILTER(tableName);
			res.itemDimension=this.dimension(tableName);
		}
		if (itemName!=""){
			//Read form 'goods'
			res = {
				itemName: itemName,
				itemTranslate: "",
				itemDimension: ""
			};		
			res.itemTranslate = model.translate(itemName);
			res.itemDimension=this.dimension(itemName);
		}
		return res;
	}
	
	//'id' correction
	function idCorrection(arg){
		let len=arg.length;
		if (len>2){
			lastLetters=arg.slice(len-2,len);
			if (lastLetters==="Id"){
				//Cut 'Id'
				arg=arg.slice(0,len-2);
			}
		}
		return arg;
	}
	
	//Image and file url correction
	function urlCorrection(itemValues){
		if (itemValues!="None"){
			//itemValues="serverWork/"+itemValues;
			itemValues = "../Server/photoes/"+itemValues;
		}
		return itemValues;
	}
	
	// Goods parameters ----------------------------
	// - Updating. Mark 'this.goods'-items are in the basket or comparing. Each 'this.goods' equals 'this.goodsParameters'
	function goodsParametersUpdate(arg) {
		arg.goodsParameters = [];
		//Creating new 'goodsParameters'
		arg.goods.forEach(function() {
			var obj = {
				inBasket: false,
				inComparing: false
			};
			arg.goodsParameters.push(obj);
		});
	}
	
}

var model=new Model();