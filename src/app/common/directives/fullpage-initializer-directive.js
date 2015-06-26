'use strict';

angular
    .module("revaluate.common")
    .directive("fullpageInitializer", function () {
        return {
            restrict: "A",
            controller: function () {

                this.scrollDownTo = function (slideNumber) {
                    $.fn.fullpage.moveTo(slideNumber);
                }

            },
            controllerAs: "fullpageCtrl",
            link: function (scope, el, attrs) {
                $(el).fullpage({
                    sectionsColor: ['#363b48', '#e8e8e8', '#fff', '#e8e8e8', '#fff', '#333'],
                    navigation: true,
                    navigationPosition: 'right',
                    responsiveWidth: 900
                });
            }
        };
    });
