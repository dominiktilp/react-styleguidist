'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.PropsRenderer = PropsRenderer;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Code = require('rsg-components/Code');

var _Code2 = _interopRequireDefault(_Code);

var _Markdown = require('rsg-components/Markdown');

var _Markdown2 = _interopRequireDefault(_Markdown);

var _Styled = require('rsg-components/Styled');

var _Styled2 = _interopRequireDefault(_Styled);

var _reactGroup = require('react-group');

var _reactGroup2 = _interopRequireDefault(_reactGroup);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = function styles(_ref) {
	var base = _ref.base,
	    font = _ref.font,
	    border = _ref.border,
	    light = _ref.light,
	    lightest = _ref.lightest,
	    name = _ref.name,
	    type = _ref.type;
	return {
		table: {
			width: '100%',
			borderCollapse: 'collapse'
		},
		tableHead: {
			borderBottom: [[1, border, 'solid']]
		},
		tableBody: {},
		row: {},
		cell: {
			color: base,
			paddingRight: 15,
			paddingTop: 6,
			verticalAlign: 'top',
			fontFamily: font,
			fontSize: 13
		},
		cellHeading: {
			color: base,
			paddingRight: 15,
			paddingBottom: 6,
			textAlign: 'left',
			fontFamily: font,
			fontWeight: 'bold',
			fontSize: 13
		},
		cellDesc: {
			color: base,
			width: '99%',
			paddingLeft: 15
		},
		required: {
			fontFamily: font,
			fontSize: 13,
			color: light
		},
		name: {
			fontSize: 13,
			color: name
		},
		type: {
			fontSize: 13,
			color: type
		},
		function: {
			fontFamily: font,
			fontSize: 13,
			color: light,
			borderBottom: '1px dotted ' + lightest
		}
	};
};

function renderType(type) {
	if (!type) {
		return 'unknown';
	}

	var name = type.name;


	switch (name) {
		case 'arrayOf':
			return type.value.name + '[]';
		case 'objectOf':
			return '{' + renderType(type.value) + '}';
		case 'instanceOf':
			return type.value;
		default:
			return name;
	}
}

function renderEnum(prop) {
	if (!Array.isArray((0, _util.getType)(prop).value)) {
		return _react2.default.createElement(
			'span',
			null,
			(0, _util.getType)(prop).value
		);
	}

	var values = (0, _util.getType)(prop).value.map(function (_ref2) {
		var value = _ref2.value;
		return _react2.default.createElement(
			_Code2.default,
			{ key: value },
			(0, _util.showSpaces)((0, _util.unquote)(value))
		);
	});
	return _react2.default.createElement(
		'span',
		null,
		'One of: ',
		_react2.default.createElement(
			_reactGroup2.default,
			{ separator: ', ', inline: true },
			values
		)
	);
}

function PropsRenderer(_ref3) {
	var classes = _ref3.classes,
	    props = _ref3.props;

	function renderRows(props) {
		var rows = [];
		for (var name in props) {
			var prop = props[name];
			rows.push(_react2.default.createElement(
				'tr',
				{ key: name, className: classes.row },
				_react2.default.createElement(
					'td',
					{ className: classes.cell },
					_react2.default.createElement(
						_Code2.default,
						{ className: classes.name },
						name
					)
				),
				_react2.default.createElement(
					'td',
					{ className: classes.cell },
					_react2.default.createElement(
						_Code2.default,
						{ className: classes.type },
						renderType((0, _util.getType)(prop))
					)
				),
				_react2.default.createElement(
					'td',
					{ className: classes.cell },
					renderDefault(prop)
				),
				_react2.default.createElement(
					'td',
					{ className: classes.cell + ' ' + classes.cellDesc },
					renderDescription(prop)
				)
			));
		}
		return rows;
	}

	function renderDefault(prop) {
		if (prop.required) {
			return _react2.default.createElement(
				'span',
				{ className: classes.required },
				'Required'
			);
		} else if (prop.defaultValue) {
			if (prop.type && prop.type.name === 'func') {
				return _react2.default.createElement(
					'span',
					{ className: classes.function, title: (0, _util.showSpaces)((0, _util.unquote)(prop.defaultValue.value)) },
					'Function'
				);
			}

			return _react2.default.createElement(
				_Code2.default,
				null,
				(0, _util.showSpaces)((0, _util.unquote)(prop.defaultValue.value))
			);
		}
		return '';
	}

	function renderDescription(prop) {
		var description = prop.description;

		var extra = renderExtra(prop);
		return _react2.default.createElement(
			_reactGroup2.default,
			{ separator: _react2.default.createElement('br', null) },
			description && _react2.default.createElement(_Markdown2.default, { text: description, inline: true }),
			extra
		);
	}

	function renderExtra(prop) {
		var type = (0, _util.getType)(prop);

		if (!type) {
			return null;
		}

		switch (type.name) {
			case 'enum':
				return renderEnum(prop);
			case 'union':
				return renderUnion(prop);
			case 'shape':
				return renderShape(prop.type.value);
			case 'arrayOf':
				if (type.value.name === 'shape') {
					return renderShape(prop.type.value.value);
				}
				return null;
			case 'objectOf':
				if (type.value.name === 'shape') {
					return renderShape(prop.type.value.value);
				}
				return null;
			default:
				return null;
		}
	}

	function renderUnion(prop) {
		if (!Array.isArray((0, _util.getType)(prop).value)) {
			return _react2.default.createElement(
				'span',
				null,
				(0, _util.getType)(prop).value
			);
		}

		var values = (0, _util.getType)(prop).value.map(function (value) {
			return _react2.default.createElement(
				_Code2.default,
				{ key: value.name, className: classes.type },
				renderType(value)
			);
		});
		return _react2.default.createElement(
			'span',
			null,
			'One of type: ',
			_react2.default.createElement(
				_reactGroup2.default,
				{ separator: ', ', inline: true },
				values
			)
		);
	}

	function renderShape(props) {
		var rows = [];
		for (var name in props) {
			var prop = props[name];
			var defaultValue = renderDefault(prop);
			var description = prop.description;
			rows.push(_react2.default.createElement(
				'div',
				{ key: name },
				_react2.default.createElement(
					_Code2.default,
					{ className: classes.name },
					name
				),
				': ',
				_react2.default.createElement(
					_Code2.default,
					{ className: classes.type },
					renderType(prop)
				),
				defaultValue && ' — ',
				defaultValue,
				description && ' — ',
				description && _react2.default.createElement(_Markdown2.default, { text: description, inline: true })
			));
		}
		return rows;
	}

	return _react2.default.createElement(
		'table',
		{ className: classes.table },
		_react2.default.createElement(
			'thead',
			{ className: classes.tableHead },
			_react2.default.createElement(
				'tr',
				{ className: classes.row },
				_react2.default.createElement(
					'th',
					{ className: classes.cellHeading },
					'Name'
				),
				_react2.default.createElement(
					'th',
					{ className: classes.cellHeading },
					'Type'
				),
				_react2.default.createElement(
					'th',
					{ className: classes.cellHeading },
					'Default'
				),
				_react2.default.createElement(
					'th',
					{ className: classes.cellHeading + ' ' + classes.cellDesc },
					'Description'
				)
			)
		),
		_react2.default.createElement(
			'tbody',
			{ className: classes.tableBody },
			renderRows(props)
		)
	);
}

PropsRenderer.propTypes = {
	classes: _propTypes2.default.object.isRequired,
	props: _propTypes2.default.object.isRequired
};

exports.default = (0, _Styled2.default)(styles)(PropsRenderer);