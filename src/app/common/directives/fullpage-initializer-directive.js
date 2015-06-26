'use strict';

angular
    .module("revaluate.common")
    .directive("fullpageInitializer", function () {
        return {
            restrict: "A",
            controller: function () {

                this.scrollDown = function () {
                    $.fn.fullpage.moveSectionDown();
                };

                this.scrollDownTo = function (slideNumber) {
                    $.fn.fullpage.moveTo(slideNumber);
                }

            },
            controllerAs: "fullpageCtrl",
            link: function (scope, el, attrs) {
                $(el).fullpage({
                    sectionsColor: ['#363b48', '#fff', '#e8e8e8', '#fff', '#e8e8e8', '#333'],
                    navigation: true,
                    navigationPosition: 'right',
                    navigationTooltips: ['Main screen', 'Second page', 'Third and last page', 'F page', 'V page', 'G and last page'],
                    responsiveWidth: 900
                });
            }
        };
    });
