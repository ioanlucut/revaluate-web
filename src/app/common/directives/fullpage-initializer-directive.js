'use strict';

angular
    .module("revaluate.common")
    .directive("fullpageInitializer", function ($rootScope) {
        return {
            restrict: "A",
            controller: function () {

                this.scrollDownTo = function (slideNumber) {
                    $.fn.fullpage.moveTo(slideNumber);
                }

            },
            controllerAs: "fullpageCtrl",
            link: function (scope, el, attrs, ctrl) {
                // ---
                // Markers on homepage.
                // ---
                var LEFT_TEXT = ".site__container__section__feature__text";
                var RIGHT_IMG = ".site__container__section__feature__img";

                // ---
                // Animate marker class.
                // ---
                var LEFT_ANIMATE_CLASS = "site__container__section__feature--left";
                var RIGHT_ANIMATE_CLASS = "site__container__section__feature--right";

                $(el).fullpage({
                    sectionsColor: ['#363b48', '#e8e8e8', '#fff', '#e8e8e8', '#fff', '#333'],
                    navigation: true,
                    navigationPosition: 'right',
                    responsiveWidth: 900,
                    afterLoad: function (anchorLink, index) {
                        // ---
                        // Current section format selector.
                        // ---
                        var realIndex = parseInt(index, 10) - 1;
                        var CURRENT_SECTION_FORMAT_SELECTOR = "#section__" + realIndex;

                        $(CURRENT_SECTION_FORMAT_SELECTOR).find(LEFT_TEXT).addClass(LEFT_ANIMATE_CLASS);
                        $(CURRENT_SECTION_FORMAT_SELECTOR).find(RIGHT_IMG).addClass(RIGHT_ANIMATE_CLASS);
                    },
                    onLeave: function (index, nextIndex, direction) {
                        $(LEFT_TEXT).removeClass(LEFT_ANIMATE_CLASS);
                        $(RIGHT_IMG).removeClass(RIGHT_ANIMATE_CLASS);
                    }
                });

                /**
                 * Listen to scroll to event
                 */
                $rootScope.$on("fullpage-scroll-to", function (event, args) {
                    if ( args.slideNumber ) {
                        ctrl.scrollDownTo(args.slideNumber);
                    }
                });
            }
        };
    });
