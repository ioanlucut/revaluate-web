function colorPickerDirective($animate) {
  'ngInject';

  return {
    restrict: 'A',
    replace: true,
    scope: {
      categoryColor: '=',
      colors: '=',
    },
    templateUrl: '/app/components/categories/colorPicker/colorPickerDirective.tpl.html',
    link(scope, elm) {

      // By default the popover is closed
      scope.isOpen = false;

      // Close the popover
      scope.close = () => {
        scope.isOpen = false;
      };

      // ---
      // Label element clicks toggles the picker.
      // ---
      const label = elm.prev().prev().prev('label');

      label.on('click', () => {
        scope.$apply(() => {
          scope.isOpen = !scope.isOpen;
        });
      });

      const CLASS_OPEN = 'color-picker-box--open';

      // Open or close the modal
      scope.$watch('isOpen', (isOpen, isOpenOld) => {
        if (isOpen === true) {
          $animate.addClass(elm, CLASS_OPEN);
        } else if (isOpen === false && isOpenOld === true) {
          $animate.removeClass(elm, CLASS_OPEN);
        }
      });

      // ---
      // Select the color.
      // ---
      scope.select = chosenColor => {
        scope.categoryColor = angular.copy(chosenColor);

        scope.close();
      };
    },
  };
}

export default colorPickerDirective;
