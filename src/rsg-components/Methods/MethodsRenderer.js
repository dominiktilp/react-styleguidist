import React from 'react';
import PropTypes from 'prop-types';
import Markdown from 'rsg-components/Markdown';
import Argument from 'rsg-components/Argument';
import Arguments from 'rsg-components/Arguments';
import Name from 'rsg-components/Name';
import JsDoc from 'rsg-components/JsDoc';
import Styled from 'rsg-components/Styled';
import cx from 'classnames';

const styles = ({ font, border }) => ({
	table: {
		width: '100%',
		borderCollapse: 'collapse',
	},
	tableHead: {
		borderBottom: [[1, border, 'solid']],
	},
	cell: {
		paddingRight: 15,
		paddingTop: 6,
		verticalAlign: 'top',
		fontFamily: font,
		fontSize: 13,
	},
	cellHeading: {
		paddingRight: 15,
		paddingBottom: 6,
		textAlign: 'left',
		fontFamily: font,
		fontWeight: 'bold',
		fontSize: 13,
	},
	cellDesc: {
		width: '70%',
		paddingRight: 0,
	},
	para: {
		marginBottom: 15,
		fontSize: 13,
	},
});

export function MethodsRenderer({ classes, methods }) {
	function renderRow(method) {
		const { name, description, returns, params = [], tags = {} } = method;
		return (
			<tr key={name}>
				<td className={classes.cell}>
					<Name name={`${name}()`} deprecated={tags.deprecated} />
				</td>
				<td className={classes.cell}>
					<Arguments args={params} />
				</td>
				<td className={cx(classes.cell, classes.cellDesc)}>
					{description && <Markdown text={description} />}
					{returns && <Argument className={classes.para} returns {...returns} />}
					<JsDoc {...tags} />
				</td>
			</tr>
		);
	}

	return (
		<table className={classes.table}>
			<thead className={classes.tableHead}>
				<tr>
					<th className={classes.cellHeading}>Name</th>
					<th className={classes.cellHeading}>Parameters</th>
					<th className={cx(classes.cellHeading, classes.cellDesc)}>Description</th>
				</tr>
			</thead>
			<tbody>
				{methods.map(renderRow)}
			</tbody>
		</table>
	);
}

MethodsRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	methods: PropTypes.arrayOf(PropTypes.shape({
		name: PropTypes.string.isRequired,
		description: PropTypes.string,
		returns: PropTypes.object,
		params: PropTypes.array,
		tags: PropTypes.object,
	})).isRequired,
};

export default Styled(styles)(MethodsRenderer);
