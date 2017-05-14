(function(){
  'use strict';

  angular.module('App').config(routes);

  routes.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider', '$qProvider'];
  function routes($stateProvider, $urlRouterProvider, $locationProvider, $qProvider) {
    $stateProvider
      .state('home', home);

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/');
    $qProvider.errorOnUnhandledRejections(false);
    $locationProvider.html5Mode(true)

    $urlRouterProvider.rule(function($injector, $location) {
      var path = $location.path();
      var hasTrailingSlash = path[path.length-1] === '/';
      if(hasTrailingSlash) {
        var newPath = path.substr(0, path.length - 1); 
        return newPath; 
      } 
    });
  }




  /*
   * State Controllers
   * */
  var home = {
    url: '/',
    templateUrl: 'app/pages/home/home.html',
    controller: 'HomeCtrl',
    controllerAs: 'ctrl',
    pageTrack: '/home'
  };
  /*
   * End State Controllers
   * */
})();
