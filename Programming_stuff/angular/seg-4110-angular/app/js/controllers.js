'use strict';

/* Controllers */

var nflPlayerControllers = angular.module('nflPlayerControllers', []);

nflPlayerControllers.controller('PlayerListCtrl', ['$scope', 'Player',
  function($scope, Player) {
    $scope.players = Player.query();
    $scope.orderProp = 'age';
  }]);

nflPlayerControllers.controller('PlayerDetailCtrl', ['$scope', '$routeParams', 'Player',
  function($scope, $routeParams, Player) {
    $scope.player = Player.get({playerId: $routeParams.playerId}, function(player) {
      $scope.mainImageUrl = player.images[0];
    });

    $scope.setImage = function(imageUrl) {
      $scope.mainImageUrl = imageUrl;
    };
  }]);