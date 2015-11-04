/**
 * This file uses the Page Object pattern to define the main page for tests
 * https://docs.google.com/presentation/d/1B6manhG0zEXkC-H-tPo2vwU06JhL8w9-XCF9oehXzAQ
 */

'use strict';

var LoginPage;
LoginPage = function () {
    this.firstLoginButton = element(by.css(Button['header-public__navigation__loginbtn']));
    this.userName = element(by.input('form-group-input__input ng-pristine ng-invalid ng-invalid-required ng-valid-email ng-touched'));
    this.password = element(by.input('form-group-input__input.ng-pristine.ng-invalid.ng-invalid-required.ng-touched'));
    this.greeting = element(by.binding("Welcome!"));
    this.loginButton = element(by.css(Button['button.account__btn.ng-binding']));
};

module.exports = new (LoginPage);

