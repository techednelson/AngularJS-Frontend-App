angular.module('departmentCtrl', [])

  .controller('departments', ['$scope','departmentsFactory','$location', function($scope, departmentsFactory, $location) {

    //Get method to render Departments List in show_employees
    $scope.departments = departmentsFactory.query();
    $scope.departmentOrder = 'name'; //show employee list order by firstName as default

    $scope.editDepartment = function(departmentId) {
      $location.path('/edit_department/' + departmentId);
    };

  }])

  .controller('createDepartment', ['$scope','departmentsFactory', 'locationFactory', '$location', '$window', function($scope, departmentsFactory, locationFactory, $location, $window) {

    $scope.department = { 
      name : '',
      address: {
        city : '',
        country : '',
        street : '',
        streetNumber : '',
        zipCode: '' 
      }
    };

    //Select options for country and city
    $scope.countries = locationFactory;

    $scope.getSelectedCountry = function() {
      for(var propName in $scope.countries) {
        if($scope.countries[propName] === $scope.countrySrc) {
          $scope.department.address.country = propName;
        }
      }
    };

    $scope.getSelectedCity = function() { 
      $scope.department.address.city = $scope.city;
    };

    // callback for ng-submit 'registerDepartment'
    $scope.registerDepartment = function() {
      departmentsFactory.create($scope.department).$promise.then(function() {
        $window.alert('Department was successfully created');
        $window.location.reload();
        $location.path('/show_departments/');
      }).catch(function(error) {
        console.log(error);
        $window.alert('There was a problem registering the new department');
      });
    };
    
  }])

  .controller('updateDepartment', ['$scope', 'departmentFactory', 'departmentsFactory', 'locationFactory', '$location', '$routeParams', '$window', function($scope, departmentFactory, departmentsFactory, locationFactory, $location, $routeParams, $window) {

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
      for(var propName in $scope.countries) {
        if($scope.countries[propName] === $scope.countrySrc) {
          $scope.department.address.country = propName;
        }
      }
    };
    $scope.getSelectedCity = function() { 
      $scope.department.address.city = $scope.city;
    };

    // callback for ng-submit 'updateDepartment':
    $scope.updateDepartment = function () {
      departmentsFactory.update($scope.department).$promise.then(function() {
        $window.alert('Department was successfully updated');
        $window.location.reload();
        $location.path('/show_departments/');
      }).catch(function(error) {
        console.log(error);
        $window.alert('There was a problem updating the department');
      });
    };

    // callback for ng-click 'cancel':
    $scope.cancel = function () {
      $location.path('/show_departments');
    };

    // callback for ng-click 'deleteDepartment':
    $scope.deleteDepartment = function (departmentId) {
      departmentFactory.delete({ id: departmentId }).$promise.then(function() {
        $window.alert('Department was successfully deleted');
        $window.location.reload();
        $location.path('/show_departments/');
      }).catch(function(error) {
        console.log(error);
        $window.alert('There was a problem deleting department');
      });
    };

  }]);

