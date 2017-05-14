
if (typeof angular === 'undefined') {
  document.write(
    unescape('<script src="lib/angular/angular.min.js" type="text/javascript"></script>')
  );
}


try {
  angular.module('ui.router');  
} catch (e) {
  document.write(
    unescape('<script src="lib/angular-ui-router/release/angular-ui-router.min.js" type="text/javascript"></script>')
  );
}


try {
  angular.module('pascalprecht.translate');  
} catch (e) {
  document.write(
    unescape('<script src="lib/angular-translate/angular-translate.min.js" type="text/javascript"></script>')
  );
  document.write(
    unescape('<script src="lib/angular-translate-loader-static-files/angular-translate-loader-static-files.min.js" type="text/javascript"></script>')
  );
}


try {
  angular.module('angular-google-analytics');  
} catch (e) {
  document.write(
    unescape('<script src="lib/angular-google-analytics/dist/angular-google-analytics.min.js" type="text/javascript"></script>')
  );
}
