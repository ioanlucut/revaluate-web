function animateDirective() {
  return {
    restrict: 'A',
    link(scope, el, attrs) {

      // Apply the animate class when the given event occurs
      scope.$on(attrs.animateOn, () => {
        el.addClass(attrs.animateClass);
      });

      // Remove the animate class on animation end
      el.on(
        'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
        () => {
          el.removeClass(attrs.animateClass);
        }
      );
    },
  };
}

export default animateDirective;
