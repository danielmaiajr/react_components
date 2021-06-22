import React, { useEffect, useRef } from 'react';
import { useMeasure } from 'react-use';
import { useSpring, animated, config } from '@react-spring/web';

import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

export default function Navigation({ show, setShow, children }) {
	const classes = useStyles();
	const [ ref, { width } ] = useMeasure();

	const refH = useRef([ React.createRef(), React.createRef() ]);

	const [ { x, height }, api ] = useSpring(() => ({ x: 0, config: config.default }));

	useEffect(
		() =>
			api.start({
				x: -show * width,
				height: show ? refH.current[1].current.clientHeight : refH.current[0].current.clientHeight
			}),
		[ show, api, width ]
	);

	const Nav = ({ title, icon }) => (
		<div className={classes.nav}>
			<button className={classes.icon} onClick={() => setShow(!show)}>
				{icon}
			</button>
			<div className={classes.title}>{title}</div>
		</div>
	);

	return (
		<div>
			<animated.div className={classes.wrapper} style={{ height }}>
				<animated.div className={classes.slider} style={{ x }} ref={ref}>
					{children.map((child, i) => (
						<Container>
							<div ref={refH.current[i]}>
								<Nav
									icon={i === 0 ? '' : <ArrowBackIosIcon color="secondary" />}
									title={i === 0 ? 'PAGE1' : 'PAGE2'}
								/>
								<div className={classes.content}>{child}</div>
							</div>
						</Container>
					))}
				</animated.div>
			</animated.div>
		</div>
	);
}

const useStyles = makeStyles({
	wrapper: {
		overflow: 'hidden',
		backgroundColor: '#EEE'
	},

	slider: {
		display: 'grid',
		gridTemplateColumns: '100% 100%'
	},
	content: { padding: '20px 0' },
	nav: {
		position: 'relative',
		display: 'flex',
		padding: '30px 0',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center'
	},
	icon: {
		display: 'flex',
		alignItems: 'center',
		position: 'absolute',
		left: 0
	},
	title: {}
});
