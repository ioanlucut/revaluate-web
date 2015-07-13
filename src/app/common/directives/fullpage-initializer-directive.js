'use strict';

angular
    .module("revaluate.common")
    .directive("fullpageInitializer", function ($rootScope, $timeout) {
        return {
            restrict: "A",
            controller: function () {

                this.scrollDownTo = function (slideNumber) {
                    $.fn.fullpage.moveTo(slideNumber);
                }

            },
            controllerAs: "fullpageCtrl",
            link: function (scope, el, attrs, ctrl) {

                var TIMEOUT = 200;
                var FULL_PAGE_SCROLL_TO_EVENT = "fullpage-scroll-to";
                var SECTION_PREFIX = "#section__";
                var SECTION_COLORS = ['#363b48', '#e8e8e8', '#fff', '#e8e8e8', '#fff', '#333'];

                // ---
                // Markers on homepage.
                // ---
                var LEFT_TEXT = ".site__container__section__feature__text";
                var RIGHT_IMG = ".site__container__section__feature__img";

                // ---
                // Animate marker class.
                // ---
                var LEFT_ANIMATE_CLASS_IN = "site__container__section__feature--left-in";
                var RIGHT_ANIMATE_CLASS_IN = "site__container__section__feature--right-in";
                var LEFT_ANIMATE_CLASS_OUT = "site__container__section__feature--left-out";
                var RIGHT_ANIMATE_CLASS_OUT = "site__container__section__feature--right-out";

                $(el).fullpage({
                    sectionsColor: SECTION_COLORS,
                    navigation: true,
                    navigationPosition: 'right',
                    responsiveWidth: 900,
                    afterLoad: function (anchorLink, index) {
                    },
                    onLeave: function (index, nextIndex, direction) {
                        // ---
                        // Current section format selector.
                        // ---
                        var realIndex = parseInt(index, 10) - 1;
                        var CURRENT_SECTION_FORMAT_SELECTOR = SECTION_PREFIX + realIndex;

                        // ---
                        // Current page (which we are leaving from) should have the transition in removed, and trigger transition out.
                        // ---
                        $(CURRENT_SECTION_FORMAT_SELECTOR).find(LEFT_TEXT).removeClass(LEFT_ANIMATE_CLASS_IN).addClass(LEFT_ANIMATE_CLASS_OUT);
                        $(CURRENT_SECTION_FORMAT_SELECTOR).find(RIGHT_IMG).removeClass(RIGHT_ANIMATE_CLASS_IN).addClass(RIGHT_ANIMATE_CLASS_OUT);

                        // ---
                        // Current section format selector.
                        // ---
                        var nextPageRealIndex = parseInt(nextIndex, 10) - 1;
                        var NEXT_SECTION_FORMAT_SELECTOR = SECTION_PREFIX + nextPageRealIndex;

                        // ---
                        // Next page (which we are going to go) should have the transition in added.
                        // ---
                        $timeout(function () {
                            $(NEXT_SECTION_FORMAT_SELECTOR).find(LEFT_TEXT).removeClass(LEFT_ANIMATE_CLASS_OUT).addClass(LEFT_ANIMATE_CLASS_IN);
                            $(NEXT_SECTION_FORMAT_SELECTOR).find(RIGHT_IMG).removeClass(RIGHT_ANIMATE_CLASS_OUT).addClass(RIGHT_ANIMATE_CLASS_IN);
                        }, TIMEOUT)
                    }
                });

                /**
                 * Listen to scroll to event
                 */
                $rootScope.$on(FULL_PAGE_SCROLL_TO_EVENT, function (event, args) {
                    if ( args.slideNumber ) {
                        ctrl.scrollDownTo(args.slideNumber);
                    }
                });
            }
        };
    });
