var services = angular.module('employeeService', ['ngResource']);

services.factory('employeesFactory', function ($resource) {
    return $resource('http://localhost:8080/human-resources-web/rest/employees', {}, {
        query: { method: 'GET', isArray: true },
        create: { method: 'POST' },
        update: { method: 'PUT'}
    })
});

services.factory('employeeFactory', function ($resource) {
    return $resource('http://localhost:8080/human-resources-web/rest/employees/:id', {}, {
        show: { method: 'GET' },
        delete: { method: 'DELETE', params: {id: '@id'} }
    })
});


