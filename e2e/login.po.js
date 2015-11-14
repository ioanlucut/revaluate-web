(function () {
    'use strict';

    var LoginPage = function () {
        this.logInButton = element(by.css('.header-public__navigation .header-public__navigation__loginbtn'));
        this.userName = element(by.css('form[name="loginForm"] input[name=email]'));
        this.password = element(by.css('form[name="loginForm"] input[name=password]'));
        this.loginSubmitButton = element(by.css('.account__btn'));
        this.greeting = element(by.css(".expenses__greeting"));
        this.expensePriceInput = element(by.css(".expense__form__price__input"));
        this.addExpense = element(by.css(".expense__edit__form__savebtn"));
        this.expenseErrors = element(by.css(".form-group-input__message.has-error"));
    };

    module.exports = new LoginPage();
}());


