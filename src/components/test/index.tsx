import React, { useState } from 'react';

import { ReactComponent as CartIcon } from './cart.svg';

import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';

import { useHover } from 'react-use-gesture';
import { useSpring, animated } from '@react-spring/web';

import Drawer from './mobile_navigation';

const Test = (): React.ReactNode => {
	const [ show, setShow ] = useState<boolean>(false);
	const classes = useStyles();

	const [ { scale }, api ] = useSpring(() => ({ scale: 1 }));
	const bind = useHover(({ active }) => api.start({ scale: active ? 1.4 : 1 }));

	const OnClick: React.MouseEventHandler = (): void => setShow(!show);

	const Cart = (): JSX.Element => (
		<div className={classes.drawerHeader}>
			<div>DRAWER</div>
			<animated.button className={classes.closeButton} onClick={OnClick} style={{ scale }} {...bind()}>
				<CloseIcon />
			</animated.button>
		</div>
	);

	return (
		<div className={classes.wrapper}>
			<div className={classes.nav}>
				<animated.button onClick={() => setShow(!show)} {...bind()} style={{ scale }}>
					<CartIcon style={{ width: 36, height: 36 }} />
				</animated.button>
			</div>
			<Drawer show={show} onBackDropClick={OnClick}>
				<Cart />
			</Drawer>
		</div>
	);
};

export default Test;

const useStyles = makeStyles({
	wrapper: {
		overflow: 'hidden',
		width: '100%',
		height: '100vh',
		backgroundColor: '#FAFAFA'
	},
	nav: {
		display: 'flex',
		justifyContent: 'flex-end',
		width: '100%',
		padding: '30px 50px',
		backgroundColor: '#000',
		color: '#FFF'
	},

	drawerHeader: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	closeButton: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: 36,
		width: 36,
		borderRadius: '50%'
	}
});
