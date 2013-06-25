// builtin
var https = require('https');

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
			callback(null, buf, extractTitle(buf));
		});

	}).on('error', callback).end();
}

function extractTitle(data) {
	var match = data.match(/title: (.*)/m);
	return match && match[1];
}