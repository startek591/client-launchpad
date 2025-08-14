// karma.conf.js
module.exports = function (config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine"],
    files: [
      // --- Angular + libs (order matters)
      "node_modules/angular/angular.js",
      "node_modules/angular-route/angular-route.js",
      "node_modules/angular-mocks/angular-mocks.js",

      // --- your app code
      "client-launchpad-frontend/app/features/home/home.module.js",
      "client-launchpad-frontend/app/features/home/home.controller.js",
      // --- templates (HTML)
      {
        pattern: "client-launchpad-frontend/app/features/home/home.html",
        included: true,
        served: true,
      },

      // Specs (put after app code)
      "client-launchpad-frontend/app/features/home/home.spec.js",
    ],
    preprocessors: {
      // coverage on your JS
      "app/**/!(*.spec).js": ["coverage"],
      // make HTML templates injectable via $templateCache
      "app/**/*.html": ["ng-html2js"],
    },
    ngHtml2JsPreprocessor: {
      // the templates module name you’ll load in tests
      moduleName: "app.templates",
      stripPrefix: "app/",
    },
    reporters: ["progress", "coverage"],
    coverageReporter: {
      dir: "coverage",
      reporters: [{ type: "html", subdir: "html" }, { type: "text-summary" }],
      check: {
        global: { statements: 60, branches: 40, functions: 60, lines: 60 },
      },
    },
    browsers: ["ChromeHeadless"],
    singleRun: true, // set false to watch
    autoWatch: false,
    client: { jasmine: { random: false } },
  });
};
