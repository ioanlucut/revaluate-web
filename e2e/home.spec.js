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
            expect(page.mainDescription.getText()).toBe('Personal finance simplified.');
            expect(page.mainTitle.getText()).toBe('Don\'t give up on the things you love!');
        });
    });
}());
