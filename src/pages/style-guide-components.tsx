import React, { useContext, useEffect, useState } from "react";

const StyleGuideComponents = ({ theme }) => {
	return (
		<div data-theme={theme || "light"}>
			<p>
				Mel's Loop is a <a href="#">comprehensive</a> guide and guide for The
				Story of Mel, an epic Hacker Folklore tale that was written and
				published by its author, Ed Nather, on the Usenet in 1983. The story{" "}
				Mel's Loop is a <a href="#">comprehensive</a> guide and guide for The
				Story of Mel, an epic Hacker Folklore tale that was written and
				published by its author, Ed Nather, on the Usenet in 1983. The story{" "}
				Mel's Loop is a <a href="#">comprehensive</a> guide and guide for The
				Story of Mel, an epic Hacker Folklore tale that was written and
				published by its author, Ed Nather, on the Usenet in 1983. The story{" "}
				Mel's Loop is a <a href="#">comprehensive</a> guide and guide for The
				Story of Mel, an epic Hacker Folklore tale that was written and
				published by its author, Ed Nather, on the Usenet in 1983. The story{" "}
			</p>
			<section className="section">
				<header>
					<h2>Typography</h2>
				</header>
				<main>
					<h1>Heading 1</h1>
					<h2>Heading 2</h2>
					<h3>Heading 3</h3>
					<h4>Heading 4</h4>
					<h5>Heading 5</h5>
					<h6>Heading 6</h6>
				</main>
			</section>
			<section className="section">
				<h3>Paragraph</h3>
				<p>
					Mel's Loop is a <a href="#">comprehensive</a> guide and guide for The
					Story of Mel, an epic Hacker Folklore tale that was written and
					published by its author, Ed Nather, on the Usenet in 1983. The story{" "}
					<a data-annotation="true" href="#">
						describes
					</a>{" "}
					an exemplary "Real Programmer" by the name of Mel Kaye and his subtle{" "}
					<a href="#" data-glossary="true">
						techniques
					</a>{" "}
					<span
						data-link-type="annotation"
						data-link-target="the-timeline-of-royal-mcbee"
					>
						<span className="popover popover type-annotation">
							<span
								className="trigger"
								data-popover-visibility="false"
								tabIndex="1"
								type="button"
								aria-haspopup="dialog"
								aria-expanded="false"
								aria-controls="radix-:rct:"
								data-state="closed"
							>
								<span className="wrapper" data-popover-visibility="false">
									<span className="annotation">
										<span
											className="content"
											data-prefix="0"
											data-seq="7"
										></span>
									</span>
								</span>
							</span>
						</span>
					</span>
					fascinate his colleagues.
					<span data-link-type="glossary" data-link-target="ratfor">
						<span className="popover popover type-glossary">
							<span
								className="trigger"
								data-popover-visibility="false"
								tabIndex={1}
								type="button"
								aria-haspopup="dialog"
								aria-expanded="false"
								aria-controls="radix-:rch:"
								data-state="closed"
							>
								<span className="wrapper" data-popover-visibility="false">
									<span className="content-component-text">RATFOR</span>
								</span>
							</span>
						</span>
					</span>
					The story is one of the earliest documentations of The Hacker Spirit,
					and the themes in the story are still valid to this day.
				</p>
			</section>
			<section className="section">
				<h3>Blockquote</h3>
				<blockquote className="blockquote">
					Blockquote
					<small>Small text</small>
				</blockquote>
			</section>

			<section className="section">
				<h2>Components</h2>
				<div className="section">
					<h3>Code</h3>
					<code className="code">
						<pre>
							Heading 1 Heading 2 Heading 3 Heading 4 Heading 4 Heading 4
						</pre>
					</code>
				</div>
			</section>
		</div>
	);
};

export default StyleGuideComponents;
