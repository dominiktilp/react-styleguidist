'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
// import memoize from 'lodash/memoize';


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _markdownToJsx = require('markdown-to-jsx');

var _mapValues = require('lodash/mapValues');

var _mapValues2 = _interopRequireDefault(_mapValues);

var _Styled = require('rsg-components/Styled');

var _Styled2 = _interopRequireDefault(_Styled);

var _Link = require('rsg-components/Link');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// We’re explicitly specifying Webpack loaders here so we could skip specifying them in Webpack configuration.
// That way we could avoid clashes between our loaders and user loaders.
require('!!../../../loaders/style-loader!../../../loaders/css-loader!highlight.js/styles/tomorrow.css');

// Temporary disable memoization to fix: https://github.com/styleguidist/react-styleguidist/issues/348
// TODO: Remove after merge: https://github.com/probablyup/markdown-to-jsx/pull/96
var memoize = function memoize(a) {
	return a;
};

// Code blocks with server-side syntax highlight
function Code(_ref) {
	var children = _ref.children,
	    className = _ref.className;

	var isHighlighted = className && className.indexOf('lang-') !== -1;
	if (isHighlighted) {
		return _react2.default.createElement('code', { className: className, dangerouslySetInnerHTML: { __html: children } });
	}
	return _react2.default.createElement(
		'code',
		{ className: className },
		children
	);
}
Code.propTypes = {
	children: _propTypes2.default.node,
	className: _propTypes2.default.string
};

// Custom CSS classes for each tag: <em> → <em className={s.em}> + custom components
var getBaseOverrides = memoize(function (classes) {
	var styleOverrides = (0, _mapValues2.default)(classes, function (value) {
		return {
			props: {
				className: value
			}
		};
	});

	return _extends({}, styleOverrides, {
		code: {
			component: Code,
			props: {
				className: classes.code
			}
		}
	});
}, function () {
	return 'getBaseOverrides';
});

// Inline mode: replace <p> (usual root component) with <span>
var getInlineOverrides = memoize(function (classes) {
	var overrides = getBaseOverrides(classes);

	return _extends({}, overrides, {
		p: {
			component: 'span',
			props: {
				className: classes.base
			}
		}
	});
}, function () {
	return 'getInlineOverrides';
});

var styles = function styles(_ref2) {
	var base = _ref2.base,
	    font = _ref2.font,
	    monospace = _ref2.monospace,
	    link = _ref2.link,
	    linkHover = _ref2.linkHover,
	    border = _ref2.border,
	    codeBackground = _ref2.codeBackground;
	return {
		base: {
			color: base,
			fontFamily: font,
			fontSize: 'inherit'
		},
		para: {
			color: base,
			fontFamily: font,
			fontSize: 'inherit',
			margin: [[0, 0, 15, 0]],
			lineHeight: 1.5
		},
		a: (0, _Link.styles)({ link: link, linkHover: linkHover }).link,
		h1: {
			composes: '$para',
			fontSize: 36,
			fontWeight: 'normal'
		},
		h2: {
			composes: '$para',
			fontSize: 32,
			fontWeight: 'normal'
		},
		h3: {
			composes: '$para',
			fontSize: 26,
			fontWeight: 'normal'
		},
		h4: {
			composes: '$para',
			fontSize: 21,
			fontWeight: 'normal'
		},
		h5: {
			composes: '$para',
			fontSize: 16,
			fontWeight: 'normal'
		},
		h6: {
			composes: '$para',
			fontSize: 16,
			fontWeight: 'normal',
			fontStyle: 'italic'
		},
		p: {
			composes: '$para'
		},
		ul: {
			composes: '$para',
			paddingLeft: 20
		},
		ol: {
			composes: '$para',
			listStyleType: 'decimal',
			paddingLeft: 20
		},
		li: {
			composes: '$base',
			listStyleType: 'inherit'
		},
		input: {
			color: base,
			display: 'inline-block',
			margin: [[0, '0.35em', '0.25em', '-1.2em']],
			verticalAlign: 'middle'
		},
		blockquote: {
			composes: '$para',
			fontSize: 14,
			margin: [[15, 30]],
			padding: 0
		},
		hr: {
			composes: '$para',
			borderWidth: [[0, 0, 1, 0]],
			borderColor: border,
			borderStyle: 'solid'
		},
		em: {
			composes: '$base',
			fontStyle: 'italic'
		},
		strong: {
			composes: '$base',
			fontWeight: 'bold'
		},
		code: {
			fontFamily: monospace,
			fontSize: 'inherit',
			color: 'inherit',
			background: 'transparent',
			whiteSpace: 'inherit'
		},
		pre: {
			composes: '$para',
			backgroundColor: codeBackground,
			border: [[1, border, 'solid']],
			padding: [[12, 15]],
			fontSize: 12,
			borderRadius: 3,
			whiteSpace: 'pre'
		},
		table: {
			composes: '$para',
			borderCollapse: 'collapse'
		},
		thead: {
			composes: '$hr'
		},
		tbody: {},
		td: {
			fontFamily: font,
			padding: [[6, 15, 6, 0]],
			fontSize: 14
		},
		th: {
			composes: '$td',
			fontWeight: 'bold'
		},
		tr: {}
	};
};

function Markdown(_ref3) {
	var classes = _ref3.classes,
	    text = _ref3.text,
	    inline = _ref3.inline;

	var overrides = inline ? getInlineOverrides(classes) : getBaseOverrides(classes);
	return (0, _markdownToJsx.compiler)(text, { overrides: overrides });
}

Markdown.propTypes = {
	classes: _propTypes2.default.object.isRequired,
	text: _propTypes2.default.string.isRequired,
	inline: _propTypes2.default.bool
};

exports.default = (0, _Styled2.default)(styles)(Markdown);