angular.module('aboutUsModule').controller('aboutUsController',function($scope){
	
	//This page content correction
	$scope.$emit('ngViewChanged','aboutUsController');
	
	$scope.viewLoaded=function(){
		//firmSlider();
	}
	
});