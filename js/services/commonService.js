var services = angular.module('commonService', [])

.service('countryService',['$http', function ($http) {
    this.getCountries = function() {
        var countries = [];
        $http.get('http://localhost:8080/human-resources-web/rest/countries').then(function(response) {
            for(var item of response.data) {
                if(countries.length === 0) {
                    countries.push(item.name);
                } else if(countries.indexOf(item.name) === -1) {
                    countries.push(item.name);
                }
            }
        }).catch(function(error) {
            console.log(error);
        });
        return countries;
    }
}])

.service('cityService', ['$http', function ($http) {
    this.getCities = function(country) {
        var cities = [];
        $http.get('http://localhost:8080/human-resources-web/rest/countries').then(function(response) {
            for(var item of response.data) {
                if(item.name === country) cities.push(item.city);
            }
        }).catch(function(error) {
            console.log(error);
        });
        return cities;
    }
}]);
