/* Email list */

angular
    .module("expenses")
    .directive("bnLogDomCreation", function () {

        // I bind the UI to the $scope.
        function link($scope, element, attributes) {

            console.log(
                $scope.$index
            );

        }

        // Return the directive configuration.
        return ({
            link: link
        });
    });
