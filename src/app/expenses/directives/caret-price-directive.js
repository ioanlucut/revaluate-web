angular
    .module("expenses")
    .directive('caretPricePosition', function ($timeout) {
        return {
            link: function (scope, elem, attrs) {

                elem.on("focus, click", function () {
                    var el = this;

                    $timeout(function () {
                        var strLength = el.value.length;
                        if ( el.setSelectionRange !== undefined ) {
                            el.setSelectionRange(strLength, strLength);
                        } else {
                            $(el).val(el.value);
                        }
                    });
                })
            }
        };
    });