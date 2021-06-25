import React, { useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';

import { useTransition, useSpring, animated, config } from '@react-spring/web';
import { useHover } from 'react-use-gesture';

export interface Menu {
	title: String;
	content: JSX.Element | null;
}

interface PropTypes {
	menu: Menu[];
}

const MENU_HEIGHT: number = 40;
const SPAN_WIDTH: number = 100;
const BACKDROP_HEIGHT: number = 350;

const BackpropMenu = ({ menu }: PropTypes): JSX.Element => {
	const [ index, setIndex ] = useState<number>(0);
	const [ active, setActive ] = useState<boolean>(false);

	const classes = useStyles();

	const activeTransitions = useTransition(active, {
		from: { height: 0 },
		enter: { height: BACKDROP_HEIGHT },
		leave: { height: 0 }
	});

	const indexTransitions = useTransition(index, {
		from: { opacity: 0 },
		enter: { opacity: 1 }
	});

	const [ { x, scale, color }, api ] = useSpring(() => ({
		x: 0,
		scale: 0,
		color: '#AAA',
		config: config.stiff
	}));

	const bind = useHover(({ active }) => {
		api.start({ scale: active ? 1 : 0, color: active ? '#FFF' : '#AAA' });
		setActive(false);
	});

	const bindMenu = useHover(({ active, args: [ i ] }) => {
		active && setIndex(i);
		api.start({ x: i * SPAN_WIDTH });
		setActive(menu[i].content ? true : false);
	});

	return (
		<div className={classes.wrapper}>
			<div className={classes.menuWrapper} {...bind()}>
				{menu.map((m: Menu, i) => (
					<animated.div
						key={i}
						className={classes.menuName}
						style={i === index ? { color } : {}}
						{...bindMenu(i)}
					>
						{m.title}
					</animated.div>
				))}

				<animated.span className={classes.selectedIndex} style={{ x, scale }} />

				{activeTransitions(
					({ height }, active) =>
						active && (
							<animated.div style={{ height }} className={classes.backdropWrapper}>
								{indexTransitions(({ opacity }) => (
									<animated.div style={{ opacity }} className={classes.backdropContent}>
										{menu[index].content}
									</animated.div>
								))}
							</animated.div>
						)
				)}
			</div>
		</div>
	);
};

export default BackpropMenu;

const useStyles = makeStyles((theme: Theme) => ({
	wrapper: {
		position: 'relative',
		display: 'flex',
		justifyContent: 'center',
		width: '100%',
		height: MENU_HEIGHT,
		fontSize: 10,
		fontWeight: 'bold',
		color: '#AAA',
		textTransform: 'uppercase'
	},
	menuWrapper: {
		display: 'flex'
	},
	menuName: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		width: SPAN_WIDTH,
		padding: '20px',
		cursor: 'pointer'
	},
	selectedIndex: {
		position: 'absolute',
		width: SPAN_WIDTH,
		bottom: 0,
		height: 2,
		backgroundColor: '#d13939'
	},
	backdropWrapper: {
		position: 'fixed',
		overflow: 'hidden',
		width: '100%',
		top: MENU_HEIGHT,
		left: 0,
		color: '#000',
		boxShadow: '0 1px 3px rgba(0,0,0,.3)'
	},
	backdropContent: {
		padding: '20px 40px'
	}
}));
