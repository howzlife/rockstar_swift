'use strict';

/* jasmine specs for controllers go here */
describe('NFL Player controllers', function() {

  beforeEach(function(){
    this.addMatchers({
      toEqualData: function(expected) {
        return angular.equals(this.actual, expected);
      }
    });
  });

  beforeEach(module('nflPlayerApp'));
  beforeEach(module('nflPlayerServices'));

  describe('PlayerListCtrl', function(){
    var scope, ctrl, $httpBackend;

    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('players/players.json').
          respond([{name: 'Tom Brady'}, {name: 'Julian Edelman'}]);

      scope = $rootScope.$new();
      ctrl = $controller('PlayerListCtrl', {$scope: scope});
    }));


    it('should create players model with 2 players fetched from xhr', function() {
      expect(scope.players).toEqualData([]);
      $httpBackend.flush();

      expect(scope.players).toEqualData(
          [{name: 'Tom Brady'}, {name: 'Julian Edelman'}]);
    });


    it('should set the default value of orderProp model', function() {
      expect(scope.orderProp).toBe('age');
    });
  });


  describe('PlayerDetailCtrl', function(){
    var scope, $httpBackend, ctrl,
        xPlayerData = function() {
          return {
            name: 'player x',
                images: ['image/url1.png', 'image/url2.png']
          }
        };


    beforeEach(inject(function(_$httpBackend_, $rootScope, $routeParams, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('players/x.json').respond(xPlayerData());

      $routeParams.playerId = 'x';
      scope = $rootScope.$new();
      ctrl = $controller('PlayerDetailCtrl', {$scope: scope});
    }));


    it('should fetch player detail', function() {
      expect(scope.player).toEqualData({});
      $httpBackend.flush();

      expect(scope.player).toEqualData(xPlayerData());
    });
  });
});
