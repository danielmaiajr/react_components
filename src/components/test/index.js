import React from 'react';
import { Container } from '@material-ui/core';

import Carousel from './carousel/index.js';
import Image from './Image';

const breakPoints = [
	{ width: 1, itemsToShow: 1 },
	{ width: 550, itemsToShow: 2, itemsToScroll: 2, pagination: false },
	{ width: 850, itemsToShow: 3 },
	{ width: 1150, itemsToShow: 4, itemsToScroll: 2 },
	{ width: 1450, itemsToShow: 5 },
	{ width: 1750, itemsToShow: 6 }
];

export default function Test() {
	const items = [ ...Array(9) ];
	//const a = [ ...Array(10) ];

	return (
		<Container>
			<Carousel breakPoints={breakPoints}>
				{items.map((_, j) => {
					return <Image key={j} />;
				})}
			</Carousel>
		</Container>
	);
}
