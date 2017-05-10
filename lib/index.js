'use strict';

require('./styles');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _isFinite = require('lodash/isFinite');

var _isFinite2 = _interopRequireDefault(_isFinite);

var _utils = require('./utils/utils');

var _StyleGuide = require('rsg-components/StyleGuide');

var _StyleGuide2 = _interopRequireDefault(_StyleGuide);

require('function.name-polyfill');

var _es6ObjectAssign = require('es6-object-assign');

var _es6ObjectAssign2 = _interopRequireDefault(_es6ObjectAssign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Polyfills
_es6ObjectAssign2.default.polyfill();

// Examples code revision to rerender only code examples (not the whole page) when code changes
var codeKey = 0;

function renderStyleguide() {
	var styleguide = require('!!../loaders/styleguide-loader!./index.js');

	var sections = (0, _utils.processSections)(styleguide.sections);

	// Parse URL hash to check if the components list must be filtered

	var _getComponentNameFrom = (0, _utils.getComponentNameFromHash)(),
	    targetComponentName = _getComponentNameFrom.targetComponentName,
	    targetComponentIndex = _getComponentNameFrom.targetComponentIndex;

	var isolatedComponent = false;
	var isolatedExample = false;

	// Filter the requested component id required
	if (targetComponentName) {
		var filteredComponents = (0, _utils.filterComponentsInSectionsByExactName)(sections, targetComponentName);
		sections = [{ components: filteredComponents }];
		isolatedComponent = true;

		// If a single component is filtered and a fenced block index is specified hide the other examples
		if (filteredComponents.length === 1 && (0, _isFinite2.default)(targetComponentIndex)) {
			filteredComponents[0] = (0, _utils.filterComponentExamples)(filteredComponents[0], targetComponentIndex);
			isolatedExample = true;
		}
	}

	// Reset slugger for each render to be deterministic
	_utils.slugger.reset();
	sections = (0, _utils.setSlugs)(sections);

	_reactDom2.default.render(_react2.default.createElement(_StyleGuide2.default, {
		codeKey: codeKey,
		config: styleguide.config,
		welcomeScreen: styleguide.welcomeScreen,
		patterns: styleguide.patterns,
		sections: sections,
		isolatedComponent: isolatedComponent,
		isolatedExample: isolatedExample
	}), document.getElementById('app'));
}

window.addEventListener('hashchange', renderStyleguide);

/* istanbul ignore if */
if (module.hot) {
	module.hot.accept('!!../loaders/styleguide-loader!./index.js', function () {
		codeKey += 1;
		renderStyleguide();
	});
}

renderStyleguide();