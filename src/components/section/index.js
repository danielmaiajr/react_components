import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

export default function Section({ firstComponent, secondComponent, reverse, firstWidth = 6, secondWidth = 6 }) {
	const styles = useStyles({ reverse });

	return (
		<Grid container spacing={2} className={styles.container}>
			<Grid item xs={12} sm={12} md={firstWidth} className={styles.section}>
				{firstComponent && firstComponent}
			</Grid>

			<Grid item xs={12} sm={12} md={secondWidth} className={styles.section}>
				{secondComponent && secondComponent}
			</Grid>
		</Grid>
	);
}

const useStyles = makeStyles((theme) => ({
	container: {
		backgroundColor: 'inherit',
		[theme.breakpoints.down('sm')]: {
			flexDirection: (props) => (props.reverse ? 'column-reverse' : 'column'),
			flexWrap: 'nowrap'
		}
	},
	section: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center'
	}
}));
