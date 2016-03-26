function ngEnterDirective() {
  return (scope, element, attrs) => {
    element.bind('keydown keypress', event => {
      if (event.which === 13) {
        scope.$apply(() => {
          scope.$eval(attrs.ngEnter, { event });
        });

        event.preventDefault();
      }
    });
  };
}

export default ngEnterDirective;
