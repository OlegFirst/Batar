/* Global variables */
let navMenuFixing=false;

//Go up
function goUp(){
	$("html, body").animate({
		scrollTop: 0}, 500);
		return false;
}

// Google map with location
function initMap(){
	let officePosition={lat: 48.9229328, lng: 24.7031946};
	let map=new google.maps.Map(document.querySelector("#map"),{
		zoom: 15,
		center: officePosition,
		mapTypeId: google.maps.MapTypeId.TERRAIN
	});
	let officeMarker=new google.maps.Marker({
		position: officePosition,
		map: map
	});
}

//YEAR dimension correct
function yearCorrecting(year){
	let res="рік";
	let str=year.toString();
	let end=+str.slice(str.length-1,str.length);
	//1,21,31,...
	if (end==1)
		res="рік";
	//2,3,4,22,...
	if (end==2 || end==3 || end==4)
		res="роки";
	//5,6,7,8,9
	if (end>=5)
		res="років";
	//10-20
	if (year>=10 && year<=20)
		res="років";
	return res;
}

var messageFlag = "";
$(document).ready(function(){
	
	messageFlag = document.querySelector("#messageFlag");
	
	$(".messages").css('display', 'block');
	
});

// 'globalController' -> 'message' event handler
function messageEvent() {
	return new Promise(function(resolve, reject) {
		
		messageFlag.addEventListener('click',function(){
			resolve("Message from javascript.jp");
		});
		
	});
}

//Create array prototypes ------------------------------------
//Check is array empty
var example=[];
example.__proto__.isEmpty=function(){
	var res=(this.length==0) ? true : false;
	return res;
}

//Image size correction
function imageSize(){
	console.log(this);
}

//Image size correction
function imageSize(that){
	m=that;
	var imageOuter = {width: $(that.parentNode).width(), height: $(that.parentNode).height()};
	var k = imageOuter.width/imageOuter.height;
	var image = {width: $(that).width(), height: $(that).height()};
	var image_k = image.width/image.height
	if (image_k>=k) {
		$(that).css({
			'width': '100%',
			'height': 'auto'
		});
	}
	else {
		$(that).css({
			'width': 'auto',
			'height': '100%'
		});
	}	
}

function paginationPreventDefault(event) {
	event.preventDefault();
}