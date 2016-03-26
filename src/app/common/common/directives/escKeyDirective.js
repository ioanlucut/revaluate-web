function escKeyDirective() {
  return (scope, element, attrs) => {
    element.bind('keydown keypress', event => {
      if (event.which === 27) { // 27 = esc key
        scope.$apply(() => {
          scope.$eval(attrs.escKey);
        });

        event.preventDefault();
      }
    });
  };
}

export default escKeyDirective;
