'use strict';
var covid = angular.module('covid', [ 'ui.router' ]);
covid.config(function($stateProvider, $urlRouterProvider) {
	
	$urlRouterProvider.otherwise('dashboard');
	$stateProvider.state('dashboard',{
		url : '/dashboard',
		templateUrl : 'views/dashboard.html',
		controller : 'dashboardCtrl'
	})
	.state('add-Records',{
    		url : '/add-Records',
    		templateUrl : 'views/addRecords.html',
    		controller : 'addRecordsCtrl'
    	})
});

covid.controller('dashboardCtrl', [ '$scope','$http',
	function($scope, $http) {
		console.log('dashboardCtrl');
		$scope.getAllRecords = function() {
			var responsePromise = $http.get("http://localhost:8080/covid-rest/rest/covid/getAllRecords");
			responsePromise.then(successCallback, errorCallback);
			function successCallback(response) {
				if (response.status === 200) {
					$scope.Records = response.data.Records;
					console.log($scope.Records);
				}
			}
			function errorCallback(error) {
					$window.alert(JSON.stringify(error.data.Error[0].Message));
			}
		}
		$scope.getAllRecords();
		$scope.submit = function() {
                	console.log('submit function');
                		var country=$scope.country;
                		var responsePromise = $http.get("http://localhost:8080/covid-rest/rest/covid/getRecordsByCountry?country="+country);
                		responsePromise.then(successCallback, errorCallback);
                		function successCallback(response) {
                			if (response.status=== 200) {
                				$scope.Records = response.data.Records;
                				$scope.newDeaths=Records.get(newDeaths)
                				console.log($scope.newDeaths);
                				console.log($scope.Records);
                			}
                		}
                		function errorCallback(error) {
                				$window.alert(JSON.stringify(error.data.Error[0].Message));
                		}
                	}

}]);

covid.controller('addRecordsCtrl', [ '$scope','$http',
	function($scope, $http) {
	$scope.submit=function(){
		var responsePromise = $http.post("http://localhost:8080/covid-rest/rest/covid/addRecords",$scope.record,{
			headers : {
				'Content-Type' : 'application/json'
			},
		});
		responsePromise.then(successCallback);
		function successCallback(response) {
        if (response.status === 200)
				alert("data inserted");
			}
		function errorCallback(error) {
        		$window.alert(JSON.stringify(error.data.Error[0].Message));
        	}
	}
	$scope.update=function(){
		var responsePromise = $http.post("http://localhost:8080/covid-rest/rest/covid/updateRecords",$scope.record,{
			headers : {
				'Content-Type' : 'application/json'
			},
		});
		responsePromise.then(successCallback);
		function successCallback(response) {
        if (response.status === 200)
				alert("data updated");
			}
		function errorCallback(error) {
        		$window.alert(JSON.stringify(error.data.Error[0].Message));
        	}
	}
}]);
