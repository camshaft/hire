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
    introduction: 'welcome to ur future',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus pretium, turpis ut dapibus pretium, sapien lorem iaculis nibh, quis luctus ipsum magna quis tellus. Nam tincidunt sed nulla vel ultrices. Duis augue urna, posuere ut orci eleifend, pharetra auctor elit. Sed quis turpis eu est cursus sodales. Quisque sit amet dolor eget neque hendrerit dapibus vel at urna. Curabitur vel tincidunt leo. Duis pulvinar, purus ut auctor aliquam, nunc urna tincidunt nibh, vel rhoncus enim metus vitae massa. Mauris rutrum scelerisque tempus. Vivamus convallis viverra leo, malesuada dictum ante malesuada quis. Mauris vitae tortor et eros sagittis dapibus sit amet at metus. Nam id velit faucibus, tempor diam eu, tincidunt tortor.',
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
