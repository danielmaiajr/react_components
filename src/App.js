import React from 'react';

import { CssBaseline } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import Test from './components/test';

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
				},
				img: {
					pointerEvents: 'none',
					userSelect: 'none'
				},
				button: {
					backgroundColor: 'inherit',
					border: 'none',
					'&:hover': {
						cursor: 'pointer'
					}
				}
			}
		}
	}
});

export default function App() {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Test />
		</ThemeProvider>
	);
}
