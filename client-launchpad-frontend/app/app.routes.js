(function () {
  "use strict";

  angular
    .module("clientLaunchApp")
    .config(function ($routeProvider, $locationProvider) {
      $routeProvider
        .when("/", {
          templateUrl: "app/features/home/home.html",
          controller: "HomeController",
          controllerAs: "vm",
        })
        .otherwise({ redirectTo: "/" });

      $locationProvider.html5Mode(true);
    });
})();
