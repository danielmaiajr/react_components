import React, { useState, useLayoutEffect, useRef, useEffect } from 'react';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';

import { IconButton } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import { getPositionX, useWidth } from '../utils';

export default function Carousel({
	breakpoints = {
		xs: 1,
		sm: 1,
		md: 1,
		lg: 1,
		xl: 1
	},
	children,
	useTimer = false,
	isInfinite = false,
	showButton = false,
	slideIndex = null
}) {
	const [ activeIndex, setActiveIndex ] = useState(0);

	const onHover = useRef(false);

	const [ numPerSlide, setNumPerSlide ] = useState(1);

	const numOfSlides = children.length;
	const totalNumOfColumns = Math.ceil(numOfSlides / numPerSlide);

	const width = useWidth();
	const classes = useStyles({ numPerSlide, numOfSlides });

	const next = () => {
		if (activeIndex < totalNumOfColumns - 1) {
			setActiveIndex(activeIndex + 1);
		} else if (useTimer || isInfinite) {
			setActiveIndex(0);
		}
	};

	const previous = () => {
		if (activeIndex > 0) {
			setActiveIndex(activeIndex - 1);
		} else if (useTimer || isInfinite) {
			setActiveIndex(totalNumOfColumns - 1);
		}
	};

	useEffect(
		() => {
			setActiveIndex(slideIndex || 0);
		},
		[ slideIndex ]
	);

	useEffect(
		() => {
			if (useTimer) {
				const timer = setInterval(() => {
					if (onHover.current === false) next();
				}, 5000);
				return () => clearInterval(timer);
			}
		},
		[ activeIndex, totalNumOfColumns, onHover ]
	);

	useLayoutEffect(
		() => {
			setNumPerSlide(breakpoints[width]);
		},
		[ width ]
	);

	// -----------------------------------------
	//NEW: FOR THE TOUCH SLIDER

	const isDragging = useRef(false);
	const startPos = useRef(0);
	const currentTranslate = useRef(0);
	const prevTranslate = useRef(0);
	const currentIndex = useRef(activeIndex || 0);
	const sliderRef = useRef('slider');
	const sliderWrapperRef = useRef('sliderWrapper');
	const animationRef = useRef(null);

	const setPositionByIndex = () => {
		currentTranslate.current = -currentIndex.current * (sliderWrapperRef.current.clientWidth + 12);
		prevTranslate.current = currentTranslate.current;
		setSliderPosition();
	};

	useEffect(
		() => {
			if (activeIndex !== currentIndex.current) {
				currentIndex.current = activeIndex;
				setPositionByIndex();
			}
		},
		[ activeIndex, setPositionByIndex ]
	);

	const trueIndex = (index) => {
		let newIndex = 0;

		[ ...Array(totalNumOfColumns) ].map((col, colIndex) => {
			if (index >= numPerSlide * colIndex) return (newIndex = colIndex);
		});

		return newIndex;
	};

	const touchStart = (index) => {
		return function(event) {
			currentIndex.current = index;
			startPos.current = getPositionX(event);
			isDragging.current = true;

			animationRef.current = requestAnimationFrame(animation);
		};
	};

	const touchEnd = () => {
		isDragging.current = false;

		cancelAnimationFrame(animationRef.current);

		const movedBy = currentTranslate.current - prevTranslate.current;
		if (movedBy < -50 && activeIndex < totalNumOfColumns - 1) {
			currentIndex.current += 1;
			setActiveIndex(currentIndex.current);
		}
		if (movedBy > 50 && currentIndex.current > 0) {
			currentIndex.current -= 1;
			setActiveIndex(currentIndex.current);
		}

		setPositionByIndex();
	};

	const touchMove = (event) => {
		onHover.current = true;
		if (isDragging.current) {
			const currentPosition = getPositionX(event);
			currentTranslate.current = prevTranslate.current + currentPosition - startPos.current;
		}
	};

	const animation = () => {
		setSliderPosition();

		if (isDragging) requestAnimationFrame(animation);
	};

	const setSliderPosition = () => {
		sliderRef.current.style.transform = `translateX(${currentTranslate.current}px)`;
	};

	return (
		<div className={classes.wrapper}>
			<div className={classes.sliderWrapper} ref={sliderWrapperRef}>
				<div
					className={classes.slider}
					ref={sliderRef}
					onMouseLeave={() => {
						if (isDragging.current) touchEnd();
						onHover.current = false;
					}}
				>
					{children.map((child, index) => (
						<div
							key={child.key}
							onTouchStart={touchStart(trueIndex(index))}
							onTouchEnd={touchEnd}
							onTouchMove={touchMove}
							onMouseDown={touchStart(trueIndex(index))}
							onMouseUp={touchEnd}
							onMouseMove={touchMove}
							onDragStart={(e) => {
								e.preventDefault();
								e.stopPropagation();
								return false;
							}}
							onContextMenu={(e) => {
								e.preventDefault();
								e.stopPropagation();
							}}
						>
							{child}
						</div>
					))}
				</div>
			</div>

			<div className={classes.dotWrapper}>
				{[ ...Array(totalNumOfColumns) ].map((dot, i) => {
					return i === activeIndex ? (
						<button className={clsx(classes.dot, classes.dotSelect)} key={i} />
					) : (
						<button className={classes.dot} key={i} onClick={() => setActiveIndex(i)} />
					);
				})}
			</div>

			{showButton ? (
				<React.Fragment>
					<IconButton
						onClick={previous}
						className={clsx(classes.button, classes.leftButton)}
						size="small"
						disableRipple
					>
						<ChevronLeftIcon />
					</IconButton>
					<IconButton
						onClick={next}
						className={clsx(classes.button, classes.rightButton)}
						size="small"
						disableRipple
					>
						<ChevronRightIcon />
					</IconButton>
				</React.Fragment>
			) : null}
		</div>
	);
}

const useStyles = makeStyles((theme) => ({
	wrapper: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		position: 'relative',
		width: '100%'
	},

	sliderWrapper: {
		width: '100%',
		height: '100%',
		overflow: 'hidden'
	},

	slider: {
		transition: 'transform 300ms ease-out',
		display: 'grid',
		gridGap: '12px',
		gridTemplateColumns: (props) => {
			const totalGap = 12 * (props.numPerSlide - 1) / props.numPerSlide;
			return `repeat(${props.numOfSlides}, calc(100% / ${props.numPerSlide} - ${totalGap}px))`;
		}
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

	button: {
		position: 'absolute',
		top: 'calc(50% - 30px)',
		zIndex: 1000,
		backgroundColor: '#FFF',
		border: '1px solid #CCC',
		[theme.breakpoints.down('sm')]: {
			display: 'none'
		}
	},
	leftButton: {
		left: -15
	},
	rightButton: {
		right: -15
	}
}));
