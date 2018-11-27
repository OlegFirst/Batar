angular.module('interestingModule')
	.controller('interestingController',function($scope){
		
		$scope.$emit('ngViewChanged','interestingController');
		
	});