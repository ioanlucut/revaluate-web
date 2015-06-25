'use strict';

angular
    .module("revaluate.common")
    .directive("fullpageInitializer", function () {
        return {
            restrict: "A",
            link: function (scope, el, attrs) {
                $(el).fullpage({
                    sectionsColor: ['#f2f2f2', '#4BBFC3', '#7BAABE', 'whitesmoke', '#ccddff', '#ccddff']
                });
            }
        };
    });
