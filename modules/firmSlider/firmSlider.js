var FirmSlider=function(){
	
	var images=['sharp.jpg','SMA.png','trina-solar-logo.jpg','aleo.png','fronius.png','jaSolar.png','jinko.png','longiSolar.png'];
	var path="images/manufacturerLogo/";
	var isAnimationStart=false;
	var animationCount=0;
	var left=0;
	var leftStep=0;
		
	//Creating DOM structure
	this.createStructure=function(){
		let obj=document.querySelector('#firmSliderOuter');
		if (obj==null)
			return;
		var div=document.createElement('div');
		$(div).attr('id','firmSlider');
		obj.appendChild(div);
		//Add images
		images.forEach(function(item){
			let img=document.createElement('img');
			img.src=path+item;
			$(img).addClass('firmSlider-image');
			div.appendChild(img);
		});
		//Add gradients
		let grad=document.createElement('div');
		$(grad).addClass('firmSlider-gradient-left');
		obj.appendChild(grad);
		grad=document.createElement('div');
		$(grad).addClass('firmSlider-gradient-right');
		obj.appendChild(grad);
		//Add hover div
		let hover=document.createElement('div');
		$(hover).attr('id','firmSliderHover');
		div.appendChild(hover);
		//Inner box width calculates
		let width=widthCalculate(images.length);
		$(div).css('width',width);
		//Sliding preparation
		let imgWidth=$('.firmSlider-image').css('width');
		leftStep=+imgWidth.replace("px","");
		this.start();
		
		function widthCalculate(count){
			let imgWidth=$('.firmSlider-image').css('width');
			imgWidth=+imgWidth.replace("px","");
			let imgMarginLeft=$('.firmSlider-image').css('margin-left');
			imgMarginLeft=+imgMarginLeft.replace("px","");
			let imgMarginRight=$('.firmSlider-image').css('margin-right');
			imgMarginRight=+imgMarginRight.replace("px","");
			let width=(imgMarginLeft+imgWidth+imgMarginRight)*count;
			return width;
		}	
	}

	//Start animating
	this.start=function(){
		isAnimationStart=true;
	}
	
	var animating=setInterval(function(){
		if (isAnimationStart){
			animationCount++;
				//Moving
				if (animationCount<images.length){
					left-=leftStep;
					$("#firmSlider").animate({left: left+'px'});
				}
				//Got to first
				else{
					left=0;
					animationCount=0;	
					$("#firmSlider").css('left',left+'px');
				}
		}
	},3000);
	
	this.stop=function(){
		clearInterval(animating);
	}
	
}

function firmSlider(){
	var firmSlider=new FirmSlider();
	firmSlider.createStructure();
}