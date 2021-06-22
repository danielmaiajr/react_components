import React from 'react';
import { Switch, Route, Link, useLocation } from 'react-router-dom';
import { useTransition, animated } from '@react-spring/web';

const routes = [
	{
		path: '/',
		exact: true,
		main: () => <h2>Home</h2>
	},
	{
		path: '/page1',
		main: () => <h2>Page1</h2>
	},
	{
		path: '/page2',
		main: () => <h2>Page2</h2>
	}
];

export default function PageTransition() {
	const location = useLocation();

	const transitions = useTransition(location, {
		from: { opacity: 0 },
		enter: { opacity: 1 },
		leave: { opacity: 0 },
		trail: 100,
		config: { duration: 100 }
	});

	return (
		<React.Fragment>
			<ul style={{ padding: 30 }}>
				<li>
					<Link to="/">Home</Link>
				</li>
				<li>
					<Link to="/page1">Page1</Link>
				</li>
				<li>
					<Link to="/page2">Page2</Link>
				</li>
			</ul>
			<hr />
			<div style={{ padding: 30 }}>
				{transitions(({ opacity }, item) => (
					<animated.div style={{ position: 'absolute', opacity }}>
						<Switch location={item}>
							{routes.map((route, index) => (
								<Route key={index} path={route.path} exact={route.exact}>
									{route.main}
								</Route>
							))}
						</Switch>
					</animated.div>
				))}
			</div>
		</React.Fragment>
	);
}
