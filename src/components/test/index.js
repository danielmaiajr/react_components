import React from 'react';
import { Container } from '@material-ui/core';

import Carousel from './carousel/index.js';
import Image from './Image';

const breakPoints = [
	{ width: 1, itemsToShow: 1 },
	{ width: 550, itemsToShow: 2, itemsToScroll: 2, pagination: false },
	{ width: 850, itemsToShow: 3 },
	{ width: 1150, itemsToShow: 3, itemsToScroll: 2 },
	{ width: 1450, itemsToShow: 3 },
	{ width: 1750, itemsToShow: 3 }
];

export default function Test() {
	const items = [ ...Array(9) ];
	const a = [ ...Array(3) ];

	return (
		<Container>
			{a.map((_, i) => (
				<Carousel breakPoints={breakPoints} key={i}>
					{items.map((_, j) => {
						return <Image key={j} />;
					})}
				</Carousel>
			))}
		</Container>
	);
}
