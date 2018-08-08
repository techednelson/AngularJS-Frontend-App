angular.module('departmentCtrl', [])

  .controller('departments', ['$scope','departmentsFactory','$location', function($scope, departmentsFactory, $location) {

    //Get method to render Departments List in show_employees
    $scope.departments = departmentsFactory.query();
    $scope.departmentOrder = 'name'; //show employee list order by firstName as default

    $scope.editDepartment = function(departmentId) {
      $location.path('/edit_department/' + departmentId);
    };

  }])

  .controller('createDepartment', ['$scope','departmentsFactory', 'locationFactory', '$location', function($scope, departmentsFactory, locationFactory, $location) {

    // $scope.department = { 
    //   name : '',
    //   address: {
    //     city : '',
    //     country : '',
    //     street : '',
    //     streetNumber : '',
    //     zipCode: '' 
    //   }
    // };

    //Select options for country and city
    $scope.countries = locationFactory;

    // callback for ng-submit 'registerDepartment'
    $scope.registerDepartment = function() {
      departmentsFactory.create($scope.department);
      $location.path('/show_departments');
      $scope.departments = departmentsFactory.query();
    };
    
  }])

  .controller('updateDepartment', ['$scope', 'departmentFactory', 'departmentsFactory', 'locationFactory', '$location', '$routeParams', function($scope, departmentFactory, departmentsFactory, locationFactory, $location, $routeParams) {

    // get by id method to bring department with id preselect as parameter from web service
    $scope.department = departmentFactory.show({id: $routeParams.id});

    // preselected values for country and city
    $scope.department.$promise.then(function() {
      $scope.countryPre = $scope.department.address.country;
      $scope.cityPre = $scope.department.address.city;
    });

    //Select options for country and city
    $scope.countries = locationFactory;

    $scope.getSelectedCountry = function() {
      $scope.department.address.country = $scope.countrySrc;
    };
    $scope.getSelectedCity = function() { 
      $scope.department.address.city = $scope.citySrc;
    };

    // callback for ng-submit 'updateDepartment':
    $scope.updateDepartment = function () {
      departmentsFactory.update($scope.department);
      $location.path('/show_departments');
    };

    // callback for ng-click 'cancel':
    $scope.cancel = function () {
      $location.path('/show_departments');
    };

    // callback for ng-click 'deleteDepartment':
    $scope.deleteDepartment = function (departmentId) {
      departmentFactory.delete({ id: departmentId });
      $scope.departments = departmentsFactory.query();
  };

}]);

