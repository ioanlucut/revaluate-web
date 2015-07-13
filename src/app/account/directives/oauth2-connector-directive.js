'use strict';

angular
    .module("revaluate.account")
    .directive("oauth2Connector", function (OAuth2Service) {
        return {
            restrict: "A",
            link: function (scope, el, attrs) {
                el.on("click", function () {
                    OAuth2Service.connect(attrs.oauth2Connector);
                });
            }
        };
    });
