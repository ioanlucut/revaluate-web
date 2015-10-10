(function () {
    'use strict';

    angular
        .module('revaluate.goals')
        .constant('GOALS_MESSAGES_CONSTANTS', {
            SUCCESS: {
                messages: [
                    'OMG, I really made it.',
                    'Look at me! Who\'s your daddy, now ?'
                ]
            },
            INFO: {
                messages: [
                    'Few more steps, {0}!',
                    'Hey {0}! Great start so far!'
                ]
            },
            WARNING: {
                messages: [
                    'Hey {0}! Seems to be a tough challenge, huh ?!'
                ]
            },
            DANGER: {
                messages: [
                    'Only those who dare to fail greatly can ever achieve greatly.',
                    'It\'s fine to celebrate success but it is more important to heed the lessons of failure.',
                    'There is no failure except in no longer trying.',
                    'It is hard to fail, but it is worse never to have tried to succeed.'
                ]
            }
        });
}());
