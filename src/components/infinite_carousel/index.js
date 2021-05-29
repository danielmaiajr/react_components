import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

export default function InfiniteCarousel() {
	const classes = useStyles();

	return (
		<div className={classes.parent}>
			<div className={classes.child}>
				<div>TESTE1</div>
				<div>TESTE2</div>
				<div>TESTE3</div>
				<div>TESTE4</div>
				<div>TESTE5</div>
			</div>
			<div className={classes.child}>
				<div>TESTE1</div>
				<div>TESTE2</div>
				<div>TESTE3</div>
				<div>TESTE4</div>
				<div>TESTE5</div>
			</div>
		</div>
	);
}

const useStyles = makeStyles((theme) => ({
	parent: {
		display: 'grid',
		gridTemplateColumns: '100% 100%',
		margin: 'auto',
		width: '70%',
		overflow: 'hidden',
		position: 'relative',
		'&:after': {
			position: 'absolute',
			right: 0,
			top: 0,
			content: '""',
			width: 100,
			height: '100%',
			zIndex: 2,
			background: 'linear-gradient(to right, white 0%, rgba(255, 255, 255, 0) 100%)',
			transform: 'rotateZ(180deg)'
		},
		'&:before': {
			position: 'absolute',
			left: 0,
			top: 0,
			content: '""',
			width: 100,
			height: '100%',
			zIndex: 2,
			background: 'linear-gradient(to right, white 0%, rgba(255, 255, 255, 0) 100%)'
		}
	},
	child: {
		display: 'flex',
		justifyContent: 'space-around',
		height: 80,
		width: '100%',
		animation: '$infiniteSlide 20s infinite linear'
	},
	'@keyframes infiniteSlide': {
		from: {
			transform: 'translateX(0%)'
		},
		to: {
			transform: 'translateX(-100%)'
		}
	}
}));
