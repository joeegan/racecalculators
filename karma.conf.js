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
    frameworks: ['jasmine'],
    browsers: ['PhantomJS'],
    files: [
      'https://code.jquery.com/jquery-2.1.3.min.js',
      'src/**/*.js',
      'test/**/*.js'
    ],
    preprocessors: {
      'src/**/*.js': ['babel'],
      'test/**/*.js': ['babel']
    },
    'babelPreprocessor': {
      // options go here
    }
  });
};
