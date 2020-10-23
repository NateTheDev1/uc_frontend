import React from 'react';
import { useHistory } from 'react-router-dom';

const Shop = () => {
	const history = useHistory();

	return (
		<div className="shop-root">
			<div className="shop-top">
				<h1>PRODUCT GROUPS</h1>
				<hr />
			</div>
			<div className="shop-bottom">
				<div
					className="shop-box-left"
					onClick={() => history.push('/shop/mice')}
				>
					Mouse Cables
				</div>
				<div className="shop-box-right">
					Keyboard Cables (Coming Soon)
				</div>
			</div>
		</div>
	);
};

export default Shop;
