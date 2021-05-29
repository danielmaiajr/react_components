import React, { useState } from 'react';

import { AppBar, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Cart from '../cart';

export default function Navbar() {
	const [ show, setShow ] = useState(false);
	const classes = useStyles();

	return (
		<AppBar className={classes.wrapper}>
			<Container className={classes.container}>
				<div>LOGO</div>
				<div>
					<button onClick={() => setShow(!show)}>CART</button>
				</div>
			</Container>
			<Cart show={show} setShow={setShow} />
		</AppBar>
	);
}

const useStyles = makeStyles((theme) => ({
	wrapper: {
		boxShadow: 'none',
		backgroundColor: 'black'
	},
	container: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		height: 80
	}
}));
