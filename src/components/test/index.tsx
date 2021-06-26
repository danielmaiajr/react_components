import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import WebAssetIcon from '@material-ui/icons/WebAsset';

import BottomTab, { routesType } from './bottom_tab';

const routes: routesType[] = [
	{
		path: '/',
		name: 'Início',
		component: <span> Início</span>,
		icon: <WebAssetIcon />
	},
	{
		path: '/search',
		name: 'Pesquisa',
		component: <span>Pesquisa</span>,
		icon: <WebAssetIcon />
	},
	{
		path: '/cart',
		name: 'Carrinho',
		component: <span>Carrinho</span>,
		icon: <WebAssetIcon />
	}
];

export default function Test(): React.ReactNode {
	return (
		<Router>
			<BottomTab routes={routes} />
		</Router>
	);
}
