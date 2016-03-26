function feedbackMessage(FeedbackService) {
  'ngInject';

  /**
   * Feedback class.
   * @constructor
   */
  function Feedback() {

    /**
     * Represents the DTO model of the Feedback.
     */
    this.model = {

      /**
       * Feedback subject
       */
      subject: '',

      /**
       * Feedback message
       */
      message: '',
    };

    /**
     * Sends a Feedback.
     * @returns {*}
     */
    this.send = function () {
      return FeedbackService.sendFeedback(this);
    };
  }

  /**
   * Builds a Feedback.
   * @returns {Feedback}
   */
  Feedback.build = () => new Feedback();

  return Feedback;
}

export default feedbackMessage;
