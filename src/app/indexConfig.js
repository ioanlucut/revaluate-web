function appConfig($locationProvider,
                   $translateProvider,
                   ChartJsProvider,
                   CacheFactoryProvider,
                   gravatarServiceProvider,
                   ngToastProvider) {
  'ngInject';

  let MAIN_FONT;

  angular
    .extend(CacheFactoryProvider.defaults, { maxAge: 15 * 60 * 1000 });

  // ---
  // Configure ng toast provider.
  // ---
  ngToastProvider.configure({
    additionalClasses: 'alert-animation',
  });

  // Enable html5 mode
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false,
  });

  // ---
  // Gravatar configs.
  // ---
  gravatarServiceProvider.defaults = {
    size: 100,
    default: 'mm',
  };

  // Use https endpoint
  gravatarServiceProvider.secure = true;

  // ---
  // Angular translation.
  // ---
  $translateProvider.preferredLanguage('en');

  // ---
  // Angular translations.
  // ---
  $translateProvider.translations('en', {
    HOME: {
      TITLE_TEXT: 'Change the way you spend your money',
      DESCRIPTION_TEXT: 'Simplify your personal finance management',
    },
    PROFILE_PICTURE: {
      OAUTH_FACEBOOK: 'Synced from Facebook',
      OAUTH_GOOGLE: 'Synced from Google',
      SIGN_UP: 'Synced from Gravatar',
    },
  });

  $translateProvider.useSanitizeValueStrategy('sanitize');

  // ---
  // Configure general chart settings.
  // ---
  MAIN_FONT = '\'proxima-nova\',\'Arial\', sans-serif';

  ChartJsProvider.setOptions({
    responsive: true,

    responsiveAnimationDuration: 2500,

    animation: {
      duration: 1000,
      easing: 'easeOutExpo',
    },

    legend: {
      display: false,
    },

    tooltips: {
      enabled: true,
      tooltipFillColor: 'rgba(0,0,0,0.8)',
      titleFontFamily: MAIN_FONT,
      titleFontSize: 16,
      titleFontStyle: 'bold',
      titleSpacing: 2,
      titleMarginBottom: 6,
      titleColor: '#fff',
      titleAlign: 'left',
      bodyFontFamily: MAIN_FONT,
      bodyFontSize: 14,
      bodyFontStyle: 'bold',
      bodySpacing: 2,
      bodyColor: '#fff',
      bodyAlign: 'left',
      footerFontFamily: MAIN_FONT,
      footerFontSize: 12,
      footerFontStyle: 'bold',
      footerSpacing: 2,
      footerMarginTop: 6,
      footerColor: '#fff',
      footerAlign: 'left',
      yPadding: 15,
      xPadding: 15,
      caretSize: 8,
      cornerRadius: 6,
      multiKeyBackground: '#fff',
    },
  });

  // ---
  // Configure BAR chart settings.
  // ---
  ChartJsProvider.setOptions('Bar', {
    colors: ['#FF0000'],
  });
}

export default appConfig;
