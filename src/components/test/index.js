import React from 'react';
import { Container } from '@material-ui/core';

import Carousel from './Carousel';
import Image from './Image';

export default function Test() {
	const items = [ ...Array(9) ];
	const a = [ ...Array(10) ];
	return (
		<Container>
			<Carousel>
				{items.map((_, j) => {
					return <Image key={j} />;
				})}
			</Carousel>
		</Container>
	);
}
