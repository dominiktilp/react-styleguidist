'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.SectionRenderer = SectionRenderer;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Styled = require('rsg-components/Styled');

var _Styled2 = _interopRequireDefault(_Styled);

var _Heading = require('rsg-components/Heading');

var _Heading2 = _interopRequireDefault(_Heading);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = function styles(_ref) {
	var font = _ref.font;
	return {
		root: {
			marginBottom: 50
		},
		heading: {
			margin: [[0, 0, 20]],
			fontFamily: font,
			fontSize: 38,
			fontWeight: 'bold'
		}
	};
};

function SectionRenderer(_ref2) {
	var classes = _ref2.classes,
	    name = _ref2.name,
	    slug = _ref2.slug,
	    content = _ref2.content,
	    components = _ref2.components,
	    sections = _ref2.sections;

	return _react2.default.createElement(
		'section',
		{ className: classes.root },
		name && _react2.default.createElement(
			_Heading2.default,
			{ level: 1, slug: slug, className: classes.heading },
			name
		),
		content,
		components,
		sections
	);
}

SectionRenderer.propTypes = {
	classes: _propTypes2.default.object.isRequired,
	name: _propTypes2.default.string,
	slug: _propTypes2.default.string,
	content: _propTypes2.default.node,
	components: _propTypes2.default.node,
	sections: _propTypes2.default.node
};

exports.default = (0, _Styled2.default)(styles)(SectionRenderer);