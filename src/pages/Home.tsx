import { motion } from 'framer-motion';
import React from 'react';
import { useHistory } from 'react-router-dom';
import monitor from '../monitor.svg';

const Home = () => {
	const history = useHistory();

	return (
		<>
			<div className="home-root">
				<div className="home-left">
					<h1>The Premium Hand Crafted Cable Experience.</h1>
					<p>
						Hand crafted paracord cables made specific for your
						mouse needs. Get the feel and freedom of a wireless
						mouse with the reliabiity of a wired one.
					</p>
					<button onClick={() => history.push('/shop')}>
						Get Shopping
					</button>
				</div>
				<motion.div
					style={{ width: '0%' }}
					animate={{ width: '45%' }}
					transition={{ duration: 0.5 }}
				>
					<img
						src={monitor}
						alt="monitor"
						style={{ width: '100%' }}
					/>
				</motion.div>
			</div>
		</>
	);
};

export default Home;
