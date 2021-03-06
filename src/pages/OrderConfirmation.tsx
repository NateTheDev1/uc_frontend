import { motion } from 'framer-motion';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import card from '../creditcard.svg';

const OrderConfirmation = () => {
	let params: any = useParams();

	return (
		<div className="order-confirm">
			<motion.img
				src={card}
				alt="credit card"
				animate={{ scale: [1.2, 1, 1.2] }}
				transition={{
					duration: 3,
					repeat: Infinity
				}}
			/>
			<div>
				<h1>You Order Has Been Placed!</h1>
				<h4>Order Id: {params.id}ucPK3dAfWkfD</h4>
			</div>
			<Link
				to="/"
				style={{
					color: '#BB67FF',
					fontSize: '1.2rem'
				}}
				className="done-link"
			>
				Done
			</Link>
		</div>
	);
};

export default OrderConfirmation;
