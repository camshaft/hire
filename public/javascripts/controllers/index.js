module.exports = [
  '$scope',
  '$location',
  'hyperLink',
  function(scope, location, link) {
    scope.start = function(err, res) {
      if (err) return console.error(err.stack || err);
      location.path(link('/questions/:question', {question: res}).href);
    };
  }
];
