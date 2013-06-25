// local
var retriever = require('./retriever');

module.exports = function (app) {

  app.get(/\/.+/, function (req, res) {
    var path = req.url.split('?')[0],
        theme = req.query.s || req.query.style || "default";

    retriever.get(path, function (err, data, title) {
      if (err) {
      	console.error("Error in get (" + path + "): " + err);
        res.send(404, { error: 'file not found: ' + path });
      }

      res.render('reveal', {
        body: data,
        title: title,
        theme: theme,
      });
    });
  });

  app.get('/', function (req, res) {
  	res.redirect(301, '/yanatan16/revealme/master/example/example.html');
  })

};