'use strict';

describe('service', function() {

  // load modules
  beforeEach(module('nflPlayerApp'));

  // Test service availability
  it('check the existence of Player factory', inject(function(Player) {
      expect(Player).toBeDefined();
    }));
});