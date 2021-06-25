import { Container, makeStyles } from '@material-ui/core';

import BackpropMenu from './backdrop';

export default function Test() {
	const classes = useStyles();
	return (
		<div className={classes.nav}>
			<Container className={classes.wrapper}>
				<BackpropMenu title="TITLE">TEST1</BackpropMenu>
				<BackpropMenu title="TITLE">TEST2</BackpropMenu>
				<BackpropMenu title="TITLE">TEST3</BackpropMenu>
				<BackpropMenu title="TITLE">TEST4</BackpropMenu>
				<BackpropMenu title="TITLE" />
			</Container>
		</div>
	);
}
const useStyles = makeStyles({
	nav: {
		height: 80,
		display: 'flex',
		backgroundColor: '#000',
		color: '#EAEAEA'
	},
	wrapper: {
		display: 'flex'
	}
});
