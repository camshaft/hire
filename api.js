/**
 * Module dependencies
 */

var express = require('express');

var app = module.exports = express();

app.use(function(req, res, next) {
  req.base += '/api';
  var url = req.base + (req.url === '/' ? '' : req.url);
  req.root = req.get('x-root') || req.base;
  res.locals({
    url: url,
    root: req.root
  });
  var _json = res.json;
  res.json = function(data) {
    var root = res.locals.root;
    data.root = {href: root};
    data.href = data.href || url;
    _json.call(res, data);
  };
  next();
});

app.get('/', function(req, res) {
  res.json({
    introduction: 'Welcome to your future, pal.',
    description: 'Use the innernette. Unlimited time.',
    start: {
      action: req.base,
      method: 'POST',
      input: {}
    }
  });
});

app.post('/', function(req, res) {
  res.redirect(req.base + '/questions/1');
});

app.get('/questions/:id', function(req, res) {
  res.json({
    title: 'Do a dance',
    answer: {
      type: 'code',
      action: req.url,
      method: 'POST',
      input: {
        answer: {
          type: 'textarea',
          required: true
        }
      }
    },
    next: {
      href: req.base + '/questions/2'
    },
    prev: {
      href: req.base + '/questions/0'
    }
  });
});
