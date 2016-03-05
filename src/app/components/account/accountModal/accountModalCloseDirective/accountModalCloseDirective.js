export default function (AccountModal) {
  'ngInject';

  return {
    restrict: 'A',
    templateUrl: './accountModalCloseDirective.tpl.html',
    link: function (scope, el) {
      el.on('click', function () {
        AccountModal.close();
      });
    },
  };
};
