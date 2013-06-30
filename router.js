// builtin
var path = require('path');

// vendor
var _ = require('underscore'),
    mime = require('mime');

// local
var retriever = require('./retriever'),
    converter = require('./converter');

module.exports = function (app) {

  app.get(/\/.+/, function (req, res) {
    var url = adjustPath(req.url.split('?')[0]),
        theme = req.query.theme || req.query.style,
        transition = req.query.transition,
        horizontalOnly = req.query.horiz;

    retriever.get(url, function (err, data, opts) {
      if (err) {
      	console.error("Error in get (" + url + "): " + err);
        res.send(404, { error: 'file not found: ' + url });
      }

      switch (mime.lookup(url)) {
        case 'text/x-markdown':
          data = converter(data, horizontalOnly || opts.horizontalOnly || false);
          break;
      }

      _.extend(opts, {
        body: data
      });

      if (theme) {
        opts.theme = theme;
      }
      if (transition) {
        opts.transition = transition;
      }

      res.render('reveal', opts);
    });
  });

  app.get('/', function (req, res) {
  	res.redirect(301, '/yanatan16/revealme');
  })

};

// If path ends in an extension, don't touch it
// If path has two folders, add /master/README.md
function adjustPath(url) {
  if (path.extname(url).length > 0) {
    return url;
  }

  var foldlen = url.slice(1).split('/').length

  if (foldlen === 2) {
    return url + '/master/README.md';
  } else if (foldlen === 3) {
    return url + '/README.md';
  }

  return url;
}