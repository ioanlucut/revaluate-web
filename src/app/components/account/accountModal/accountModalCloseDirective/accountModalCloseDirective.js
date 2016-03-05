import template from './accountModalCloseDirective.tpl.html';

export default function (AccountModal) {
  'ngInject';

  return {
    restrict: 'A',
    template,
    link: function (scope, el) {
      el.on('click', function () {
        AccountModal.close();
      });
    },
  };
};
