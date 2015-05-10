angular
    .module("revaluate.common")
    .directive("searchWidget", function () {
        return {
            restrict: "A",
            link: function (scope, el) {
                new UISearch(document.getElementById('sb-search'));
            }
        };
    });
