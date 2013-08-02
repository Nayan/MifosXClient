'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('LoginController', ['$scope','$http','$location',function ($scope,$http,$location) {
					  $scope.login = function(User) {
					  		
					  			var params = {'password':User.password ,'username':User.name};
					  			var headers = {'X-Mifos-Platform-TenantId':'default','Content-Type':'application/json; charset=utf-8'};
								var config = { 'method': 'POST', 'url': 'https://demo.openmf.org/mifosng-provider/api/v1/authentication', 'params': params ,'headers':headers};
								// configuration object
								$http(config)
								.success(function(data, status, headers, config) {
									if (data.authenticated) {
										// succefull login
										//alert('authenticated ' + data.username);
										$location.path('/home');
										$scope.user.loggedin = data.authenticated;
										$http.defaults.headers.common.Authorization = 'Basic ' + data.base64EncodedAuthenticationKey;
										$http.defaults.headers.common['X-Mifos-Platform-TenantId'] = 'default';
									}
									else {
									alert(data.username);
									}
								})
								.error(function(data, status, headers, config) {
								});
					  };
				}
			])
  .controller('HomeCtrl', [function() {

  }])
  .controller('ClientCtrl', function($scope , $http , Restangular , Paginator) {
	  	//$scope.clients = Restangular.all('clients').getList();

  	  	$scope.query = 'Testing';
		var fetchFunction = function(offset, limit, callback) {
				$http.get('https://demo.openmf.org/mifosng-provider/api/v1/clients',
				{params: {offset: offset, limit: limit}})
				.success(callback);
				};
		$scope.searchPaginator = Paginator(fetchFunction, 10);
  })
  .controller('CreateClientCtrl', function($scope , $http) {
				$http.get('https://demo.openmf.org/mifosng-provider/api/v1/clients/template',
				{params: {}})
				.success(function(data){
					$scope.offices = data.officeOptions;
					$scope.staffs = data.staffOptions;
				});

				$scope.updateStaffs = function() {
					alert("ter");
					$scope.staffs={};
				};
  })
  ;