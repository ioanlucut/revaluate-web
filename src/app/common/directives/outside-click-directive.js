angular
    .module("common")
    .directive("outsideClick", function ($document) {
        return {
            restrict: "A",
            link: function (scope, elem, attrs) {

                $document.on("click", function (event) {
                    var isChild = elem.find(event.target).length > 0;

                    if ( !isChild ) {
                        scope.$apply(attrs.outsideClick);
                    }
                });

                elem.on('$destroy', function () {
                    $document.off("click");
                });
            }
        }
    });