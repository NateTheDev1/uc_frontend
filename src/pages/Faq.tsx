import { Twitter } from '@material-ui/icons';
import React from 'react';
import FadeIn from 'react-fade-in';

const Faq = () => {
	return (
		<div className="faq-root">
			<div className="faq-container">
				<div className="faq-top">
					<h1>Frequently Asked Questions</h1>

					<hr />

					<FadeIn delay={300}>
						<div>
							<p className="question">
								Why do I need an Untangled Cable for my mouse?
							</p>
							<p className="answer">
								A paracorded mouse cable will make your mouse
								feel like it has naturally less drag by allowing
								the cable to be more flexible. This will make
								your wired mouse feel as close to wireless while
								still maintaining the reliability of a wired
								connection.
							</p>
						</div>
						<div>
							<p className="question">
								What length do your mouse cables come in?
							</p>
							<p className="answer">
								My mouse cables come in a standard length of 6
								feet long. I may offer different lengths in the
								future.
							</p>
						</div>
						<div>
							<p className="question">How much is shipping?</p>
							<p className="answer">
								I offer free shipping in the USA. Packages will
								be shipped USPS Priority Mail and usually take 3
								business days to arrive after being sent out.
							</p>
						</div>
						<div>
							<p className="question">
								Do you ship internationally?
							</p>
							<p className="answer">
								Reach out to me through the contact banner and
								we will troubleshoot and replace if needed.
							</p>
						</div>
						<div>
							<p className="question">
								Are cables tested before they are sent out?
							</p>
							<p className="answer">
								Yes, the cables are tested before they are sent
								out.
							</p>
						</div>
						<div>
							<p className="question">
								What if my Untangled Cable does not work?
							</p>
							<p className="answer">
								I currently will only ship to Canada
								internationally and there will be a $10 charge
								to cover shipping expense.
							</p>
						</div>
						<div
							style={{
								marginBottom: '4%'
							}}
						>
							<p
								className="question"
								style={{ fontSize: '1.5rem' }}
							>
								Didn't see your question?
							</p>
							<p
								className="answer"
								style={{ fontSize: '1.2rem' }}
							>
								Please reach out to {''}
								<a
									href="mailto:untangledcables.cs@gmail.com"
									style={{ color: 'black' }}
								>
									untangledcables.cs@gmail.com
								</a>
							</p>
							<p className="question" style={{ marginTop: '2%' }}>
								OR
							</p>
							<p className="answer">
								Follow us on Twitter for the most recent
								updates.
							</p>
							<a
								href="https://twitter.com/UntangledCables?s=09"
								style={{
									textDecoration: 'none',
									color: '#bb67ff'
								}}
							>
								<Twitter></Twitter>
							</a>
						</div>
					</FadeIn>
				</div>
			</div>
		</div>
	);
};

export default Faq;
