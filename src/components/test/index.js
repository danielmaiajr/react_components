import React, { useState } from 'react';

import { TextField } from '@material-ui/core';

import Navigation from './mobile_navigation';

const Page1 = ({ setShow }) => {
	return <button onClick={() => setShow(1)}>PAGE2</button>;
};
const Page2 = (props) => {
	console.log(props);
	return (
		<div>
			<TextField label="Outlined" variant="outlined" fullWidth style={{ paddingBottom: 10 }} />
			<TextField label="Outlined" variant="outlined" fullWidth />
		</div>
	);
};
export default function Test() {
	const [ show, setShow ] = useState(false);

	return (
		<Navigation show={show} setShow={setShow}>
			<Page1 setShow={setShow} />
			<Page2 setShow={setShow} />
		</Navigation>
	);
}
