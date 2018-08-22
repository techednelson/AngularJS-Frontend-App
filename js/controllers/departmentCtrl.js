angular.module('departmentCtrl', ['ui.bootstrap'])

  .controller('departments', ['$scope','departmentsFactory','$location', function($scope, departmentsFactory, $location) {

    $scope.departmentOrder = 'name'; //show employee list order by firstName as default

    // Pagination
    $scope.currentPage = 1;
    $scope.numPerPage = 5;
    $scope.maxSize = 5;
    
    $scope.$watch("currentPage + numPerPage", function() {

      var begin = (($scope.currentPage - 1) * $scope.numPerPage);
      var end = begin + $scope.numPerPage;

      //Get method to render Departments List in show_employees
      departmentsFactory.query().$promise.then(function(response) {
        $scope.departments = response;
        $scope.departmentsFiltered =  $scope.departments.slice(begin, end);
      }).catch(function(error) {
        console.log(error);
      });
    });

    $scope.editDepartment = function(departmentId) {
      $location.path('/edit_department/' + departmentId);
    };

  }])

  .controller('createDepartment', ['$scope','departmentsFactory', 'countryService', 'cityService', '$location', '$window', function($scope, departmentsFactory, countryService, cityService, $location, $window) {

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
    $scope.countries = countryService.getCountries();

    $scope.getSelectedCountry = function() {
      $scope.department.address.country = $scope.countrySrc;
      $scope.cities = cityService.getCities($scope.countrySrc);
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

  .controller('updateDepartment', ['$scope', 'departmentFactory', 'departmentsFactory', 'countryService', 'cityService', '$location', '$routeParams', '$window', function($scope, departmentFactory, departmentsFactory, countryService, cityService, $location, $routeParams, $window) {

    // get by id method to bring department with id preselect as parameter from web service
    $scope.department = departmentFactory.show({id: $routeParams.id});

    // preselected values for country and city
    $scope.department.$promise.then(function() {
      $scope.countryPre = $scope.department.address.country;
      $scope.cityPre = $scope.department.address.city;
    });

    //Select options for country and city
    $scope.countries = countryService.getCountries();

    $scope.getSelectedCountry = function() {
      $scope.department.address.country = $scope.countrySrc;
      $scope.cities = cityService.getCities($scope.countrySrc);
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

