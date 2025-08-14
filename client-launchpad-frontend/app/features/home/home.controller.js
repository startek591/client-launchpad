(function () {
  "use strict";

  class HomeController {
    constructor() {
      var vm = this;
      vm.placeholder = " Search";
    }
  }

  angular.module("app.home").controller("HomeController", HomeController);
})();
