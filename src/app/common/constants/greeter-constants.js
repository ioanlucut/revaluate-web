(function () {
    'use strict';

    angular
        .module('revaluate.common')
        .constant('GREETER_CONSTANTS', {
            NIGHT: {
                greets: [
                    'Hey {0}! Can\'t sleep? Perfect time to write down some expenses.',
                    'Hey {0}! Really nice to see you around.',
                    'It is enough for today. Go get some sleep.'
                ]
            },
            MORNING: {
                greets: [
                    'You look great today, {0}!',
                    'Hey {0}! You look great today!',
                    'Hey {0}, you must have had a really good sleep last night, \'cause you look stunning!',
                    'We like you, {0}',
                    'Even the darkest night will end and the sun will rise.',
                    'I am feeling healthy and strong today.',
                    'I have all that I need to make this a great day of my life.',
                    'I have all the information I need to solve any challenges that come up today.',
                    'I have the knowledge to make smart decisions for myself today.',
                    'I make the right choices all day using my inner wisdom.'
                ]
            },
            DAY: {
                greets: [
                    'Hey {0}! Seems to be a tough day, huh ?!',
                    'Hey {0}! Perfect timing to track some expenses. We\'ve been thinking about you.',
                    'Hey {0}! Thanks for stopping by.',
                    'Hey {0}, I feel so nervous with you around.',
                    '{0}, you are amazing just the way you are!',
                    'Leave your worries (and your shoes) at the door.'
                ]
            },
            EVENING: {
                greets: [
                    'Hey, {0}. You look tired, go get some sleep.',
                    'You made it through this tough day, {0}.',
                    'Enough work for today! Input those expenses then go hang out with your friends.'
                ]
            }
        });
}());
