import React from 'react';
import { useHistory } from 'react-router-dom';

const Shop = () => {
	const history = useHistory();

	return (
		<div className="shop-root">
			<div
				className="shop-box-left"
				onClick={() => history.push('/shop/mice')}
			>
				Mice Cables
			</div>
			<div className="shop-box-right">Keyboard Cables (Coming Soon)</div>
		</div>
	);
};

export default Shop;
