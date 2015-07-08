'use strict';

angular
    .module("revaluate.common")
    .service("GreeterService", function ($rootScope) {
        this.greet = function () {
            var now = moment();
            var hour = now.hour();

            if ( hour > 0 && hour <= 6 ) {
                return "Hey " + $rootScope.currentUser.model.firstName + "! Can't sleep? Perfect time to write down some expenses."
            }
            else if ( hour > 6 && hour <= 12 ) {
                return "Good morning, " + $rootScope.currentUser.model.firstName + ". You look great today!"
            }
            else if ( hour > 12 && hour <= 18 ) {
                return "Hey, " + $rootScope.currentUser.model.firstName + ". Seems to be a though day, huh ?!"
            } else {
                return "Hey, " + $rootScope.currentUser.model.firstName + ". You look tired.. go get some sleep."
            }
        }
    });
