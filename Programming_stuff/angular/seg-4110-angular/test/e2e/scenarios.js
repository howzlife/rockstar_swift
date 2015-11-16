'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('NFL Player App', function() {

  it('should redirect index.html to index.html#/players', function() {
    browser.get('app/index.html');
    browser.getLocationAbsUrl().then(function(url) {
        expect(url).toEqual('/players');
      });
  });


  describe('Player list view', function() {

    beforeEach(function() {
      browser.get('app/index.html#/players');
    });


    it('should filter the player list as a user types into the search box', function() {

      var playerList = element.all(by.repeater('player in players'));
      var query = element(by.model('query'));

      expect(playerList.count()).toBe(3);

      query.sendKeys('tom');
      expect(playerList.count()).toBe(1);

      query.clear();
      query.sendKeys('Patriots');
      expect(playerList.count()).toBe(3);
    });


    it('should be possible to control player order via the drop down select box', function() {

      var playerNameColumn = element.all(by.repeater('player in players').column('player.name'));
      var query = element(by.model('query'));

      function getNames() {
        return playerNameColumn.map(function(elm) {
          return elm.getText();
        });
      }

      query.sendKeys('Patriots'); //let's narrow the dataset to make the test assertions shorter

      expect(getNames()).toEqual([
        "Rob Gronkowski", 
        "Julian Edelman", 
        "Tom Brady"
      ]);

      element(by.model('orderProp')).element(by.css('option[value="name"]')).click();

      expect(getNames()).toEqual([
        "Julian Edelman", 
        "Rob Gronkowski", 
        "Tom Brady"
      ]);
    });


    it('should render player specific links', function() {
      var query = element(by.model('query'));
      query.sendKeys('Brady');
      element.all(by.css('.players li a')).first().click();
      browser.getLocationAbsUrl().then(function(url) {
        expect(url).toEqual('/players/tomBrady');
      });
    });
  });


  describe('player detail view', function() {

    beforeEach(function() {
      browser.get('app/index.html#/players/tomBrady');
    });


    it('should display Tom Bradys page', function() {
      expect(element(by.binding('player.name')).getText()).toBe('Tom Brady');
    });


    it('should display the first player image as the main player image', function() {
      expect(element(by.css('img.player.active')).getAttribute('src')).toMatch(/img\/players\/tom_brady_0.jpg/);
    });


    it('should swap main image if a thumbnail image is clicked on', function() {
      element(by.css('.player-thumbs li:nth-child(3) img')).click();
      expect(element(by.css('img.player.active')).getAttribute('src')).toMatch(/img\/players\/tom_brady_2.jpg/);

      element(by.css('.player-thumbs li:nth-child(1) img')).click();
      expect(element(by.css('img.player.active')).getAttribute('src')).toMatch(/img\/players\/tom_brady_0.jpg/);
    });
  });
});
