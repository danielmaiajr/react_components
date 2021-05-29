import React, { useState } from 'react';

import { Container, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { products } from './data';
import Section from '../section';
import Carousel from '../carousel';

export default function Product() {
	const [ index, setIndex ] = useState(0);

	return (
		<div>
			<Container>
				<Section
					firstWidth={7}
					secondWidth={5}
					firstComponent={<Image index={index} products={products} />}
					secondComponent={<Description index={index} products={products} setIndex={setIndex} />}
				/>
			</Container>
			<Details />
		</div>
	);
}

const Image = ({ index, products }) => {
	const [ slideIndex, setSlideIndex ] = useState(0);
	const classes = useImageStyles();

	return (
		<div className={classes.wrapper}>
			<div className={classes.buttonWrapper}>
				<button className={classes.button} style={{ marginBottom: 5 }} onClick={() => setSlideIndex(0)}>
					<img style={{ width: 40 }} src={products[index].image} key={0} />
				</button>
				<button className={classes.button} onClick={() => setSlideIndex(1)}>
					<img
						style={{ width: 40 }}
						src={products[index].sideImage}
						key={1}
						onClick={() => setSlideIndex(1)}
					/>
				</button>
			</div>

			<Carousel slideIndex={slideIndex}>
				<img style={{ width: '100%' }} src={products[index].image} key={0} />
				<img style={{ width: '100%' }} src={products[index].sideImage} key={1} />
			</Carousel>
		</div>
	);
};

const useImageStyles = makeStyles((theme) => ({
	wrapper: {
		display: 'flex',
		width: '100%'
	},
	buttonWrapper: {
		paddingTop: 30,
		[theme.breakpoints.down('sm')]: {
			display: 'none'
		}
	},
	button: {
		padding: '18px 10px',
		border: '1px solid #CCC',
		backgroundColor: 'white',
		'&:hover': {
			cursor: 'pointer'
		}
	}
}));

const Description = ({ index, setIndex, products }) => {
	const classes = useDescriptionStyles();

	return (
		<div className={classes.wrapper}>
			<div className={classes.name}>
				{products[index].brand} {products[index].model}
			</div>
			<div className={classes.product_description}>{products[index].product_description}</div>
			<Color products={products} setIndex={setIndex} />
			<div className={classes.price}>R$ {products[index].price},00</div>
			<div className={classes.descountPrice}>R$ {products[index].descountPrice},00</div>
			<div className={classes.debitPrice}>R$ {products[index].debitPrice},00</div>
			<Button variant="contained" color="secondary" fullWidth className={classes.button}>
				Adicionar
			</Button>
			<div className={classes.a}>7 DIAS PARA TROCA OU DEVOLUÇÃO GRÁTIS</div>
			<div className={classes.b}>Política de troca e devolução</div>
		</div>
	);
};

const useDescriptionStyles = makeStyles((theme) => ({
	wrapper: {
		padding: '50px 0',
		marginLeft: 30,
		[theme.breakpoints.down('sm')]: {
			margin: 0
		}
	},
	name: {
		fontSize: 18,
		fontWeight: 'medium',
		color: '#000'
	},
	product_description: {
		fontSize: 14,
		color: '#666'
	},
	price: {
		fontSize: 16,
		color: '#808080',
		textDecoration: 'line-through',
		padding: '2px 0'
	},
	descountPrice: {
		fontSize: 16,
		fontWeight: 600,
		padding: '2px 0'
	},
	debitPrice: {
		fontSize: 20,
		fontWeight: 700,
		padding: '2px 0'
	},
	button: {
		marginTop: 40,
		padding: 10,
		fontWeight: 500
	},
	a: {
		fontSize: 10,
		fontWeight: 500,
		padding: 5,
		textAlign: 'center'
	},
	b: {
		fontSize: 11,
		color: '#666',
		fontWeight: 500,
		textAlign: 'center',
		textDecoration: 'underline'
	}
}));

const Color = ({ products, setIndex }) => {
	const classes = useColorStyles();

	return (
		<div className={classes.wrapper}>
			<span className={classes.span}>CORES </span>
			{products.map((c, i) => {
				return <button className={classes.button} key={i} onClick={() => setIndex(i)} />;
			})}
		</div>
	);
};

const useColorStyles = makeStyles((theme) => ({
	wrapper: {
		display: 'flex',
		alignItems: 'center',
		margin: '30px 0'
	},
	span: {
		fontSize: 10,
		fontWeight: 'bold'
	},
	button: {
		padding: 13,
		marginLeft: 5,
		backgroundColor: 'white',
		border: '1px solid #555',
		borderRadius: '50%',
		'&:hover': {
			cursor: 'pointer'
		}
	}
}));

const Details = () => {
	const classes = useDetails();

	return (
		<div className={classes.wrapper}>
			<Container>TEST</Container>
		</div>
	);
};

const useDetails = makeStyles((theme) => ({
	wrapper: {
		backgroundColor: '#EEE',
		padding: 50
	}
}));
