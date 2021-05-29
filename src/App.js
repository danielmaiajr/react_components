import React from 'react';

import { CssBaseline } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import SearchPage from './components/search_page';

const theme = createMuiTheme({
	overrides: {
		MuiCssBaseline: {
			'@global': {
				html: {
					WebkitFontSmoothing: 'auto'
				},
				body: {
					backgroundColor: '#FFF'
				},
				'*': {
					boxSizing: 'border-box',
					margin: 0,
					padding: 0
				}
			}
		}
	}
});

export default function App() {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<SearchPage />
		</ThemeProvider>
	);
}
