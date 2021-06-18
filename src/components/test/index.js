import React from 'react';
import { Container } from '@material-ui/core';

import Carousel from './Carousel';

export default function Test() {
	const a = [ ...Array(10) ];
	return <Container>{a.map((_, i) => <Carousel key={i} />)}</Container>;
}
