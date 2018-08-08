angular.module('employeeCtrl', [])

  .controller('employees', ['$scope','employeesFactory', '$location' , function($scope, employeesFactory, $location) {

    //Get method to render Employees List in show_employees
    $scope.employees = employeesFactory.query();
    $scope.employeeOrder = 'firstName'; //show employee list order by firstName as default

    $scope.editEmployee = function(employeeId) {
      $location.path('/edit_employee/' + employeeId);
    };

  }])

  .controller('createEmployee', ['$scope', 'employeesFactory', 'locationFactory', '$location' , function($scope, employeesFactory, locationFactory,  $location) {

    // $scope.employee = { 
    //   firstName : '',
    //   lastName : '',
    //   birthDate : '',
    //   address: {
    //     city : '',
    //     country : '',
    //     street : '',
    //     streetNumber : '',
    //     zipCode: '' 
    //   },
    //   phoneNumber : '',
    //   email : '',
    //   salary : '',
    //   department : {
    //     id : ""
    //   },
    //   joinDate : ''
    // };

    //Select options for country and city
    $scope.countries = locationFactory;
    console.log(locationFactory);

    //Select options for departments
    $scope.areas = {
      hr: 'hr', 
      it: 'it', 
      sales: 'sales', 
      marketing: 'marketing', 
      development: 'development'
     };
    console.log(areas);

    // callback for ng-submit 'registerEmployee'
    $scope.registerEmployee = function() {
      employeesFactory.create($scope.employee);
      $scope.employees = employeesFactory.query();
      $location.path('/show_employees');
    };

  }])

  .controller('updateEmployee', ['$scope', 'employeeFactory', 'employeesFactory', 'locationFactory', '$location', '$routeParams', '$window', function($scope, employeeFactory, employeesFactory, locationFactory, $location, $routeParams, $window) {

    // get by id method to bring employee with id preselect as parameter from web service
    $scope.employee = employeeFactory.show({id: $routeParams.id});

    // preselected values for country and city
    $scope.employee.$promise.then(function() {
      $scope.countryPre = $scope.employee.address.country;
      $scope.cityPre = $scope.employee.address.city;
    });

    //Select options for country and city
    $scope.countries = locationFactory;

    $scope.getSelectedCountry = function() {
      $scope.employee.address.country = $scope.countrySrc;
    };
    $scope.getSelectedCity = function() { 
      $scope.employee.address.city = $scope.citySrc;
    };
    
    // callback for ng-submit 'updateEmployee':
    $scope.updateEmployee = function () {
      employeesFactory.update($scope.employee);
      $location.path('/show_employees');
    };

    // callback for ng-click 'cancel':
    $scope.cancel = function () {
      $location.path('/show_employees');
    };

    // callback for ng-click 'deleteEmployee':
    $scope.deleteEmployee = function (employeeId) {
      employeeFactory.delete({ id: employeeId });
      $scope.employees = employeesFactory.query();
      $window.alert('Employee was successfully deleted')
  };

  
}]);
