/* mainPage controller */

angular.module('mainModule')
	.controller('mainController',function($scope){
		
	/* Main menu navigation */
		
		//This page content correction
		$scope.$emit('ngViewChanged',"mainController");
		
		//Navigation show/hide
		$(".nav").on('click',function(){
			$(".mainPage-nav-outer").slideToggle(1,function(){
				if ($(this).css('display')==='none')
					$(this).removeAttr('style');
			});
		});
		
		$scope.viewLoaded=function(){
			$(".carousel").carousel();
			goUp();
		}
		
	/* Navigation menu shows/hides during scrolling */
		//Get current position
		let isNavFixed=false;
		let nav=document.getElementsByTagName("nav")[0];
		let fB=document.getElementsByClassName("mainPage-fB")[0];
		//Scrolling
		$(window).scroll(function(){
			let documentTop=$(document).scrollTop();
			if (documentTop>100 && !isNavFixed && !navMenuFixing){
				$(nav).fadeIn();
				$(fB).fadeOut();
				isNavFixed=true;
			}
			if (documentTop<=100 && isNavFixed && !navMenuFixing){
				$(nav).fadeOut();
				$(fB).fadeIn();
				isNavFixed=false;
			}
		});
									
});