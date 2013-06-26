// builtin
var https = require('https');

// vendor
var _ = require('underscore');

// local
var converter = require('./converter');

var options = {
	title: /title: (.*)/m,
	theme: /theme: (.*)/m,
	transition: /transition: (.*)/m
},
		defaults = {
	title: "RevealMe Presentations",
	theme: "default",
	transition: "default"
}

module.exports = {
	get: getFile
};

function getFile(path, callback) {
	var url = 'https://raw.github.com' + path;

	https.get(url, function (res) {
		if (res.statusCode != 200) {
			callback(new Error("non-200 status code: " + res.statusCode));
		}

		var buf = "";

		res.on('data', function (data) {
			buf += data;
		});

		res.on('error', callback);

		res.on('end', function () {
			callback(null, buf, extractOptions(buf));
		});

	}).on('error', callback).end();
}

function extractOptions(data) {
	var opts = _.object(_.keys(defaults), _.values(defaults));
	_.each(_.pairs(options), function (pair) {
		var key = pair[0],
				rgx = pair[1],
				match = data.match(rgx);

		if (match) {
			opts[key] = match[1];
		}
	});
	return opts;
}
