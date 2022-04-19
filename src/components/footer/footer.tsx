import React, { useContext } from "react";
import { ReactLayoutContext } from "../../contexts/layout-context";
import { ComponentProps } from "../../interfaces/models";
import { Button } from "../ui";
import {
	InfoCircledIcon,
	EnvelopeClosedIcon,
	GitHubLogoIcon,
	TwitterLogoIcon,
} from "@radix-ui/react-icons";
import { st, classes } from "./footer.st.css";

export const Footer = ({
	compKeys,
	className,
}: ComponentProps): JSX.Element => {
	const layoutContext = useContext(ReactLayoutContext);
	const { translate } = layoutContext;
	const licenseYears = `${new Date().getFullYear()}`;
	const { siteTitle, siteLicense } = compKeys;
	return (
		<footer className={st(classes.root, className)}>
			<div className={classes.strip}></div>
			<div className={classes.pageContainer}>
				<div className={classes.layout}>
					<div className={st(classes.column, { size: 3 })}>
						<div className={classes.title}>
							<time className={classes.year}>{licenseYears}</time>{" "}
							<span className={classes.license}>
								({translate(siteLicense)})
							</span>{" "}
							<span className={classes.title}>{translate(siteTitle)}</span>
						</div>

						<div className={classes.subtitle}>
							<p>A Comprehensive Guide to The Story of Mel</p>
						</div>

						<div className={classes.excerpt}>
							<p>
								Mel’s Loop is a guide the epic hacker folklore tale The Story of
								Mel. It also aims to collect the stories and of sub-stories
								around the story, its author, and its main charachters, early
								computing era stories and other related tales. The project is
								designed as an anthology of stories, annotations, poems and
								relics in the Hacker Folklore genre.
							</p>
						</div>
					</div>
					<div className={st(classes.column, { size: 1 })}>
						<div className={classes.sitePages}>
							<ul>
								<li>
									<InfoCircledIcon />
									<Button link="/about" label="About" />
								</li>
								<li>
									<Button link="/posts" label="Blog" />
								</li>
							</ul>
						</div>
					</div>
					<div className={st(classes.column, { size: 1 })}>
						<ul className={classes.social}>
							<li className={classes.item}>
								<GitHubLogoIcon />
								<Button
									target="_blank"
									link="https://github.com/tomerlichtash/mels-loop-nextjs"
									label="Github"
									className={classes.button}
								/>
							</li>
							<li>
								<TwitterLogoIcon scale={230} />
								<Button
									target="_blank"
									link="https://twitter.com/aboutmelsloop"
									label="@aboutmelsloop"
								/>
							</li>
							<li>
								<EnvelopeClosedIcon />
								<Button link="/contact" label="Contact" />
							</li>
						</ul>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
