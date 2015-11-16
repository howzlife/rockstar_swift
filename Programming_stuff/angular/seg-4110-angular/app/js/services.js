'use strict';

/* Services */

var nflPlayerServices = angular.module('nflPlayerServices', ['ngResource']);

nflPlayerServices.factory('Player', ['$resource',
  function($resource){
    return $resource('players/:playerId.json', {}, {
      query: {method:'GET', params:{playerId:'players'}, isArray:true}
    });
  }]);
