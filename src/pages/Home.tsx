import { motion } from 'framer-motion';
import React from 'react';
import { useHistory } from 'react-router-dom';
import logo from '../logo.png';

import FadeIn from 'react-fade-in';

const Home = () => {
	const history = useHistory();

	return (
		<>
			<div className="home-root">
				<FadeIn className="home-left" delay={200}>
					<motion.div
						style={{ width: '0%' }}
						animate={{ width: '100%' }}
						transition={{ duration: 0.2 }}
					>
						<img
							src={logo}
							alt="untangled cables"
							style={{ width: '30%' }}
						/>
					</motion.div>
					<h1>The Premium Hand Crafted Cable Experience.</h1>
					<p>
						Hand crafted paracord cables made specific for your
						mouse needs. Get the feel and freedom of a wireless
						mouse with the reliabiity of a wired one.
					</p>
					<button onClick={() => history.push('/shop')}>
						Start Shopping
					</button>
				</FadeIn>
			</div>
		</>
	);
};

export default Home;
