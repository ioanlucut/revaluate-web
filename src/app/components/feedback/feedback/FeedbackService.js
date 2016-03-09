function FeedbackService(FEEDBACK_URLS, $http) {

  this.sendFeedback = feedback => $http
    .post(URLTo.api(FEEDBACK_URLS.feedback), {
      subject: feedback.model.subject,
      message: feedback.model.message,
    });
}

export default FeedbackService;
