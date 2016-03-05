export default

  angular
    .module('revaluate.goals')
    .constant('GOALS_MESSAGES_CONSTANTS', {
      SUCCESS: {
        messages: [
          'OMG, I really made it.',
          'Look at me! I\'ve totally made it!',
        ],
      },
      INFO: {
        messages: [
          'Hey! Great start so far!',
          'Looking good!',
          'Just keep doing what you\'re doing',
          'You\'ll definately hit this goal!',
        ],
      },
      WARNING: {
        messages: [
          'Seems to be a tough challenge, but you can do it!',
          'Just a little ',
        ],
      },
      DANGER: {
        messages: [
          'Only those who dare to fail greatly can ever achieve greatly.',
          'It\'s fine to celebrate success but it is more important to heed the lessons of failure.',
          'There is no failure except in no longer trying.',
          'It is hard to fail, but it is worse never to have tried to succeed.',
          'Don\'t be to hard on yourself. You\'ll do better next time',
        ],
      },
    });

