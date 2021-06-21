import React from 'react';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';

export default function Dots({ numberOfDots, index, OnClick }) {
	const classes = useDotsStyles();

	return (
		<div className={classes.dotWrapper}>
			{[ ...Array(numberOfDots) ].map((_, i) => {
				return i === index ? (
					<button className={clsx(classes.dot, classes.dotSelect)} key={i} />
				) : (
					<button className={classes.dot} key={i} onClick={() => OnClick(i)} />
				);
			})}
		</div>
	);
}

const useDotsStyles = makeStyles({
	dotWrapper: {
		display: 'flex',
		margin: 10
	},
	dot: {
		padding: 2,
		margin: 2,
		borderRadius: '50%',
		border: '1px solid #CCC',
		backgroundColor: '#FFF',
		'&:hover': {
			cursor: 'pointer'
		}
	},
	dotSelect: {
		border: '1px solid #555',
		backgroundColor: '#555'
	}
});
