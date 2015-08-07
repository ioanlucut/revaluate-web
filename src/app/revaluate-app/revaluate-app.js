(function () {
    'use strict';

    /**
     * Main app module declaration.
     */
    angular
        .module('revaluate', [
            'config',
            'braintree-angular',
            'angular-cache',
            'angularFileUpload',
            'angular-loading-bar',
            'ngAnimate',
            'ngMessages',
            'ngStorage',
            'ngSanitize',
            'revaluate.site',
            'revaluate.feedback',
            'revaluate.contact',
            'revaluate.common',
            'revaluate.categories',
            'revaluate.expensesImport',
            'revaluate.expenses',
            'revaluate.statistics',
            'revaluate.account',
            'revaluate.settings',
            'revaluate.insights',
            'ngIntercom',
            'revaluate.intercom',
            'ui.gravatar',
            'angularPayments',
            'pascalprecht.translate',
            'ngToast',
            'ui.select',
            'infinite-scroll',
            'snap'
        ])
        .config(function ($locationProvider, $translateProvider, ChartJsProvider, CacheFactoryProvider, gravatarServiceProvider, ngToastProvider) {
            var MAIN_FONT,
                MAIN_FONT_SIZE;

            angular
                .extend(CacheFactoryProvider.defaults, { maxAge: 15 * 60 * 1000 });

            // ---
            // Configure ng toast provider.
            // ---
            ngToastProvider.configure({
                additionalClasses: 'alert-animation'
            });

            // Enable html5 mode
            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            });

            // ---
            // Gravatar configs.
            // ---
            gravatarServiceProvider.defaults = {
                size: 100,
                'default': 'mm'
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
            $translateProvider.translations('en', ({
                'HOME': {
                    'TITLE_TEXT': 'Personal finance simplified',
                    'DESCRIPTION_TEXT': 'Start spending your money better!'
                },
                'PROFILE_PICTURE': {
                    'OAUTH_FACEBOOK': 'Synced from Facebook',
                    'OAUTH_GOOGLE': 'Synced from Google',
                    'SIGN_UP': 'Synced from Gravatar'
                }
            }));

            $translateProvider.useSanitizeValueStrategy('sanitize');

            // ---
            // Configure general chart settings.
            // ---
            MAIN_FONT = '\'Montserrat\',\'Arial\', sans-serif';
            MAIN_FONT_SIZE = 12;
            ChartJsProvider.setOptions({
                // Boolean - Whether to animate the chart
                animation: true,

                // Number - Number of animation steps
                animationSteps: 60,

                // String - Animation easing effect
                // Possible effects are:
                // [easeInOutQuart, linear, easeOutBounce, easeInBack, easeInOutQuad,
                //  easeOutQuart, easeOutQuad, easeInOutBounce, easeOutSine, easeInOutCubic,
                //  easeInExpo, easeInOutBack, easeInCirc, easeInOutElastic, easeOutBack,
                //  easeInQuad, easeInOutExpo, easeInQuart, easeOutQuint, easeInOutCirc,
                //  easeInSine, easeOutExpo, easeOutCirc, easeOutCubic, easeInQuint,
                //  easeInElastic, easeInOutSine, easeInOutQuint, easeInBounce,
                //  easeOutElastic, easeInCubic]
                animationEasing: 'easeOutQuart',

                // Boolean - If we should show the scale at all
                showScale: true,

                // Boolean - If we want to override with a hard coded scale
                scaleOverride: false,

                // ** Required if scaleOverride is true **
                // Number - The number of steps in a hard coded scale
                scaleSteps: null,

                // Number - The value jump in the hard coded scale
                scaleStepWidth: null,

                // Number - The scale starting value
                scaleStartValue: null,

                // String - Colour of the scale line
                scaleLineColor: 'rgba(0,0,0,.1)',

                // Number - Pixel width of the scale line
                scaleLineWidth: 1,

                // Boolean - Whether to show labels on the scale
                scaleShowLabels: true,

                // Interpolated JS string - can access value
                scaleLabel: '<%=value%>',

                // Boolean - Whether the scale should stick to integers, not floats even if drawing space is there
                scaleIntegersOnly: true,

                // Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
                scaleBeginAtZero: false,

                // String - Scale label font declaration for the scale label
                scaleFontFamily: MAIN_FONT,

                // Number - Scale label font size in pixels
                scaleFontSize: MAIN_FONT_SIZE,

                // String - Scale label font weight style
                scaleFontStyle: 'normal',

                // String - Scale label font colour
                scaleFontColor: '#666',

                // Boolean - Determines whether to draw tooltips on the canvas or not
                showTooltips: true,

                // Function - Determines whether to execute the customTooltips function instead of drawing the built in tooltips (See [Advanced - External Tooltips](#advanced-usage-custom-tooltips))
                customTooltips: false,

                // Array - Array of string names to attach tooltip events
                tooltipEvents: ['mousemove', 'touchstart', 'touchmove'],

                // String - Tooltip background colour
                tooltipFillColor: 'rgba(0,0,0,0.8)',

                // String - Tooltip label font declaration for the scale label
                tooltipFontFamily: MAIN_FONT,

                // Number - Tooltip label font size in pixels
                tooltipFontSize: 14,

                // String - Tooltip font weight style
                tooltipFontStyle: 'normal',

                // String - Tooltip label font colour
                tooltipFontColor: '#fff',

                // String - Tooltip title font declaration for the scale label
                tooltipTitleFontFamily: MAIN_FONT,

                // Number - Tooltip title font size in pixels
                tooltipTitleFontSize: 14,

                // String - Tooltip title font weight style
                tooltipTitleFontStyle: 'bold',

                // String - Tooltip title font colour
                tooltipTitleFontColor: '#fff',

                // Number - pixel width of padding around tooltip text
                tooltipYPadding: 20,

                // Number - pixel width of padding around tooltip text
                tooltipXPadding: 40,

                // Number - Size of the caret on the tooltip
                tooltipCaretSize: 8,

                // Number - Pixel radius of the tooltip border
                tooltipCornerRadius: 6,

                // Number - Pixel offset from point x to tooltip edge
                tooltipXOffset: 10,

                // String - Template string for single tooltips
                tooltipTemplate: '<%if (label){%><%=label%>: <%}%><%= value %>',

                // String - Template string for multiple tooltips
                multiTooltipTemplate: '<%= value %>'
            });

            // ---
            // Configure BAR chart settings.
            // ---
            ChartJsProvider.setOptions('Bar', {
                colours: ['#FF0000'],

                //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
                scaleBeginAtZero: true,

                //Boolean - Whether grid lines are shown across the chart
                scaleShowGridLines: true,

                //String - Colour of the grid lines
                scaleGridLineColor: '#e8e8e8',

                //Number - Width of the grid lines
                scaleGridLineWidth: 0.5,

                //Boolean - Whether to show horizontal lines (except X axis)
                scaleShowHorizontalLines: true,

                //Boolean - Whether to show vertical lines (except Y axis)
                scaleShowVerticalLines: false,

                //Boolean - If there is a stroke on each bar
                barShowStroke: true,

                //Number - Pixel width of the bar stroke
                barStrokeWidth: 1,

                //Number - Spacing between each of the X value sets
                barValueSpacing: 5,

                //Number - Spacing between data sets within X values
                barDatasetSpacing: 5
            });
        })
        .run(function (ENV) {

            URLTo.apiBase(ENV.apiEndpoint);
        });
}());
