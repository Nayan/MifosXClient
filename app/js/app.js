'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives', 'myApp.controllers' ,'ui.bootstrap', 'restangular']).
  config(['$routeProvider','RestangularProvider', function($routeProvider , RestangularProvider) {
    
    $routeProvider.when('/view1', {templateUrl: 'partials/partial1.html', controller: 'MyCtrl1'});
    $routeProvider.when('/clients', {templateUrl: 'partials/clients.html', controller: 'ClientCtrl'});
    $routeProvider.when('/home', {templateUrl: 'partials/home.html', controller: 'HomeCtrl'});
    $routeProvider.when('/createclient', {templateUrl: 'partials/createClient.html', controller: 'CreateClientCtrl'});
    RestangularProvider.setBaseUrl('https://demo.openmf.org/mifosng-provider/api/v1');

  }]);
