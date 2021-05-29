import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

export default function Cart({ show, setShow }) {
	const classes = useStyles({ show });

	return (
		<React.Fragment>
			<div className={classes.bgWrapper} onClick={() => setShow(false)} />
			<div className={classes.cartWrapper}>
				<button onClick={() => setShow(false)}>X</button>
			</div>
		</React.Fragment>
	);
}

const useStyles = makeStyles((theme) => ({
	bgWrapper: {
		display: (props) => (props.show ? 'block' : 'none'),
		position: 'absolute',
		backgroundColor: 'rgb(255, 255, 255, 0.2)',
		width: '100vw',
		height: '100vh',
		zIndex: 900
	},
	cartWrapper: {
		position: 'absolute',
		backgroundColor: 'white',
		height: '100vh',
		width: 400,
		maxWidth: '100%',
		right: 0,
		boxShadow: theme.shadows[5],
		transform: (props) => (props.show ? 'translateX(0)' : 'translateX(100%)'),
		transition: 'transform 300ms',
		zIndex: 1000
	}
}));
