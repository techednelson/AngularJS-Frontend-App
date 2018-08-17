angular.module('employeeCtrl', [])

  //employees controller that applies over show_employees.html
  .controller('employees', ['$scope','employeesFactory', '$location', function($scope, employeesFactory, $location) {

    //Get method to render Employees List in show_employees
    $scope.employees = employeesFactory.query();
    $scope.employeeOrder = 'firstName'; //show employee list order by firstName as default

    $scope.editEmployee = function(employeeId) {
      $location.path('/edit_employee/' + employeeId);
    };

  }])

  //createEmployee controller that applies over create_employee.html
  .controller('createEmployee', ['$scope', 'employeesFactory', 'countryService', 'cityService', 'departmentsFactory', '$location', '$window', function($scope, employeesFactory, countryService, cityService, departmentsFactory, $location, $window,) {

    $scope.employee = { 
      firstName : '',
      lastName : '',
      birthDate : '',
      address: {
        city : '',
        country : '',
        street : '',
        streetNumber : '',
        zipCode: '' 
      },
      phoneNumber : '',
      email : '',
      salary : '',
      department : {
        id : ""
      },
      joinDate : ''
    };

    //Select options for country and city
    $scope.countries = countryService.getCountries();

    $scope.getSelectedCountry = function() {
      $scope.employee.address.country = $scope.countrySrc;
      $scope.cities = cityService.getCities($scope.countrySrc);
    };

    $scope.getSelectedCity = function() { 
      $scope.employee.address.city = $scope.city;
    };

    //Select options for departments
    $scope.departments = departmentsFactory.query();

    $scope.getSelectedDepartment = function() {
      $scope.employee.department.id = $scope.departmentSrc.id;
    };
    
    // callback for ng-submit 'registerEmployee'
    $scope.registerEmployee = function() {
      employeesFactory.create($scope.employee).$promise.then(function() {
        $window.alert('Employee was successfully registered');
        $window.location.reload();
        $location.path('/show_employees/');
      }).catch(function(error) {
        console.log(error);
        $window.alert('There was a problem registering the new employee');
      });
    };

  }])

  //updateEmployee controller that applies over edit_employee.html
  .controller('updateEmployee', ['$scope', 'employeeFactory', 'employeesFactory', 'departmentsFactory',  'countryService', 'cityService', '$location', '$routeParams', '$window', function($scope, employeeFactory, employeesFactory, departmentsFactory, countryService, cityService, $location, $routeParams, $window) { 

    // get by id method to bring employee with id preselect as parameter from web service
    $scope.employee = employeeFactory.show({id: $routeParams.id});

    // preselected values for country, city and department
    $scope.employee.$promise.then(function() {
      $scope.countryPre = $scope.employee.address.country;
      $scope.cityPre = $scope.employee.address.city;
      $scope.departmentPre = $scope.employee.department.name;
    });

   //Select options for country and city
   $scope.countries = countryService.getCountries();

   $scope.getSelectedCountry = function() {
     $scope.employee.address.country = $scope.countrySrc;
     $scope.cities = cityService.getCities($scope.countrySrc);
   };
    //Select options for departments
    $scope.departments = departmentsFactory.query();

    $scope.getSelectedDepartment = function() {
      $scope.employee.department.id = $scope.departmentSrc.id;
    };
    
    // callback for ng-submit 'updateEmployee':
    $scope.updateEmployee = function () {
      employeesFactory.update($scope.employee).$promise.then(function() {
        $window.alert('Employee was successfully updated');
        $window.location.reload();
        $location.path('/show_employees/');
      }).catch(function(error) {
        console.log(error);
        $window.alert('There was a problem updating the employee');
      });
    };

    // callback for ng-click 'cancel':
    $scope.cancel = function () {
      $location.path('/show_employees');
    };

    // callback for ng-click 'deleteEmployee':
    $scope.deleteEmployee = function (employeeId) {
      employeeFactory.delete({ id: employeeId }).$promise.then(function() {
        $window.alert('Employee was successfully registered');
        $window.location.reload();
        $location.path('/show_employees/');
      }).catch(function(error) {
        console.log(error);
        $window.alert('There was a problem deleting the employee');
      });
    };

  }]);
