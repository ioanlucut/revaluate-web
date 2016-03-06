export default function accountModalCloseDirective(AccountModal) {
  'ngInject';

  return {
    restrict: 'A',
    templateUrl: '/app/components/account/accountModal/accountModalCloseDirective/accountModalCloseDirective.tpl.html',
    link: function (scope, el) {
      el.on('click', function () {
        AccountModal.close();
      });
    },
  };
};

export default accountModalCloseDirective;
