'use strict';

// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives', 'myApp.controllers' ,'ui.bootstrap', 'ngResource']).
  config(function($httpProvider , $routeProvider ) {

    $routeProvider.when('/home', {templateUrl: 'partials/home.html', controller: 'HomeCtrl'});
    $routeProvider.when('/view1', {templateUrl: 'partials/partial1.html', controller: 'MyCtrl1'});

    $routeProvider.when('/clients', {templateUrl: 'partials/clients.html', controller: 'ClientCtrl'});
    $routeProvider.when('/createclient', {templateUrl: 'partials/createClient.html', controller: 'CreateClientCtrl'});
    $routeProvider.when('/viewclient/:id', {templateUrl: 'partials/viewClient.html', controller: 'ViewClientCtrl'});

	$routeProvider.when('/search/:query', {templateUrl: 'partials/search/glresults.html', controller: 'SearchCtrl'});

    $httpProvider.defaults.headers.common['X-Mifos-Platform-TenantId'] = 'default';
    $httpProvider.defaults.headers.common['Content-Type'] = 'application/json; charset=utf-8';

  });