import React, { useContext } from "react";
import { ReactLocaleContext } from "../../contexts/locale-context";
import { ComponentProps } from "../../interfaces/models";
import { Button } from "../ui";
import { st, classes } from "./footer.st.css";

export const Footer = ({
	compKeys,
	className,
}: ComponentProps): JSX.Element => {
	const { translate } = useContext(ReactLocaleContext);
	const licenseYears = `2021-${new Date().getFullYear()}`;
	const { siteTitle, siteLicense } = compKeys;
	return (
		<footer className={st(classes.root, className)}>
			<div className={classes.license}>
				<time className={classes.year}>{licenseYears}</time>{" "}
				<span className={classes.license}>({translate(siteLicense)})</span>{" "}
				<span className={classes.title}>{translate(siteTitle)}</span>
			</div>
			<div>
				<ul>
					<li>
						<Button link="/about" label="About" />
					</li>
					<li>
						<Button link="/posts" label="Blog" />
					</li>
					<li>
						<Button
							target="_blank"
							link="https://github.com/tomerlichtash/mels-loop-nextjs"
							label="Github"
						/>
					</li>
					<li>
						<Button
							target="_blank"
							link="https://twitter.com/aboutmelsloop"
							label="Twitter"
						/>
					</li>
					<li>
						<Button link="/contact" label="Contact" />
					</li>
				</ul>
			</div>
		</footer>
	);
};

export default Footer;
