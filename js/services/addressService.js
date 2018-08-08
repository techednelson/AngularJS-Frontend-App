var services = angular.module('addressService', []);

services.factory('locationFactory', function () {
  return {
      greece : ['athens', 'thessaloniki', 'patra'],
      england : ['london', 'manchester city', 'liverpool'],
      mexico : ['mexico', 'guadalajara', 'monterrey'],
      spain: ['madrid', 'barcelona', 'sevilla'],
      USA : ['new york', 'los angeles', 'san francisco']
  };
});

