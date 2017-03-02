function scrollToDirective() {
  return {
    restrict: 'A',
    link(scope, el, attrs) {
      el.on('click', e => {

        $('html, body')
          .animate({ scrollTop: $(attrs.scrollTo).offset().top },
            parseInt(attrs.scrollSpeed) || 800
          );
        e.preventDefault();
      });
    },
  };
}

export default scrollToDirective;
