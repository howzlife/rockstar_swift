'use strict';

/* App Module */

var nflPlayerApp = angular.module('nflPlayerApp', [
  'ngRoute',
  'nflPlayerAnimations',
  'nflPlayerControllers',
  'nflPlayerFilters',
  'nflPlayerServices'
]);

nflPlayerApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/players', {
        templateUrl: 'partials/player-list.html',
        controller: 'PlayerListCtrl'
      }).
      when('/players/:playerId', {
        templateUrl: 'partials/player-detail.html',
        controller: 'PlayerDetailCtrl'
      }).
      otherwise({
        redirectTo: '/players'
      });
  }]);
