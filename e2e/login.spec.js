(function () {
    'use strict';

    describe('The login view', function () {
        var page,
            utils = require('./utils'),
            EC = require('protractor').ExpectedConditions;

        beforeEach(function () {
            page = require('./login.po');
            page.go();
        });

        afterEach(function () {
            browser.executeScript('window.sessionStorage.clear();');
            browser.executeScript('window.localStorage.clear();');
        });

        it('it should fill the required field and login', function () {
            page
                .login('deve2e@revaluate.io', 'deve2e@revaluate.io');
        });

        it('it should fill the required field and login, but fail due to invalid credentials', function () {
            page.login('deve2e@revaluate.io', 'wrongPassword');
            expect(page.postLoginErrorMessage.getText()).toBe('Your email or password are wrong. Please try again.');
        });
    });
}());
