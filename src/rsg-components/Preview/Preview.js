import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import noop from 'lodash/noop';
import { transform } from 'buble';
import PlaygroundError from 'rsg-components/PlaygroundError';
import Wrapper from 'rsg-components/Wrapper';
import { parseExampleCode } from '../../utils/utils';

/* eslint-disable react/no-multi-comp */

const compileCode = (code, config) => transform(code, config).code;

// Wrap everything in a React component to leverage the state management of this component
class PreviewComponent extends Component {
	static propTypes = {
		jsx: PropTypes.func,
		html: PropTypes.string,
		js: PropTypes.string,
	};

	constructor() {
		super();
		this.state = {};
		this.setState = this.setState.bind(this);
		this.setInitialState = this.setInitialState.bind(this);
	}

	componentDidMount() {
		this.executeJs();
	}

	componentDidUpdate() {
		this.executeJs();
	}

	executeJs() {
		if (this.props.js) {
			eval(this.props.js); // eslint-disable-line no-eval
		}
	}

	// Synchronously set initial state, so it will be ready before first render
	// Ignore all consequent calls
	setInitialState(initialState) {
		Object.assign(this.state, initialState);
		this.setInitialState = noop;
	}

	render() {
		if (this.props.jsx) {
			return this.props.jsx(this.state, this.setState, this.setInitialState);
		}
		return <div dangerouslySetInnerHTML={{ __html: this.props.html }} />;
	}

}

export default class Preview extends Component {
	static propTypes = {
		code: PropTypes.string.isRequired,
		evalInContext: PropTypes.func.isRequired,
	};
	static contextTypes = {
		config: PropTypes.object.isRequired,
	};

	state = {
		error: null,
	};

	componentDidMount() {
		this.executeCode();
	}

	shouldComponentUpdate(nextProps, nextState) {
		return this.state.error !== nextState.error || this.props.code !== nextProps.code;
	}

	componentDidUpdate(prevProps) {
		if (this.props.code !== prevProps.code) {
			this.executeCode();
		}
	}

	executeCode() {
		this.setState({
			error: null,
		});

		const { code } = this.props;
		if (!code) {
			return;
		}

		const parsedCode = parseExampleCode(code);

		let exampleComponent;
		let evalJsCode;
		if (parsedCode.jsx) {
			const compiledCode = this.compileCode(parsedCode.jsx);
			if (!compiledCode) {
				return;
			}

			exampleComponent = this.evalInContext(compiledCode);
		}

		if (parsedCode.js) {
			const compiledCode = this.compileCode(parsedCode.js);
			if (!compiledCode) {
				return;
			}

			evalJsCode = compiledCode;
		}

		const wrappedComponent = (
			<Wrapper>
				<PreviewComponent jsx={exampleComponent} html={parsedCode.html} js={evalJsCode} />
			</Wrapper>
			);

		window.requestAnimationFrame(() => {
			try {
				ReactDOM.render(wrappedComponent, this.mountNode);
			}
			catch (err) {
				this.handleError(err);
			}
		});
	}

	compileCode(code) {
		try {
			return compileCode(code, this.context.config.compilerConfig);
		}
		catch (err) {
			this.handleError(err);
		}
		return false;
	}

	evalInContext(compiledCode) {
		// 1. Use setter/with to call our callback function when user write `initialState = {...}`
		// 2. Wrap code in JSON.stringify/eval to catch the component and return it
		const exampleComponentCode = `
			var stateWrapper = {
				set initialState(value) {
					__setInitialState(value)
				},
			}
			with (stateWrapper) {
				return eval(${JSON.stringify(compiledCode)})
			}
		`;

		return this.props.evalInContext(exampleComponentCode);
	}

	handleError(err) {
		if (this.mountNode) {
			ReactDOM.unmountComponentAtNode(this.mountNode);
		}

		this.setState({
			error: err.toString(),
		});
	}

	render() {
		const { error } = this.state;
		return (
			<div>
				<div ref={ref => (this.mountNode = ref)}></div>
				{error && <PlaygroundError message={error} />}
			</div>
		);
	}
}
