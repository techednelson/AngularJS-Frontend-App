// main module called myApp
angular.module('myApp', [
  'ngRoute', 
  'employeeCtrl',
  'employeeService',
  'departmentCtrl', 
  'departmentService',
  'commonService'
])

// configure routes
  .config(function($routeProvider) {
    $routeProvider
    
    .when('/', { 
      templateUrl : 'views/home.html',
      controller : ''
    })

    .when('/new_employee', {
      templateUrl : 'views/create_employee.html',
      controller : 'createEmployee'
    })

    .when('/edit_employee/:id', {
      templateUrl : 'views/edit_employee.html',
      controller : 'updateEmployee'
    })

    .when('/show_employees', {
      templateUrl : 'views/show_employees.html',
      controller : 'employees'
    })

    .when('/new_department', {
      templateUrl : 'views/create_department.html',
      controller : 'createDepartment'
    })

    .when('/edit_department/:id', {
      templateUrl : 'views/edit_department.html',
      controller : 'updateDepartment'
    })

    .when('/show_departments', {
      templateUrl : 'views/show_departments.html',
      controller : 'departments'
    })

    .otherwise({
      redirectTo: 'views/home.html/'
    });

});


