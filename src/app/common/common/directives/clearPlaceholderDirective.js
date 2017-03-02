function clearPlaceholder() {
  return {
    restrict: 'A',
    link(scope, el, attrs) {
      const PLACEHOLDER = 'placeholder';

      const FOCUS = 'focus';
      el.on(FOCUS, () => {
        el.attr(PLACEHOLDER, '');
      });

      const BLUR = 'blur';
      el.on(BLUR, () => {
        el.attr(PLACEHOLDER, attrs.clearPlaceholder);
      });
    },
  };
}

export default clearPlaceholder;
