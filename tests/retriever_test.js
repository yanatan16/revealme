
var retriever = require('../retriever'),
		async = require('async');

var tests = module.exports = {};

tests.testBadPaths = function (test) {
	retriever('/yanatan16/not-a-real-repository/master/README.md', function (err) {
		test.ok(err !== null);
		test.done();
	});
}

tests.testPaths = function (test) {
	async.parallel([
		async.apply(retriever, '/yanatan16/revealme/master/README.md'),
		async.apply(retriever, '/yanatan16/revealme/master/example/example.html')
	], function (err) {
		test.ifError(err);
		test.done();
	});
};

tests.testGistPaths = function (test) {
	async.parallel([
		async.apply(retriever, '/gist/yanatan16/73bcb3789252edd5384e/README.md'),
		async.apply(retriever, '/gist/yanatan16/73bcb3789252edd5384e/test.html'),
		async.apply(retriever, '/gist/yanatan16/73bcb3789252edd5384e/1bd10224d69fdc62fc8df3170f51f0591737e772/README.md'),
		async.apply(retriever, '/gist/yanatan16/73bcb3789252edd5384e/1b75f6fd69f90b93e5aee1cf96066203cb8351bf/test.html')
	], function (err) {
		test.ifError(err);
		test.done();
	});
};