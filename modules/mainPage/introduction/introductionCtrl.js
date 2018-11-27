angular.module('introductionModule')
	.controller('introductionController',function($rootScope, $scope, $location, $anchorScroll){
		
		$scope.$emit('ngViewChanged','introductionController');		
		
		//Scroll to the content section. When 'introductionView' is showing
		$scope.scrollTo = function(id){
			if (id !== null){
				$anchorScroll.yOffset = 150;//Scroll by 150 extra pixels
				$location.hash(id);
				$anchorScroll();
			}
			$rootScope.introductionItem = null;
		}
		
		//Scroll to the content section. When 'introductionView' starts
		setTimeout(function(){
			$scope.scrollTo($rootScope.introductionItem);
		},1000);
		
	});