(function () {
    'use strict';

    var HomePage = function () {
        this.mainTitle = element(by.css('.home__title'));
        this.mainDescription = element(by.css('.home__description'));
        this.logInButton = element(by.css('.header-public__navigation .header-public__navigation__loginbtn'));
        this.signUpButton = element(by.css('.home__section__start__btn'));
        this.accountGreeting = element(by.css('.account__title'));
    };

    module.exports = new HomePage();
}());
