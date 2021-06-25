import { Container, makeStyles } from '@material-ui/core';

import BackpropMenu, { Menu } from './backdrop';

const Menus: Menu[] = [
	{
		title: 'title',
		content: <div>content1</div>
	},
	{
		title: 'title',
		content: <div>content2</div>
	},
	{
		title: 'title',
		content: null
	},
	{
		title: 'title',
		content: null
	},
	{
		title: 'title',
		content: <div>content4</div>
	},
	{
		title: 'title',
		content: <div>content5</div>
	},
	{
		title: 'title',
		content: <div>content6</div>
	}
];

const Test = (): React.ReactNode => {
	const classes = useStyles();

	return (
		<div className={classes.wrapper}>
			<Container>
				<BackpropMenu menu={Menus} />
			</Container>
		</div>
	);
};

export default Test;

const useStyles = makeStyles({
	wrapper: {
		backgroundColor: '#000',
		color: '#AAA'
	}
});
