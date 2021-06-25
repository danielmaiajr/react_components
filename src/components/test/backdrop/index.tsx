import React, { useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';

import { useTransition, animated } from '@react-spring/web';
import { useHover } from 'react-use-gesture';

interface PropTypes {
	children?: React.ReactNode;
	title: string;
}

const BackpropMenu = ({ children, title }: PropTypes): React.ReactNode => {
	const classes = useStyles();

	const [ active, setActive ] = useState<boolean>(false);

	const transitions = useTransition(active, {
		from: { height: 0, opacity: 0 },
		enter: { height: 500, opacity: 1 },
		leave: { height: 0, opacity: 0 }
	});

	const bind = useHover(() => {
		children && setActive(!active);
	});

	console.log(children);

	return (
		<div className={classes.wrapper}>
			<div {...bind()}>
				<div className={classes.menuName}>{title}</div>

				{children ? (
					transitions(
						(props, active) =>
							active && (
								<animated.div style={{ ...props }} className={classes.backdropWrapper}>
									<div className={classes.backdropContent}>{children}</div>
								</animated.div>
							)
					)
				) : null}
			</div>
		</div>
	);
};

export default BackpropMenu;

const useStyles = makeStyles((theme: Theme) => ({
	wrapper: {
		display: 'flex',
		width: '100%',
		fontSize: 11,
		fontWeight: 'bold'
	},
	menuName: {
		padding: '20px 40px',
		cursor: 'pointer'
	},
	backdropWrapper: {
		position: 'absolute',
		overflow: 'hidden',
		width: '100%',
		top: 80,
		left: 0,
		color: '#000',
		boxShadow: '0 1px 3px rgba(0,0,0,.3)'
	},
	backdropContent: {
		padding: '20px 40px'
	}
}));
