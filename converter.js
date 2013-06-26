// vendor
var _ = require('underscore'),
		markdown = require('markdown').markdown;

module.exports = convertMarkdown;

function convertMarkdown(md) {
	var tree = markdown.parse(md, "Maruku");

	tree = wrapSections(tree, 2);
	tree = wrapSections(tree, 1);

	return markdown.renderJsonML( markdown.toHTMLTree(tree));
}

function createHeaderLevel(lvl) {
	return function (obj) {
		return obj[0] === 'header' && obj[1].level <= lvl;
	}
}

function wrapSections(tree, lvl) {
	var indexes = [],
			isHeader = createHeaderLevel(lvl);

	_.each(tree.slice(1), function (subtree, i) {
		if (isHeader(subtree)) {
			indexes.push(i + 1);
		} else if (_.isArray(subtree[0]) && subtree[0][0] === 'section') {
			if (_.filter(subtree.slice(1), isHeader).length > 0) {
				indexes.push(i + 1);
			}
		}
	});

	if (indexes.length > 0) {

		var tree2 = tree.slice(0, 1),
				zipdex = _.zip(indexes, indexes.slice(1).concat(tree.length));
		_.each(zipdex, function (pair) {
			var start = pair[0], end = pair[1];
			tree2.push([ ['section']].concat(tree.slice(start, end)));
		});

		return tree2;
	}

	return tree;
}