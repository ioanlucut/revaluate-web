'use strict';
//var util = require ('util');
describe('The main view', function () {
  var LoginPage;

  beforeEach(function () {
    browser.get('http://localhost:3000');
    LoginPage = require('./main.po');
  });

  it('should click login button', function() {
      LoginPage.firstLoginButton.click();
      expect(LoginPage.greeting.getText()).toContain('Welcome!');
  });

    it('it should fill the required field and login', function() {
        LoginPage.userName.sendKeys('felix.turle92@gmail.com');
        LoginPage.password.sendKeys('Test123.');
        expect(LoginPage.greeting.getText()).toContain('Welcome!');
    });


});
