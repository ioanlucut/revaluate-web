/**
 * Header directive responsible for header common template.
 */
function footerHomeDirective() {
  return {
    restrict: 'A',
    templateUrl: '/app/common/footer/footerHomeDirective.tpl.html',
    link: function () {
    },
  };
}

export default footerHomeDirective;
