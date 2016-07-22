module.exports = (config) => {
  config.set({
    frameworks: ['mocha'],
    browsers: ['Chrome'],
    files: [
      'https://code.jquery.com/jquery-2.1.3.min.js',
      'src/chai.js',
      'lib/bundle.js',
      'src/partial.html',
      'test/**/*.js',
    ],
    autoWatch: true,
    client: {
      mocha: {
        reporter: 'html',
        timeout: 100000,
      },
    },
  });
};
