(function () {
    'use strict';

    var LoginPage = function () {
        var utils = require('./utils');

        this.loginModal = element(by.css('.header-public__navigation .header-public__navigation__loginbtn'));
        this.userInput = element(by.model('loginData.email'));
        this.passwordInput = element(by.model('loginData.password'));
        this.loginButton = element(by.css('.account__btn'));
        this.postLoginErrorMessage = element(by.css('form[name=loginForm] .alert-message'));

        this.go = function () {
            utils.getWhileWait('/');
        };

        this.login = function (username, password) {
            this.loginModal.click();
            this.userInput.sendKeys(username);
            this.passwordInput.sendKeys(password);
            this.loginButton.click();
        };
    };

    module.exports = new LoginPage();
}());
