import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTransition, animated } from '@react-spring/web';
import { useWindowSize } from 'react-use';

const CART_WIDTH: number = 500;
const MIN_MIDIA_QUERY: number = 850;

interface PropTypes {
	show: boolean;
	onBackDropClick: React.MouseEventHandler;
	children: React.ReactNode;
}

const Drawer = ({ show, onBackDropClick, children }: PropTypes): JSX.Element => {
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
					<animated.div
						style={width > MIN_MIDIA_QUERY ? { x } : { y, maxWidth: '100%' }}
						className={classes.drawer}
					>
						{children}
					</animated.div>
				</div>
			)
	);
};

export default Drawer;

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
