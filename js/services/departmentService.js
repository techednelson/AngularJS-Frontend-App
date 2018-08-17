var services = angular.module('departmentService', ['ngResource']);

services.factory('departmentsFactory', ['$resource', function ($resource) {
    return $resource('http://localhost:8080/human-resources-web/rest/departments', {}, {
        query: { method: 'GET', isArray: true },
        create: { method: 'POST' },
        update: { method: 'PUT'},
    });
}]);

services.factory('departmentFactory', ['$resource', function ($resource) {
    return $resource('http://localhost:8080/human-resources-web/rest/departments/:id', {}, {
        show: { method: 'GET' },
        delete: { method: 'DELETE', params: {id: '@id'} }
    });
}]);
