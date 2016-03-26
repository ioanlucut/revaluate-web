/**
 * Header directive responsible for header common template.
 */
function footerDirective() {
  return {
    restrict: 'A',
    templateUrl: '/app/common/footer/footerDirective.tpl.html',
    link() {
    },
  };
}

export default footerDirective;
