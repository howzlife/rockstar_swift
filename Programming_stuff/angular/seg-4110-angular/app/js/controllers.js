'use strict';

/* Controllers */

var nflPlayerControllers = angular.module('nflPlayerControllers', []);

nflPlayerControllers.controller('PlayerListCtrl', ['$scope', 'Player', '$interval',
  function($scope, Player, $interval) {
    $scope.players = Player.query();
    $scope.orderProp = 'age';
    $scope.score = 0;

    var timer = null

    $scope.startSimulation = function() {
        timer = $interval(function() {
          var p;
          for (var i = 0; i < $scope.players.length; i++) {
            p = $scope.players[i];
            var bonus = 10 * Math.random();
            var score = Math.random() * bonus;
            p.score += score;
            $scope.score += score;
          }
        }, 2000)
    }

    $scope.killSimulation = function() {
      if(angular.isDefined(timer)) {
        $interval.cancel(timer);
        timer=undefined;
      }
    }

    $scope.resetSimulation = function() {
      for (var i = 0; i < $scope.players.length; i++) {
        $scope.players[i].score = 0;
        $scope.score = 0;
      }
    }
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