(function () {
    'use strict';

    describe('The home page', function () {
        var page,
            utils = require('./utils');

        beforeEach(function () {
            utils.getWhileWait('/');

            page = require('./home.po');
        });

        it('should contain proper description', function () {
            expect(page.mainDescription.getText()).toBe('Simplify your personal finance management');
            expect(page.mainTitle.getText()).toBe('Change the way you spend your money');
        });

        xit('should open the account modal', function () {
            page.logInButton.click();
            expect(page.accountGreeting.getText()).toContain('Welcome!');
        });

        xit('should open the account modal', function () {
            page.signUpButton.click();
            expect(page.accountGreeting.getText()).toContain('Let\'s get you started!');
        });
    });
}());
