(function () {
    'use strict';

    describe('The login view', function () {
        var page,
            utils = require('./utils');

        beforeEach(function () {
            page = require('./login.po');
            page.go();
        });

        afterEach(function () {
            browser.executeScript('window.sessionStorage.clear();');
            browser.executeScript('window.localStorage.clear();');
        });

        it('it should fill the required field and login, and be redirected to /expenses', function () {
            page.login('deve2e@revaluate.io', 'deve2e@revaluate.io');

            utils.waitForDeferredAngular();
            expect(browser.getCurrentUrl()).toContain('expenses');
        });

        it('it should fill the required field and login, but fail due to invalid credentials', function () {
            page.login('deve2e@revaluate.io', 'wrongPassword');

            utils.waitForDeferredAngular();
            utils.waitToShow(page.postLoginErrorMessage);
            expect(browser.getCurrentUrl()).not.toContain('expenses');
            expect(page.postLoginErrorMessage.getText()).toBe('Your email or password are wrong. Please try again.');
        });
    });
}());
