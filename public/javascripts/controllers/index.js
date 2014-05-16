module.exports = [
  '$scope',
  '$location',
  'hyperLink',
  function(scope, location, link) {
    scope.next = function(err, res) {
      if (err) return console.error(err.stack || err);
      if (!res.answer) return location.path('/done');
      location.path(link('/questions/:question', {question: res}).href);
    };
  }
];
