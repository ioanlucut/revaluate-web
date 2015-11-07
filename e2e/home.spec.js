(function () {
    'use strict';

    describe('The home page', function () {
        var page;

        beforeEach(function () {
            browser
                .get('/');

            page = require('./home.po');
        });

        it('should contain proper description', function () {
            expect(page.mainDescription.getText()).toBe('Simplify your personal finance management');
            expect(page.mainTitle.getText()).toBe('Change the way you spend your money');
        });
    });
}());
