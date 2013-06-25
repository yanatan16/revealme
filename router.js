// local
var retriever = require('./retriever');

module.exports = function (app) {

  app.get(/.*/, function (req, res) {
    var path = req.url;

    retriever.get(path, function (err, data) {
      if (err) {
      	console.error("Error in get (" + path + "): " + err);
        res.send(404, { error: 'file not found: ' + path });
      }

      res.render('reveal', {body: data});
    });
  });

};