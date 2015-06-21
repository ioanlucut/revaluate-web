'use strict';

angular
    .module("revaluate.common")
    .directive("mixpanelInitializer", function ($window, ENV) {
        return {
            restrict: "A",
            compile: function compile() {
                return {
                    pre: function preLink() {
                        var mixpanel = $window.mixpanel || {};
                        if ( ENV.isProduction ) {
                            mixpanel.init(ENV.mixPanelId);
                        }
                        else {
                            $window.mixpanel = {};
                            $window.mixpanel.track = function () {
                            };
                        }
                    }
                };
            }
        }
    });
