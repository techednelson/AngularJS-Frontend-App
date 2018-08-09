angular.module('employeeCtrl', [])

  .controller('employees', ['$scope','employeesFactory', '$location', function($scope, employeesFactory, $location) {

    //Get method to render Employees List in show_employees
    $scope.employees = employeesFactory.query();
    $scope.employeeOrder = 'firstName'; //show employee list order by firstName as default

    $scope.editEmployee = function(employeeId) {
      $location.path('/edit_employee/' + employeeId);
    };

  }])

  .controller('createEmployee', ['$scope', 'employeesFactory', 'locationFactory', 'departmentsFactory', '$location', '$window', function($scope, employeesFactory, locationFactory, departmentsFactory, $location, $window,) {

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

    $scope.clear = angular.copy($scope.employee);

    //Select options for country and city
    $scope.countries = locationFactory;

    $scope.getSelectedCountry = function() {
      for(var propName in $scope.countries) {
        if($scope.countries[propName] === $scope.countrySrc) {
          $scope.employee.address.country = propName;
        }
      }
    };

    $scope.getSelectedCity = function() { 
      $scope.employee.address.city = $scope.city;
    };

    //Select options for departments
    $Scope.departments = [
      {name: 'hr'}, 
      {name: 'it'}, 
      {name: 'sales'}, 
      {name: 'marketing'}, 
      {name: 'development'}
    ];

    $scope.getSelectedDepartment = function() {
      departmentsFactory.query().$promise.then(function(response) {
        for(var item of response) {
          if(item.name === $scope.departmentSrc.name) {
            $scope.employee.department.id = item.id;
          }
        }
      });
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

  .controller('updateEmployee', ['$scope', 'employeeFactory', 'employeesFactory', 'locationFactory', '$location', '$routeParams', '$window', function($scope, employeeFactory, employeesFactory, locationFactory, $location, $routeParams, $window) { 

    // get by id method to bring employee with id preselect as parameter from web service
    $scope.employee = employeeFactory.show({id: $routeParams.id});

    // preselected values for country, city and department
    $scope.employee.$promise.then(function() {
      $scope.countryPre = $scope.employee.address.country;
      $scope.cityPre = $scope.employee.address.city;
      $scope.departmentPre = $scope.employee.department.name;
    });

    //Select options for country and city
    $scope.countries = locationFactory;

    $scope.getSelectedCountry = function() {
      for(var propName in $scope.countries) {
        if($scope.countries[propName] === $scope.countrySrc) {
          $scope.employee.address.country = propName;
        }
      }
    };
    $scope.getSelectedCity = function() { 
      $scope.employee.address.city = $scope.city;
    };

    //Select options for departments
    $scope.departments = [
      {name: 'hr'}, 
      {name: 'it'}, 
      {name: 'sales'}, 
      {name: 'marketing'}, 
      {name: 'development'}
    ];

    $scope.getSelectedDepartment = function() {
      $scope.employee.department.id = departmentsFactory.query().$promise.then(function(response) {
        return response.map(function(item) {
          if(item.name === $scope.departmentSrc.name) return item.id;
        })
      });
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
