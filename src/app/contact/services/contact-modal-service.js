(function () {
    'use strict';

    /* Contact modal */

    angular
        .module('revaluate.contact')
        .service('ContactModalService', function ($modal) {

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
                    templateUrl: '/app/contact/partials/contact-modal.html',
                    controller: 'ContactModalController',
                    windowClass: 'modal-contact'
                });
            };

        });
}());
