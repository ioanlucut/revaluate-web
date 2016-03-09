function accountModalCloseDirective(AccountModal) {
  'ngInject';

  return {
    restrict: 'A',
    templateUrl: '/app/components/account/accountModal/accountModalCloseDirective/accountModalCloseDirective.tpl.html',
    link(scope, el) {
      el.on('click', () => {
        AccountModal.close();
      });
    },
  };
};

export default accountModalCloseDirective;
