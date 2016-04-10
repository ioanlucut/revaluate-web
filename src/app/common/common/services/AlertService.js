// or just use "success", "info", "warning" or "danger" shortcut methods:
function AlertService(ngToast) {
  'ngInject';

  this.addSuccess = content => ngToast.success({
    content,
  });

  this.addInfo = content => ngToast.info({
    content,
  });

  this.addWarning = content => ngToast.warning({
    content,
  });

  this.addDanger = content => ngToast.danger({
    content,
  });

  this.dismissMessage = toast => {
    ngToast.dismiss(toast);
  };

  this.dismissAll = () => {
    ngToast.dismiss();
  };
}

export default AlertService;
