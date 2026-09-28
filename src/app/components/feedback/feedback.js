import FeedbackController from './feedback/FeedbackController';
import FeedbackService from './feedback/FeedbackService';
import feedbackConstants from './feedback/feedbackConstants';
import feedbackDirective from './feedback/feedbackDirective';
import feedbackMessage from './feedback/feedbackMessage';
import FeedbackModalService from './feedbackModal/FeedbackModalService';

export default angular
  .module('revaluate.feedback', [])
  .controller('FeedbackModalController', FeedbackController)
  .service('FeedbackService', FeedbackService)
  .constant('FEEDBACK_URLS', feedbackConstants)
  .directive('feedback', feedbackDirective)
  .factory('Feedback', feedbackMessage)
  .service('FeedbackModalService', FeedbackModalService);
