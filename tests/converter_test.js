var tests = module.exports = {};

var converter = require('../converter');

tests.markdownWrap = function (test) {
	var text = '<!--\ntitle: something\n-->\n\n# H1\n\n- l1\n- l2\n\n## H2\n\nshowoff',
			output = converter(text).replace(/[\n\t]/g, '');

	test.equal('<section><section><h1>H1</h1><ul><li>l1</li><li>l2</li></ul></section><section><h2>H2</h2><p>showoff</p></section></section>', output);
	test.done();
}

tests.markdownCode = function (test) {
	var text = '```\nhelpme\n```',
			output = converter(text).replace(/[\n\t]/g, '');

	test.equal('<section><section><pre><code>helpme</code></pre></section></section>', output);
	test.done();
}

tests.markdownSingleWrap = function (test) {
	var text = '# H1\n\n- l1\n- l2\n\n## H2\n\nshowoff',
			output = converter(text, true).replace(/[\n\t]/g, '');

	test.equal('<section><h1>H1</h1><ul><li>l1</li><li>l2</li></ul></section><section><h2>H2</h2><p>showoff</p></section>', output);
	test.done();
}

tests.markdownDoubleh1 = function (test) {
	var text = '# H1\n\ntext\n\n# H2\n\nshowoff',
			output = converter(text).replace(/[\n\t]/g, '');

	test.equal('<section><section><h1>H1</h1><p>text</p></section></section><section><section><h1>H2</h1><p>showoff</p></section></section>', output);
	test.done();
}

tests.markdownHtmlEscape = function (test) {
	var text = '<title>',
			output = converter(text, true).replace(/[\n\t]/g, '');

	test.equal('<section><p>&lt;title&gt;</p></section>', output);
	test.done();
}