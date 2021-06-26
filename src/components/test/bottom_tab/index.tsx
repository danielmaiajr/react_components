import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import { Switch, Route, NavLink } from 'react-router-dom';

export interface routesType {
	path: string;
	name: string;
	component: JSX.Element | null;
	icon: JSX.Element;
}

interface PropTypes {
	routes: routesType[];
}

const BottomTab = ({ routes }: PropTypes): JSX.Element => {
	const classes = useStyles();

	return (
		<React.Fragment>
			<Container>
				<Switch>
					{routes.map((route, i) => (
						<Route exact path={route.path} key={i}>
							{route.component}
						</Route>
					))}
				</Switch>
			</Container>
			<div className={classes.tabWrapper}>
				{routes.map((route, i) => (
					<NavLink className={classes.tab} activeClassName={classes.activeTab} exact to={route.path} key={i}>
						{route.icon}
						<div className={classes.label}>{route.name}</div>
					</NavLink>
				))}
			</div>
		</React.Fragment>
	);
};

export default BottomTab;

const useStyles = makeStyles((theme: Theme) => ({
	tabWrapper: {
		position: 'fixed',
		bottom: 0,
		left: 0,
		width: '100%',
		display: 'flex',
		padding: 2,
		borderTop: '1px solid #CCC'
	},
	tab: {
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		color: '#888'
	},
	activeTab: {
		color: '#cc3535',
		fontWeight: 'bold'
	},
	label: {
		fontSize: 11,
		padding: 2
	}
}));
