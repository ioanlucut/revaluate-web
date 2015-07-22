'use strict';

angular
    .module("revaluate.common")
    .directive("unisonListener", function (UNISON_BREAKPOINTS, UNISON_EVENTS) {
        return {
            restrict: "E",
            link: function (scope) {

                Unison
                    .on('change', function (bp) {
                        switch ( bp.name ) {
                            case UNISON_BREAKPOINTS.USN_SMALL:
                            case UNISON_BREAKPOINTS.USN_MEDIUM:
                            case UNISON_BREAKPOINTS.USN_LARGE:
                                scope.$broadcast(UNISON_EVENTS.USN_FIRE, bp.name);
                                break;
                        }
                    });
            }
        };
    });
