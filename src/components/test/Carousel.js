import React, { useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { useSprings, animated } from '@react-spring/web';
import useMeasure from 'react-use-measure';
import { useDrag } from 'react-use-gesture';

import Image from './Image';

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

export default function Test() {
	const size = [ ...Array(9) ];

	const index = useRef(0);
	const [ ref, { width } ] = useMeasure();
	const classes = useStyles({ width });

	const [ props, api ] = useSprings(size.length, () => ({ x: 0, config: { clamp: true } }));

	const bind = useDrag(
		({ active, movement: [ mx ], direction: [ xDir ], distance }) => {
			if (!active && distance > 100) {
				index.current = clamp(index.current + (xDir > 0 ? -1 : 1), 0, 8);
			}
			api.start((i) => {
				const x = -index.current * width + (active ? mx : 0);
				return { x };
			});
		},
		{ axis: 'x' }
	);

	const onPrevious = (e) => {
		index.current = clamp(index.current - 1, 0, 8);

		api.start((i) => {
			const x = -index.current * width;
			return { x };
		});
	};

	const onNext = (e) => {
		index.current = clamp(index.current + 1, 0, 8);

		api.start((i) => {
			const x = -index.current * width;
			return { x };
		});
	};

	console.log('test');

	return (
		<div className={classes.wrapper} ref={ref}>
			<button onClick={onPrevious}>-</button>
			<div className={classes.slider}>
				{props.map(({ x }, i) => (
					<animated.div key={i} {...bind()} style={{ x, touchAction: 'pan-y' }} className={classes.slide}>
						<Image />
					</animated.div>
				))}
			</div>
			<button onClick={onNext}>+</button>
		</div>
	);
}

const useStyles = makeStyles((theme) => ({
	wrapper: {
		width: '100%',
		height: '100%',
		overflow: 'hidden'
	},
	slider: {
		display: 'grid',
		gridTemplateColumns: (props) => `repeat(9, calc(${props.width}px ))`
	},
	slide: { padding: '0 10px' }
}));
