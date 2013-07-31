'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives', 'myApp.controllers' ,'ui.bootstrap', 'restangular']).
  config(['$routeProvider','RestangularProvider', function($routeProvider , RestangularProvider) {
    
    $routeProvider.when('/view1', {templateUrl: 'partials/partial1.html', controller: 'MyCtrl1'});
    $routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: 'MyCtrl2'});
    $routeProvider.when('/clientProfile', {templateUrl: 'partials/clientProfile.html', controller: 'MyCtrl2'});

    RestangularProvider.setBaseUrl('https://api.mongolab.com/api/1/databases/angularjs/collections');
      

  }]);
