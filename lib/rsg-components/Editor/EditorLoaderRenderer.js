'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.EditorLoaderRenderer = EditorLoaderRenderer;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Styled = require('rsg-components/Styled');

var _Styled2 = _interopRequireDefault(_Styled);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = function styles(_ref) {
	var font = _ref.font,
	    monospace = _ref.monospace,
	    light = _ref.light,
	    codeBackground = _ref.codeBackground;
	return {
		root: {
			padding: [[7, 16, 10, 7]],
			fontFamily: font,
			fontSize: 12,
			color: light,
			backgroundColor: codeBackground
		},
		// Tweak CodeMirror styles. Duplicate selectors are for increased specificity
		'@global': {
			'.CodeMirror.CodeMirror': {
				fontFamily: monospace,
				height: 'auto',
				padding: [[5, 12]],
				fontSize: 12
			},
			'.CodeMirror-scroll.CodeMirror-scroll': {
				height: 'auto',
				overflowY: 'hidden',
				overflowX: 'auto'
			},
			'.cm-error.cm-error': {
				background: 'none'
			}
		}
	};
};

function EditorLoaderRenderer(_ref2) {
	var classes = _ref2.classes;

	return _react2.default.createElement(
		'div',
		{ className: classes.root },
		'Loading\u2026'
	);
}

EditorLoaderRenderer.propTypes = {
	classes: _propTypes2.default.object.isRequired
};

exports.default = (0, _Styled2.default)(styles)(EditorLoaderRenderer);