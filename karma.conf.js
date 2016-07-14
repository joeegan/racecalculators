// // karma.conf.js
// module.exports = function(config) {
//   config.set({
//     browsers: ['PhantomJS'],
//     files: ['./test/unit/*.test.js', { pattern: './src/*.js', watched: true, included: true, served: true, nocache: false }
// ],
//     basePath: './',
//     frameworks: ['jasmine', 'es6-shim'],
//     //...
//   });
// };

module.exports = function(config) {
  config.set({
    frameworks: ['mocha'],
    browsers: ['Chrome'],
    files: [
      'https://code.jquery.com/jquery-2.1.3.min.js',
      'src/chai.js',
      // 'src/**/*.css',
      'src/partial.html',
      'src/app.js',
      'test/**/*.js',
    ],
    // preprocessors: {
    //   'src/**/*.js': ['babel', 'browserify'],
    //   'test/**/*.js': ['babel', 'browserify']
    // },
    autoWatch: true,
    'babelPreprocessor': {
      // options go here
    },
    client: {
    mocha: {
      // change Karma's debug.html to the mocha web reporter
      reporter: 'html',
      timeout: 100000,
      // require specific files after Mocha is initialized
      // require: [require.resolve('bdd-lazy-var/bdd_lazy_var_global')],

      // custom ui, defined in required file above
      // ui: 'bdd-lazy-var/global',
    }
  }
  });
};
