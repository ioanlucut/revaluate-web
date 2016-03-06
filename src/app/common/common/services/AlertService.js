// or just use "success", "info", "warning" or "danger" shortcut methods:
function AlertService(ngToast) {

  this.addMessage = function (message) {
    return ngToast.create(message);
  };

  this.addMessageWithSettings = function (className, content) {
    return ngToast.create({
      className: className,
      content: content,
    });
  };

  this.addSuccess = function (content) {
    return ngToast.success({
      content: content,
    });
  };

  this.addInfo = function (content) {
    return ngToast.info({
      content: content,
    });
  };

  this.addWarning = function (content) {
    return ngToast.warning({
      content: content,
    });
  };

  this.addDanger = function (content) {
    return ngToast.danger({
      content: content,
    });
  };

  this.dismissMessage = function (toast) {
    ngToast.dismiss(toast);
  };

  this.dismissAll = function () {
    ngToast.dismiss();
  };

}

export default AlertService;
