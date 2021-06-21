import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { useSpring, animated } from '@react-spring/web';
import { useDrag } from 'react-use-gesture';

export default function Drag() {
	const [ show, setShow ] = useState(false);
	const classes = useStyles();
	const [ { y }, api ] = useSpring(() => ({ y: 1000 }));

	useEffect(() => api.start({ y: show ? 25 : 1000 }), [ show, api ]);

	const bind = useDrag(
		({ down, movement: [ mx, my ] }) => {
			api.start({ y: down ? my + 25 : 25 });
			if (!down && my > 150) {
				setShow(!show);
			}
		},
		{ bounds: { top: 0 }, rubberband: true }
	);

	const OnClick = () => {
		setShow(!show);
	};

	console.log(show);

	return (
		<div className={classes.wrapper}>
			<div className={classes.buttonWrapper}>
				<button onClick={OnClick}>CLICK</button>
			</div>
			<animated.div className={classes.contentWrapper} style={{ y }}>
				<div className={classes.nav} {...bind()}>
					<div>Drag</div>
				</div>
				<div style={{ height: '100%', backgroundColor: '#EEE' }} />
			</animated.div>
		</div>
	);
}

const useStyles = makeStyles({
	wrapper: {
		position: 'relative',
		width: '100%',
		height: '100vh',
		overflow: 'hidden'
	},
	buttonWrapper: {
		padding: 30
	},
	contentWrapper: {
		position: 'absolute',
		inset: 0
	},
	nav: {
		display: 'flex',
		alignItems: 'center',
		height: 80,
		padding: '0 30px',
		borderRadius: '8px 8px 0 0 ',
		backgroundColor: '#DDD',
		'&:hover': {
			cursor: 'pointer'
		}
	}
});
