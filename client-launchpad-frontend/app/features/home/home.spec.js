describe("HomeController", function () {
  beforeEach(module("app.home"));

  var $controller;
  beforeEach(inject(function (_$controller_) {
    $controller = _$controller_;
  }));

  it("sets a default title", function () {
    var vm = $controller("HomeController", {}, {});
    expect(vm.placeholder).toBeDefined();
    expect(vm.placeholder).toContain("Search");
  });
});
