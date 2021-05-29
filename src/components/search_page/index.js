import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Paper } from '@material-ui/core';

export default function SearchPage() {
	const classes = useStyles();

	return (
		<Container>
			<Grid container spacing={3}>
				{[ ...Array(24) ].map((a, i) => (
					<Grid item xs={12} sm={6} md={4} key={i}>
						<Paper className={classes.paper}>xs=12</Paper>
					</Grid>
				))}
			</Grid>
		</Container>
	);
}

const useStyles = makeStyles({
	container: {},
	paper: {
		height: 400
	}
});
