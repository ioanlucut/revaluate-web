(function () {
    'use strict';

    angular
        .module('revaluate.contact')
        .factory('Contact', function (ContactService) {

            /**
             * Contact class.
             * @constructor
             */
            function Contact() {

                /**
                 * Represents the DTO model of the Contact.
                 */
                this.model = {

                    /**
                     * Name
                     */
                    name: '',

                    /**
                     * Contact email
                     */
                    email: '',

                    /**
                     * Contact message
                     */
                    message: ''
                };

                /**
                 * Sends a Contact.
                 * @returns {*}
                 */
                this.send = function () {
                    return ContactService.sendContact(this);
                };
            }

            /**
             * Builds a Contact.
             * @returns {Contact}
             */
            Contact.build = function () {
                return new Contact();
            };

            return Contact;
        });
}());
