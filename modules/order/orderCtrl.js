// Make order
angular.module('orderModule')
	.controller('orderController',function($scope, $rootScope, orderService){
		
		$scope.isOrderBasket = true;
		
		/*$scope.name = "kqswq";
		$scope.surname = "xsxs";
		$scope.eMail = "q@rtdrt";
		$scope.phoneNumber = "qsqssas";
		$scope.location = "dwqdwqd";
		$scope.remark = "aswqswq";*/
		
		$scope.orderForm = {
			eMail : true
		};
		
		// Order
		var msg = {};
				
		$scope.$emit('ngViewChanged','orderController');
		
		$scope.orderSubmit = function() {
			//validationContent();
			var msg = createContent();
			console.log(msg);
			sendLetter(msg);
		}
				
		function validationContent() {
			// 'Order form' error messages clear
			$scope.orderForm.eMail = false;
			// Mail validation
			var pat = /^[a-zA-Z]{1}[a-zA-Z0-9]+/g;			
			$scope.orderForm.eMail = false;
		}		
		
		function createContent() {
			msg.name = $scope.name;
			msg.surname = $scope.surname;
			msg.eMail = $scope.eMail;
			msg.phoneNumber = $scope.phoneNumber;
			msg.location = $scope.location;
			msg.remark = $scope.remark;
			msg.basket = [];
			if ($scope.isOrderBasket) {
				basket.information.forEach(function(item) {
					var obj = {};
					obj.title = item.title;
					obj.id = item.id;
					obj.count = +item.count;
					msg.basket.push(obj);
				});
			}
			return msg;
		}	
		
		function sendLetter(msg) {
			orderService.mailSender(JSON.stringify(msg), function(response) {
				if (response.success) {
					console.log("Success",response.data);
					$rootScope.message.setter(true, "Замовлення", "Ваш лист успішно відправлений", [3]);
				}
				else {
					$rootScope.message.setter(true, "Замовлення", "Помилка у відправленні листа", [3]);
					console.error("Error");
				}
			});
		}
		
	})
	
	.service('orderService', function($http) {
		
		this.mailSender = function(msgJSON, callBack) {
			
			//msgJSON = '[{"name":"1","surname":"4","eMail":"one@ukr.net","location":"5","remark":"Remark","basket":[{"title":"Сонячна панель","id":47,"count":1}]}]';
			msgJSON = '[' + msgJSON + ']';
			
			var res = {
				success: false,
				data: null
			};
			$http({
				method: 'POST',
				url: 'server/mailSender.php',
				headers: {
					"Content-type": "application/json; charset=UTF-8"
				},
				data: msgJSON
			})
			.then(function success(response){
				res.success = true;
				res.data = response.data;
				return callBack(res);
			},
			function error(response){
				return callBack(res);
			});
		}
		
	});