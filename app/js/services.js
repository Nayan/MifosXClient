'use strict';

/* Services */
angular.module('myApp.services', [])
	.factory('Paginator', function() {
				// Despite being a factory, the user of the service gets a new
				// Paginator every time he calls the service. This is because
				// we return a function that provides an object when executed
				return function(fetchFunction, pageSize) {
				var paginator = {
				hasNextVar: false,
				next: function() {
				if (this.hasNextVar) {
				this.currentOffset += pageSize;
				this._load();
				}
				},
				_load: function() {
				var self = this;
				fetchFunction(this.currentOffset, pageSize + 1, function(items) {
				self.currentPageItems = items.pageItems;
				self.hasNextVar = items.pageItems.length === pageSize + 1;;

				});
				},
				hasNext: function() {
				return this.hasNextVar;
				},
				previous: function() {
				if(this.hasPrevious()) {
				this.currentOffset -= pageSize;
				this._load();
				}
				},
				hasPrevious: function() {
				return this.currentOffset !== 0;
				},
				currentPageItems: [],
				currentOffset: 0
				};
				// Load the first page
				paginator._load();
				return paginator;
				};
	})
	.factory('ClientTemplate', function($resource)
	{
    	return $resource('https://demo.openmf.org/mifosng-provider/api/v1/clients/template');
	})
	.factory('Clients', function($resource)
	{
    	return $resource('https://demo.openmf.org/mifosng-provider/api/v1/clients/:id',{ id: '@id' });
	})
	.factory('GlobalSearch', function($resource)
	{
    	return $resource('https://demo.openmf.org/mifosng-provider/api/v1/search',{query:'@query'}, { 
		        search: {
				            method: 'GET',
				            params: {
				            		    query: '@query'
						            } ,
						    isArray:true
		    		    }
		    	}); 
	});
	;