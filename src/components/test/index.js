import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

export default function Test() {
	const classes = useStyles();

	return <div className={classes.container}>TEST</div>;
}

const useStyles = makeStyles({
	container: {}
});
