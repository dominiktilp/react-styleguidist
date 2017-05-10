'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.MethodsRenderer = MethodsRenderer;

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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = function styles(_ref) {
	var base = _ref.base,
	    font = _ref.font,
	    border = _ref.border,
	    light = _ref.light,
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
			width: '70%',
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
		}
	};
};

function MethodsRenderer(_ref2) {
	var classes = _ref2.classes,
	    methods = _ref2.methods;

	function renderRows(methods) {
		var rows = [];
		methods.map(function (method) {
			rows.push(_react2.default.createElement(
				'tr',
				{ key: method.name, className: classes.row },
				_react2.default.createElement(
					'td',
					{ className: classes.cell },
					_react2.default.createElement(
						_Code2.default,
						{ className: classes.name },
						method.name,
						'()'
					)
				),
				_react2.default.createElement(
					'td',
					{ className: classes.cell },
					renderParameters(method)
				),
				_react2.default.createElement(
					'td',
					{ className: (0, _classnames2.default)(classes.cell, classes.cellDesc) },
					renderDescription(method),
					renderReturns(method)
				)
			));
		});
		return rows;
	}

	function renderParameters(prop) {
		var params = prop.params;

		var rows = [];
		params.map(function (param) {
			var description = param.description,
			    name = param.name,
			    type = param.type;

			rows.push(_react2.default.createElement(
				'div',
				{ key: name, className: classes.methodParam },
				_react2.default.createElement(
					_Code2.default,
					{ className: classes.name },
					name
				),
				type && ': ',
				type && _react2.default.createElement(
					_Code2.default,
					{ className: classes.type },
					type.name
				),
				description && ' — ',
				description && _react2.default.createElement(_Markdown2.default, { text: description, inline: true })
			));
		});
		return rows;
	}

	function renderReturns(prop) {
		var returns = prop.returns;

		return returns ? _react2.default.createElement(
			'span',
			null,
			'Returns',
			' ',
			_react2.default.createElement(
				_Code2.default,
				{ className: classes.type },
				returns.type.name
			),
			returns.description && ' — ',
			returns.description && _react2.default.createElement(_Markdown2.default, { text: returns.description, inline: true })
		) : false;
	}

	function renderDescription(prop) {
		var description = prop.description;

		return _react2.default.createElement(
			_reactGroup2.default,
			null,
			description && _react2.default.createElement(_Markdown2.default, { text: description, inline: true })
		);
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
					'Parameters'
				),
				_react2.default.createElement(
					'th',
					{ className: (0, _classnames2.default)(classes.cellHeading, classes.cellDesc) },
					'Description'
				)
			)
		),
		_react2.default.createElement(
			'tbody',
			{ className: classes.tableBody },
			renderRows(methods)
		)
	);
}

MethodsRenderer.propTypes = {
	classes: _propTypes2.default.object.isRequired,
	methods: _propTypes2.default.array.isRequired
};

exports.default = (0, _Styled2.default)(styles)(MethodsRenderer);