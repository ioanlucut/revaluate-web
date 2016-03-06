/* Contact modal */

function ContactModalService($modal) {

  /**
   * Contact modal instance.
   * @type {null}
   */
  this.modalInstance = null;

  /**
   * Define contact modal object.
   */
  this.open = function () {

    this.modalInstance = $modal.open({
      templateUrl: '/app/components/contact/contactModal/contactModal.html',
      controller: 'ContactModalController',
      windowClass: 'modalContact',
    });
  };

}

export default ContactModalService;
