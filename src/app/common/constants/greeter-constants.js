'use strict';

angular
    .module("revaluate.common")
    .constant("GREETER_CONSTANTS", {
        NIGHT: {
            greets: [
                "Hey {0}! Can't sleep? Perfect time to write down some expenses.",
                "Hey {0}! Really nice to see you around.",
                "It is enough for today. Go get some sleep."
            ]
        },
        MORNING: {
            greets: [
                "You look great today, {0}!",
                "Hey {0}! You look great today!",
                "Hey {0}, you must have had a really good sleep last night, 'cause you look stunning!",
                "We like you."
            ]
        },
        DAY: {
            greets: [
                "Hey {0}! Seems to be a though day, huh ?!",
                "Hey {0}! Perfect timing to track some expenses. We've been thinking about you.",
                "Hey {0}! Thanks for stopping by."
            ]
        },
        EVENING: {
            greets: [
                "Hey, {0}. You look tired.. go get some sleep.",
                "{0}, isn't too hot in there? We are burning here."
            ]
        }
    });
