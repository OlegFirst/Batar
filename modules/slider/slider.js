var pro=1.7;

//Screen resize
window.addEventListener("resize",function(){
	let sliders=document.getElementsByClassName("sliderOuter");
	for (var i=0; i<sliders.length; i++){
		//Set outerTag parameters
		let width=$(sliders[i]).width();
		let height=Math.floor(width/pro);
		$(sliders[i]).css("height",height+"px");
		//Inner image correction
		var image = sliders[i].querySelector(".slider-image");
		sizeCorrection(image);
	}
	//Zoomed image correction
	zoomSizeCorrection();
});

//Gallery class
function Gallery(id){
	
	let outerId = id;
	let index=0;
	let indexZoom=0;
	let string = {};
	let images = [];
	
	// Setters
	this.setterImages = function() {
		for (var i=0; i<arguments.length; i++){
			images.push(arguments[i]);
		}
	}	
	this.setterString = function(arg) {
		string = arg;
	}
	// - Set active image 'src'
	function imageSrc(){
		var image = document.getElementById(outerId).querySelector(".slider-image");
		image.src=images[index];
	}
	
	// Getters
	this.objectNumber = function() {
		return string.objectNumber;
	}
	this.getOuterId = function() {
		return outerId;
	}
	this.getTitle = function() {
		return string.title;
	}
	this.getLocation = function() {
		return string.location;
	}
	this.getContent = function() {
		var res = string.content.split('&');
		return res;		
	}
	this.getImages = function(){
		return images;
	}
	this.getFirstImage = function() {
		return images[0];
	}
	
	//Changing image left
	this.left=function(){	
		index = (index>0) ? index-1 : images.length-1;
		imageSrc.call(this);
	}	
	//Changing image right
	this.right=function(){
		index = (index<images.length-1) ? index+1 : 0;
		imageSrc.call(this);
	}	
	
	//Show first image
	this.imageShow = function() {
		tag = document.getElementById(outerId).querySelector('.slider-image');
		sizeCorrection(tag);
	}
	
	// ZOOM IN	
	// - ZoomIn show
	this.zoomIn = function() {
		//Top nav hides
		$("nav").css('display','none');
		$(".catalogue-information").css('display','none');
		//Get zooming image
		var tag = document.getElementById(outerId);
		$(tag.querySelector('.zoomWrapper')).addClass("zoomWrapper-activated");		
		$(tag.querySelector('.zoomBox')).addClass('zoomBox-activated');		
		$(tag.querySelector('.zoomImageOuter')).addClass('zoomImageOuter-activated');				
		let src = images[index];
		$(tag.getElementsByClassName('zoomImage')[0]).attr("src",src);
		//Set sizes
		zoomSizeCorrection(tag.querySelector('.zoomBox'), tag.querySelector('.zoomImage'));
		zoomCorrection(true);
	}	
	//ZoomIn image
	this.rightZoom=function(){
		indexZoom = (indexZoom<images.length-1) ? indexZoom+1 : 0;
		imageZoomSrc();
	}
	this.leftZoom=function(){
		indexZoom = (indexZoom>0) ? indexZoom-1 : images.length-1;
		imageZoomSrc();
	}
	function imageZoomSrc(){
		$(document.getElementById(outerId).querySelector('.zoomImage')).attr('src',images[indexZoom]);
	}	
	//Slider zoomIn close
	this.zoomInClose = function() {
		var tag = document.getElementById(outerId);
		$(tag.querySelector('.zoomBox')).removeClass('zoomBox-activated');
		$(tag.querySelector('.zoomWrapper')).removeClass('zoomWrapper-activated');
		$(tag.querySelector('.zoomImageOuter')).removeClass('zoomImageOuter-activated');
		zoomCorrection(false);
		//Top nav shows
		$("nav").css('display','block');
		$(".catalogue-information").css('display','block');
	}
	
}

//Slider zoomIn size
function zoomSizeCorrection(zoomBox, zoomImage){
	//Get screen size
	let screenWidth = $(zoomBox).width()*0.9;
	let screenHeight = $(zoomBox).height()*0.9;
	screen_pro = screenWidth/screenHeight;
	if (screen_pro>pro){
		let outer = {};
		$(zoomImage).css({
			'width': 'auto',
			'height': screenHeight+"px"
		});
	}
	else{
		$(zoomImage).css({
			'width': screenWidth+"px",
			'height': 'auto'
		});
	}
}

//Solve bugs
function zoomCorrection(isHide){
	//Hide/show 'footer'
	if (isHide){
		$("footer").css("display","none");
	}
	else{
		$("footer").css("display","block");		
	}
}

//Show loaded image and hide spinner
/* function imageShow(outerId){	
	sizeCorrection(this);
	var spinner = this.parentNode.querySelector(".spinner");
	$(spinner).addClass("spinner-hide");
	$(this).addClass("slider-image-show");
}*/

//Size correction
function sizeCorrection(tag){
	let width=$(tag).width();
	let height=$(tag).height();
	let proImage=$(tag).width()/$(tag).height();
	if (proImage>pro){
		$(tag).css({
			"width": "auto",
			"height": "100%"
		});
	}
	else{
		$(tag).css({
			"width": "100%",
			"height": "auto"
		});
	}
}