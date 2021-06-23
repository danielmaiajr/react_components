import React from 'react';
import { useWindowSize } from 'react-use';

import { makeStyles } from '@material-ui/core/styles';

import { useTransition, animated } from '@react-spring/web';

const CART_WIDTH = 500;

export default function Drawer({ show, onBackDropClick, children }) {
	const { height, width } = useWindowSize();

	const classes = useStyles();

	const transtions = useTransition(show, {
		from: {
			x: CART_WIDTH,
			y: height,
			opacity: 0
		},
		enter: {
			x: 0,
			y: 0,
			opacity: 1
		},
		leave: {
			x: CART_WIDTH,
			y: height,
			opacity: 0
		},
		reverse: show
	});

	return transtions(
		({ x, y, opacity }, item) =>
			item && (
				<div className={classes.wrapper} style={{ pointerEvents: show ? 'auto' : 'none' }}>
					<animated.div style={{ opacity }} className={classes.backDrop} onClick={onBackDropClick} />
					<animated.div style={width > 850 ? { x } : { y, maxWidth: '100%' }} className={classes.drawer}>
						{children}
					</animated.div>
				</div>
			)
	);
}

const useStyles = makeStyles({
	wrapper: {
		position: 'absolute',
		inset: 0,
		overflow: 'hidden'
	},
	backDrop: {
		height: '100%',
		width: '100%',
		background: 'rgba(238,238,238,.7)'
	},
	drawer: {
		position: 'absolute',
		top: 0,
		right: 0,
		padding: '30px 50px',
		maxWidth: CART_WIDTH,
		width: '100%',
		height: '100vh',
		backgroundColor: '#FFF',
		boxShadow: '0 5px 20px -5px rgb(0 0 0 / 7%);'
	}
});
