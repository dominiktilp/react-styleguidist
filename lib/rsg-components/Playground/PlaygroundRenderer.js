'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.PlaygroundRenderer = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Editor = require('rsg-components/Editor');

var _Editor2 = _interopRequireDefault(_Editor);

var _Link = require('rsg-components/Link');

var _Link2 = _interopRequireDefault(_Link);

var _Preview = require('rsg-components/Preview');

var _Preview2 = _interopRequireDefault(_Preview);

var _Styled = require('rsg-components/Styled');

var _Styled2 = _interopRequireDefault(_Styled);

var _utils = require('../../utils/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = function styles(_ref) {
	var base = _ref.base,
	    font = _ref.font,
	    link = _ref.link,
	    linkHover = _ref.linkHover,
	    border = _ref.border,
	    baseBackground = _ref.baseBackground,
	    codeBackground = _ref.codeBackground;
	return {
		root: {
			color: base,
			position: 'relative',
			marginBottom: 30,
			border: [[1, border, 'solid']],
			borderRadius: '3px 3px 0 3px',
			'&:hover $isolatedLink': {
				isolate: false,
				opacity: 1
			}
		},
		preview: {
			marginBottom: 3,
			padding: 15
		},
		codeToggle: {
			position: 'absolute',
			right: -1,
			margin: 0,
			padding: [[6, 8]],
			fontFamily: font,
			fontSize: 14,
			lineHeight: 1,
			color: link,
			border: [[1, border, 'solid']],
			borderTop: 0,
			borderBottomLeftRadius: 3,
			borderBottomRightRadius: 3,
			cursor: 'pointer',
			'&:hover, &:active': {
				isolate: false,
				color: linkHover
			}
		},
		showCode: {
			composes: '$codeToggle',
			backgroundColor: baseBackground
		},
		hideCode: {
			composes: '$codeToggle',
			backgroundColor: codeBackground
		},
		isolatedLink: {
			position: 'absolute',
			top: 0,
			right: 0,
			padding: [[6, 8]],
			fontFamily: font,
			fontSize: 14,
			opacity: 0,
			transition: 'opacity ease-in-out .15s .2s'
		}
	};
};

var PlaygroundRenderer = exports.PlaygroundRenderer = function (_Component) {
	_inherits(PlaygroundRenderer, _Component);

	function PlaygroundRenderer() {
		_classCallCheck(this, PlaygroundRenderer);

		return _possibleConstructorReturn(this, (PlaygroundRenderer.__proto__ || Object.getPrototypeOf(PlaygroundRenderer)).apply(this, arguments));
	}

	_createClass(PlaygroundRenderer, [{
		key: 'handleCodeChange',
		value: function handleCodeChange(parsedCode, mode, onChange) {
			return function (newCode) {
				parsedCode[mode] = newCode;
				return onChange((0, _utils.stringifyParsedExampleCode)(parsedCode));
			};
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _props = this.props,
			    classes = _props.classes,
			    code = _props.code,
			    showCode = _props.showCode,
			    index = _props.index,
			    evalInContext = _props.evalInContext,
			    onChange = _props.onChange,
			    onCodeToggle = _props.onCodeToggle,
			    name = _props.name,
			    isolatedExample = _props.isolatedExample;

			var parsedCode = (0, _utils.parseExampleCode)(code);
			return _react2.default.createElement(
				'div',
				{ className: classes.root },
				_react2.default.createElement(
					'div',
					{ className: classes.preview, 'data-preview': name ? name : '' },
					_react2.default.createElement(
						'div',
						{ className: classes.isolatedLink },
						name && (isolatedExample ? _react2.default.createElement(
							_Link2.default,
							{ href: '#!/' + name },
							'\u21FD Exit Isolation'
						) : _react2.default.createElement(
							_Link2.default,
							{ href: '#!/' + name + '/' + index },
							'Open isolated \u21E2'
						))
					),
					_react2.default.createElement(_Preview2.default, { code: code, evalInContext: evalInContext })
				),
				showCode ? _react2.default.createElement(
					'div',
					null,
					['html', 'js', 'jsx'].map(function (mode) {
						return parsedCode[mode] && _react2.default.createElement(_Editor2.default, {
							key: mode,
							mode: mode,
							code: parsedCode[mode],
							onChange: _this2.handleCodeChange(parsedCode, mode, onChange)
						});
					}),
					_react2.default.createElement(
						'button',
						{ type: 'button', className: classes.hideCode, onClick: onCodeToggle },
						'Hide code'
					)
				) : _react2.default.createElement(
					'button',
					{ type: 'button', className: classes.showCode, onClick: onCodeToggle },
					'Show code'
				)
			);
		}
	}]);

	return PlaygroundRenderer;
}(_react.Component);

PlaygroundRenderer.propTypes = {
	classes: _propTypes2.default.object.isRequired,
	code: _propTypes2.default.string.isRequired,
	showCode: _propTypes2.default.bool.isRequired,
	index: _propTypes2.default.number.isRequired,
	evalInContext: _propTypes2.default.func.isRequired,
	onChange: _propTypes2.default.func.isRequired,
	onCodeToggle: _propTypes2.default.func.isRequired,
	name: _propTypes2.default.string,
	isolatedExample: _propTypes2.default.bool
};

exports.default = (0, _Styled2.default)(styles)(PlaygroundRenderer);