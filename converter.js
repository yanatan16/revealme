// vendor
var _ = require('underscore'),
		markdown = require('marked');

module.exports = convertMarkdown;

markdown.setOptions({
	gfm: true,
	sanitize: true,
	tables: true,
	breaks: false,
	pedantic: false,
	smartLists: true,
	smartypants: true
});

function convertMarkdown(md, singleWrap) {
	var tree = markdown.lexer(md);

	if (singleWrap) {
		tree = wrapSectionsSingle(tree);
	}
	else {
		tree = wrapSectionsDouble(tree);
	}

	return markdown.parser(tree);
}

function wrapSectionsSingle(tree) {
	var indexes = [],
			isHeader = function (obj) {
				return obj.type === 'heading' && obj.depth <= 2;
			},
			open = {type:'html',pre:true,text:'<section>'},
			close = {type:'html',pre:true,text:'</section>'};

	_.each(tree, function (subtree, i) {
		if (isHeader(subtree)) {
			indexes.push(i);
		}
	});

	_.each(indexes.slice(1).reverse(), function (i) {
		tree.splice(i, 0, close, open);
	});
	tree.splice(0, indexes[0] || 0, open);
	tree.splice(tree.length, 0, close);

	return tree;
}

function wrapSectionsDouble(tree) {
	var indexes = [],
			isHeader = function (obj) {
				return obj.type === 'heading' && obj.depth <= 2;
			},
			open = {type:'html',pre:true,text:'<section><section>'},
			middle = {type:'html',pre:true,text:'</section><section>'},
			close = {type:'html',pre:true,text:'</section></section>'};

	_.each(tree, function (subtree, i) {
		if (isHeader(subtree)) {
			indexes.push({i:i,d:subtree.depth});
		}
	});

	_.each(indexes.slice(1).reverse(), function (ind) {
		if (ind.d === 2) {
			tree.splice(ind.i, 0, middle);
		} else {
			tree.splice(ind.i, 0, close, open);
		}
	});

	tree.splice(0, (indexes[0] && indexes[0].i) || 0, open);
	tree.splice(tree.length, 0, close);

	return tree;
}