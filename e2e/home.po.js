(function () {
    'use strict';

    var HomePage = function () {
        this.mainTitle = element(by.css('.home__title'));
        this.mainDescription = element(by.css('.home__description'));
        this.signUpButton = element(by.css('.home__section__start__btn'));
    };

    module.exports = new HomePage();
}());
