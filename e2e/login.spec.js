(function () {
    'use strict';

    describe('The login view', function () {
        var page,
            EC = protractor.ExpectedConditions,
            utils = require('./utils');

        beforeEach(function () {
            utils.getWhileWait('/');

            page = require('./login.po');
        });

        it('it should fill the required field and login', function () {
            page.logInButton.click();
            page.userName.sendKeys('deve2e@revaluate.io');
            page.password.sendKeys('deve2e@revaluate.io');

            page
                .loginSubmitButton
                .click();

            utils.waitForDeferredAngular();
            browser.wait(EC.presenceOf(page.greeting), 5000);
            browser.wait(EC.presenceOf(page.addExpense), 5000);
            page.expensePriceInput.sendKeys('125.22');
            page
                .addExpense
                .click();
            expect(page.expenseErrors.isPresent()).toBeTruthy();
        });
    });
}());
