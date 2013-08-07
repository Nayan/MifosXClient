'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('LoginController', ['$scope','$http','$location',function ($scope,$http,$location) {
					  $scope.login = function(User) {
					  		
					  			var params = {'password':User.password ,'username':User.name};
					  			var config = { 'method': 'POST', 'url': 'https://demo.openmf.org/mifosng-provider/api/v1/authentication', 'params': params};
								// configuration object
								$http(config)
								.success(function(data, status, headers, config) {
									if (data.authenticated) {
										$location.path('/home');
										$scope.user.loggedin = data.authenticated;
										$http.defaults.headers.common.Authorization = 'Basic ' + data.base64EncodedAuthenticationKey;
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
  .controller('ClientCtrl', function($scope , $http , Paginator) {

  	  	$scope.query = 'Testing';
		var fetchFunction = function(offset, limit, callback) {
				$http.get('https://demo.openmf.org/mifosng-provider/api/v1/clients',
				{params: {offset: offset, limit: limit}})
				.success(callback);
				};
		$scope.searchPaginator = Paginator(fetchFunction, 4);
  })
  .controller('CreateClientCtrl', function($scope , $http , $location , ClientTemplate , Clients) {
				
				ClientTemplate.get(function(data){
					$scope.offices = data.officeOptions;
					$scope.staffs = data.staffOptions;
				});

				$scope.updateStaffs = function() {
					$scope.staffs={};
				};

				$scope.submit = function() {   
          			this.formData.locale = 'en';
          			this.formData.dateFormat = 'dd MMMM yyyy';
          			this.formData.active = 'false';
					Clients.save(this.formData,function(data){
						$location.path('/viewclient/' + data.clientId);
					});
    			};

  })
    .controller('SearchCtrl', function($scope , $routeParams , GlobalSearch) {
		   $scope.searchResults = GlobalSearch.search({query: $routeParams.query});
	})
    .controller('ViewClientCtrl', function($scope , $routeParams , Clients , ClientAccounts, ClientNotes) {
		   $scope.client = Clients.get({id: $routeParams.id});
		   $scope.clientAccounts = ClientAccounts.get({id: $routeParams.id});
		   $scope.clientNotes = ClientNotes.search({id: $routeParams.id});		
  })
    .controller('LoanProductCtrl', function($scope , $routeParams , LoanProducts) {
		   $scope.loanproducts = LoanProducts.search();		
  })
  .controller('SavingProductCtrl', function($scope , $routeParams , SavingProducts) {
		   $scope.savingproducts = SavingProducts.search();		
  })
  .controller('ChargesCtrl', function($scope , $routeParams , Charges) {
		   $scope.charges = Charges.search();		
  });
  	