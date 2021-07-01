import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useWindowSize } from 'react-use';

import { makeStyles } from '@material-ui/core/styles';

import { IconButton } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import { useSpring, useSprings, animated, config } from '@react-spring/web';
import { useDrag } from 'react-use-gesture';

import Dots from './Dots';

import { clamp, ItemSlidesToShow } from './utils';

//---------------------------------------
//Needs number of slides with relation to the width size

export default function Carousel({
	breakPoints = [
		{ width: 1, itemsToShow: 1 },
		{ width: 550, itemsToShow: 2, itemsToScroll: 2, pagination: false },
		{ width: 850, itemsToShow: 3 },
		{ width: 1150, itemsToShow: 4, itemsToScroll: 2 },
		{ width: 1450, itemsToShow: 5 },
		{ width: 1750, itemsToShow: 6 }
	],
	isInfinite = false,
	children
}) {
	const { width: windowsWidth } = useWindowSize();

	const numberOfItemSlides = ItemSlidesToShow(breakPoints, windowsWidth);
	const numberOfIndexs = children.length;
	const numberOfSlides = Math.ceil(numberOfIndexs / numberOfItemSlides);

	const index = useRef(0);
	const carouselWidth = useRef(0);

	const [ indexState, setIndexState ] = useState(0);

	const classes = useCarouselStyles({ numberOfIndexs, numberOfItemSlides });
	const [ styles, spring ] = useSpring(() => ({ x: 0, config: config.stiff }));

	//-------------------------------------------------
	//Utility function SETINDEX AND ANIMATION
	const SetCurrentIndex = useCallback(
		(xDir) => {
			setIndexState(clamp(index.current + xDir, 0, numberOfSlides - 1));
			index.current = clamp(index.current + xDir, 0, numberOfSlides - 1);
		},
		[ numberOfSlides ]
	);

	const AnimateXPosition = useCallback(
		(dragMode = false, dragXOffset) => {
			spring.start({ x: -index.current * carouselWidth.current.clientWidth + (dragMode ? dragXOffset : 0) });
		},
		[ spring ]
	);

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

	const OnDrag = ({ active, args: [ index ], movement: [ mx ], direction: [ xDir ], distance }) => {
		if (!active && distance > 100) SetCurrentIndex(-xDir);
		AnimateXPosition(active, mx);
	};

	const bind = useDrag(OnDrag, { axis: 'x' });

	useEffect(
		() => {
			if (isInfinite) {
				const timer = setInterval(() => {
					if (index.current >= numberOfSlides - 1) {
						index.current = 0;
						setIndexState(0);
					} else {
						SetCurrentIndex(1);
					}
					AnimateXPosition();
				}, 5000);
				return () => clearInterval(timer);
			}
		},
		[ isInfinite, SetCurrentIndex, AnimateXPosition, numberOfSlides ]
	);

	console.log('carousel rendered...');

	//-------------------------------------------------
	//RETURN

	return (
		<div className={classes.wrapper}>
			<div className={classes.sliderWrapper}>
				<animated.div className={classes.slider} style={styles} ref={carouselWidth}>
					{children.map((child, i) => (
						<div key={i} className={classes.slide} {...bind(i)}>
							{child}
						</div>
					))}
				</animated.div>

				{/* <IconButton className={classes.minusButton} size="small" disableRipple onClick={() => OnClick(-1)}>
					<ChevronLeftIcon />
				</IconButton>
				<IconButton className={classes.plusButton} size="small" disableRipple onClick={() => OnClick(1)}>
					<ChevronRightIcon />
				</IconButton> */}
			</div>

			<Dots numberOfDots={numberOfSlides} index={indexState} OnClick={OnDotClick} />
		</div>
	);
}

const useCarouselStyles = makeStyles({
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
