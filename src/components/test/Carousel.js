import React, { useRef, useState } from 'react';

import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';

import { IconButton } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import { useSpring, animated, config } from '@react-spring/web';
import { useDrag } from 'react-use-gesture';

import Image from './Image';

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

//---------------------------------------
//Needs number of slides with relation to the width size

export default function Test() {
	const size = [ ...Array(18) ];
	const numberOfItemSlides = 3;
	const numberOfIndexs = size.length;
	const numberOfSlides = Math.ceil(numberOfIndexs / numberOfItemSlides);

	const index = useRef(0);
	const width = useRef(0);

	const [ indexState, setIndexState ] = useState(0);

	const classes = useStyles({ numberOfIndexs, numberOfItemSlides });
	const [ styles, spring ] = useSpring(() => ({ x: 0, config: config.stiff }));

	//-------------------------------------------------
	//Utility function SETINDEX AND ANIMATION
	const SetCurrentIndex = (xDir) => {
		setIndexState(clamp(index.current + xDir, 0, numberOfSlides - 1));
		index.current = clamp(index.current + xDir, 0, numberOfSlides - 1);
	};

	const AnimateXPosition = (dragMode = false, dragXOffset) => {
		spring.start({ x: -index.current * width.current.clientWidth + (dragMode ? dragXOffset : 0) });
	};

	//-------------------------------------------------
	//Function events ONCLICK AND DRAG
	const OnClick = (xDir) => {
		SetCurrentIndex(xDir);
		AnimateXPosition();
	};

	const OnDotClick = (i) => {
		setIndexState(clamp(i, 0, numberOfSlides - 1));
		index.current = clamp(i, 0, numberOfSlides - 1);
		AnimateXPosition();
	};

	const OnDrag = ({ active, movement: [ mx ], direction: [ xDir ], distance }) => {
		if (!active && distance > 100) SetCurrentIndex(-xDir);

		AnimateXPosition(active, mx);
	};

	const bind = useDrag(OnDrag, { axis: 'x' });

	return (
		<div className={classes.wrapper}>
			<div className={classes.sliderWrapper}>
				<animated.div className={classes.slider} style={styles} ref={width}>
					{size.map((_, i) => (
						<div key={i} className={classes.slide} {...bind()}>
							<Image />
						</div>
					))}
				</animated.div>

				<IconButton className={classes.minusButton} size="small" disableRipple onClick={() => OnClick(-1)}>
					<ChevronLeftIcon />
				</IconButton>
				<IconButton className={classes.plusButton} size="small" disableRipple onClick={() => OnClick(1)}>
					<ChevronRightIcon />
				</IconButton>
			</div>

			<div className={classes.dotWrapper}>
				{[ ...Array(numberOfSlides) ].map((dot, i) => {
					return i === indexState ? (
						<button className={clsx(classes.dot, classes.dotSelect)} key={i} />
					) : (
						<button className={classes.dot} key={i} onClick={() => OnDotClick(i)} />
					);
				})}
			</div>
		</div>
	);
}

const useStyles = makeStyles({
	wrapper: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: '20px 0',
		width: '100%',
		height: '100%'
	},
	sliderWrapper: {
		width: '100%',
		height: '100%',
		overflow: 'hidden',
		position: 'relative'
	},
	slider: {
		display: 'grid',
		gridTemplateColumns: (props) => `repeat(${props.numberOfIndexs}, calc(100% / ${props.numberOfItemSlides}))`,
		touchAction: 'pan-y',
		userSelect: 'none'
	},
	slide: {
		display: 'flex',
		justifyContent: 'center',
		padding: '0 10px'
	},
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
	},
	minusButton: {
		position: 'absolute',
		top: 'calc(50% - 16px)',
		left: 0,
		zIndex: 1000,
		backgroundColor: '#FFF',
		border: '1px solid #CCC'
	},
	plusButton: {
		position: 'absolute',
		top: 'calc(50% - 16px)',
		right: 0,
		zIndex: 1000,
		backgroundColor: '#FFF',
		border: '1px solid #CCC'
	}
});
