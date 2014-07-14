// builtin
var https = require('https');

// vendor
var _ = require('underscore');

// local
var converter = require('./converter');

var options = {
			title: /^title: (.*)/m,
			theme: /^theme: (.*)/m,
			transition: /^transition: (.*)/m,
			horizontalOnly: /^horizOnly:(.*)/m
		},
		defaults = {
			title: "RevealMe Presentations",
			theme: "default",
			transition: "default",
			horizontalOnly: false
		},
		isgist = /\/gist\/([a-zA-Z0-9]+)\/([a-f0-9]+)\/?([a-f0-9]+)?\/?(.+\.(html|md))?/;

module.exports = retrieve;

function retrieve(path, callback) {
	var m;
	if (m = path.match(isgist)) {
		var url = 'https://gist.github.com/'
			+ m[1]
			+ '/' + m[2]
			+ '/raw'
			+ (m[3] ? '/'+m[3] : '')
			+ '/' + (m[4] ? m[4] : 'README.md');

		getFile(url, callback)
	} else {
		getFile('https://raw.githubusercontent.com' + path, callback);
	}
}

function getFile(url, callback) {
	console.log('Retrieving ' + url);
	https.get(url, function (res) {
		if (res.statusCode != 200) {
			callback(new Error("non-200 status code: " + res.statusCode));
			return;
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
