import React from "react";

const StyleGuideComponents = ({ theme }) => {
	return (
		<div data-theme={theme || "light"}>
			<div className="strip"></div>
			<div className="logo"></div>
			<section className="section">
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
				<p>
					<span className="strong">Bold</span>
				</p>
				<p>
					<span className="italic">Italics</span>
				</p>

				<p>
					<a data-annotation="true" href="#">
						Link
					</a>
				</p>

				<p>
					Annotation
					<span
						data-link-type="annotation"
						data-link-target="the-timeline-of-royal-mcbee"
					>
						<span className="popover popover type-annotation">
							<span className="trigger" data-popover-visibility="false">
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
				</p>

				<p>
					<span data-link-type="glossary" data-link-target="ratfor">
						<span className="popover popover type-glossary">
							<span
								className="trigger"
								data-popover-visibility="false"
								tabIndex={1}
								aria-haspopup="dialog"
								aria-expanded="false"
								aria-controls="radix-:rch:"
								data-state="closed"
							>
								<span className="wrapper" data-popover-visibility="false">
									<span className="content-component-text">Glossary Term</span>
								</span>
							</span>
						</span>
					</span>
				</p>

				<p>
					Paragraph: <span className="strong">Mel's Loop</span> is aguide and
					guide for The Story of Mel, an epic Hacker Folklore tale that was
					written and published by its author, Ed Nather, on the Usenet in 1983.
					The story an exemplary "Real Programmer" by the name of Mel Kaye and
					his subtle fascinate his colleagues. The story is one of the earliest
					documentations of The Hacker Spirit, and the themes in the story are
					still valid to this day.
				</p>

				<p>
					<span className="line">Line: single line in a paragraph</span>
					<span className="line">Line: single line in a paragraph</span>
					<span className="line">Line: single line in a paragraph</span>
					<span className="line">Line: single line in a paragraph</span>
					<span className="line">Line: single line in a paragraph</span>
				</p>

				<ul>
					<li>List Item 1</li>
					<li>List Item 2</li>
					<li>List Item 3</li>
				</ul>

				<ol>
					<li>List Item 1</li>
					<li>List Item 2</li>
					<li>List Item 3</li>
				</ol>

				<table>
					<thead>
						<tr>
							<td>a</td>
							<td>a</td>
							<td>a</td>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>b</td>
							<td>b</td>
							<td>b</td>
						</tr>
					</tbody>
				</table>

				<blockquote className="blockquote">
					Blockquote
					<small>Small text</small>
				</blockquote>
			</section>

			<code>
				<pre>Code block</pre>
			</code>
		</div>
	);
};

export default StyleGuideComponents;
