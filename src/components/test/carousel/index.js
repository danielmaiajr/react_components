import React, { useRef, useState } from 'react';
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

export default function Carousel({ children }) {
	const numberOfItemSlides = 3;
	const numberOfIndexs = children.length;
	const numberOfSlides = Math.ceil(numberOfIndexs / numberOfItemSlides);

	const index = useRef(0);
	const width = useRef(0);

	const [ indexState, setIndexState ] = useState(0);

	const classes = useCarouselStyles({ numberOfIndexs, numberOfItemSlides });
	const [ styles, spring ] = useSpring(() => ({ x: 0, config: config.stiff }));
	const [ newStyles, newSpring ] = useSprings(numberOfIndexs, () => ({
		scale: 1,
		opacity: 1,
		config: config.default
	}));

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

	const OnDrag = ({ active, args: [ index ], movement: [ mx ], direction: [ xDir ], distance }) => {
		if (!active && distance > 100) SetCurrentIndex(-xDir);
		AnimateXPosition(active, mx);

		newSpring.start((i) => {
			if (!active) return { scale: 1, opacity: 1 };
			return { scale: active && i === index ? 1.2 : 0.9, opacity: active && i !== index ? 0.5 : 1 };
		});
	};

	const bind = useDrag(OnDrag, { axis: 'x' });

	console.log('carousel rendered...');

	//-------------------------------------------------
	//RETURN

	return (
		<div className={classes.wrapper}>
			<div className={classes.sliderWrapper}>
				<animated.div className={classes.slider} style={styles} ref={width}>
					{newStyles.map((styles, i) => (
						<animated.div style={styles} key={i} className={classes.slide} {...bind(i)}>
							{children[i]}
						</animated.div>
					))}
				</animated.div>

				<IconButton className={classes.minusButton} size="small" disableRipple onClick={() => OnClick(-1)}>
					<ChevronLeftIcon />
				</IconButton>
				<IconButton className={classes.plusButton} size="small" disableRipple onClick={() => OnClick(1)}>
					<ChevronRightIcon />
				</IconButton>
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
