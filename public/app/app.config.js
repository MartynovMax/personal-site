(function(){
  'use strict';

  angular.module('App').config(config);

  config.$inject = ['$httpProvider', '$translateProvider', 'defaultLanguage', 'AnalyticsProvider', 'CREDENTIALS'];
  function config($httpProvider, $translateProvider, defaultLanguage, AnalyticsProvider, CREDENTIALS) {
    // firebase.initializeApp(FirebaseDetails);

    AnalyticsProvider.setAccount(CREDENTIALS.GOOGLE_ANALYTICS_ID);
    AnalyticsProvider.trackPages(true);
    AnalyticsProvider.setPageEvent('$stateChangeSuccess');

    $translateProvider
      .useStaticFilesLoader({
        prefix: 'app/i18n/',
        suffix: '.json',
      });
    $translateProvider.preferredLanguage(defaultLanguage);
    $translateProvider.useSanitizeValueStrategy('escape');
  }
})();
