(function () {
    'use strict';

    angular
        .module('revaluate.common')
        .constant('UNISON_BREAKPOINTS', {
            USN_X_SMALL: {
                name: 'usn-x-small',
                chartBarWidth: 25
            },
            USN_SMALL: {
                name: 'usn-small',
                chartBarWidth: 50
            },
            USN_MEDIUM: {
                name: 'usn-medium',
                chartBarWidth: 145
            },
            USN_SMALL_MEDIUM: {
                name: 'usn-small-medium',
                chartBarWidth: 165
            },
            USN_LARGE_MEDIUM: {
                name: 'usn-large-medium',
                chartBarWidth: 175
            },
            USN_LARGE: {
                name: 'usn-large',
                chartBarWidth: 185
            },
            USN_X_LARGE: {
                name: 'usn-x-large',
                chartBarWidth: 195
            }
        })
        .constant('UNISON_EVENTS', {
            USN_FIRE: 'usn-fire'
        });
}());
