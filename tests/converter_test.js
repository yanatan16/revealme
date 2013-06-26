var tests = module.exports = {};

var converter = require('../converter');

tests.markdownWrap = function (test) {
	var text = '<!--\ntitle: something\n-->\n\n# H1\n\n- l1\n- l2\n\n## H2\n\nshowoff',
			output = converter(text);

	test.equal('<section><section><h1>H1</h1><ul><li>l1</li><li>l2</li></ul></section><section><h2>H2</h2><p>showoff</p></section></section>', output);
	test.done();
}

tests.markdownCode = function (test) {
	var text = '```\nhelpme\n```',
			output = converter(text);

	test.equal('<pre><code>\nhelpme\n</code></pre>', output);
	test.done();
}