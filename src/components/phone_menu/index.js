import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { useSpring, useSprings, animated, config } from '@react-spring/web';
import { useDrag } from 'react-use-gesture';

export default function PhoneMenu() {
	const classes = useStyles();

	const items = [ ...Array(3) ];

	const [ styles, api ] = useSpring(() => ({ x: 0, config: config.molasse }));

	const [ springs, springsApi ] = useSprings(items.length, (i) => ({
		y: 0,
		width: '80%',
		display: 'block'
	}));

	const bind = useDrag(({ down, offset: [ x, y ], movement: [ mx, my ], args: [ i ] }) => {
		api.start({ x: x });

		springsApi.start((index) => {
			if (index !== i) return;

			return {
				to: async (next) => {
					await next({
						y: down ? my : 0
					});
				}
			};
		});
	});

	return (
		<div className={classes.wrapper}>
			<animated.div className={classes.slider} style={styles}>
				{springs.map(({ y, width, display }, i) => (
					<animated.div key={i} className={classes.itemWrapper} style={{ y, width, display }} {...bind(i)}>
						<div className={classes.item} />
					</animated.div>
				))}
			</animated.div>
		</div>
	);
}

const useStyles = makeStyles({
	wrapper: {
		margin: '50px auto',
		width: 500,
		height: 700,
		border: '1px solid #CCC',
		overflow: 'hidden'
	},
	slider: {
		position: 'relative',
		display: 'inline-box',
		width: '100%',
		height: '100%'
	},
	itemWrapper: {
		width: '80%',
		height: '80%',
		margin: 'auto'
	},
	item: {
		margin: 20,
		width: '100%',
		height: '100%',
		border: '1px solid #CCC'
	}
});
