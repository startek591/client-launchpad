(function () {
  "use strict";

  class HomeController {
    constructor() {
      var vm = this;
      vm.title = "Welcome Home";
    }
  }

  angular.module("app.home").controller("HomeController", HomeController);
})();
