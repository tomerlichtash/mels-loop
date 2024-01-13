import React, { useContext } from "react";
import Drawer from "react-modern-drawer";

import {
	SiteTitle,
	LocaleSelector,
	ThemeSelector,
	Logo,
} from "@components/site";
import VerticalNav from "./VerticalNav";
import { Button, Scrollbar } from "@components/ui";

import { LocaleProvider } from "locale/context/locale-context";

import { Cross2Icon } from "@radix-ui/react-icons";
import styles from "./VerticalMenu.module.scss";

type VerticalMenuProps = {
	open: boolean;
	toggle: () => void;
	isHome?: boolean;
};

const VerticalMenu = ({ toggle, open, isHome }: VerticalMenuProps) => {
	const { siteTitle, siteSubtitle, textDirection } = useContext(LocaleProvider);
	const direction = textDirection === "ltr" ? "right" : "left";

	return (
		<Drawer
			direction={direction}
			open={open}
			size={350}
			duration={300}
			overlayOpacity={0.5}
			onClose={toggle}
			className={styles.root}
		>
			<Scrollbar className={styles.root} textDirection={textDirection}>
				<Button onClick={toggle} asChild>
					<span className={styles.close}>
						<span className={styles.label}>Close</span>
						<span className={styles.icon}>
							<Cross2Icon />
						</span>
					</span>
				</Button>

				<div className={styles.header}>
					<SiteTitle
						title={siteTitle}
						subtitle={siteSubtitle}
						textDirection={textDirection}
						isHome={isHome}
						variant="centered"
					/>
					<div className={styles.strip} />
				</div>

				<div className={styles.panel}>
					<LocaleSelector />
					<ThemeSelector />
				</div>

				<VerticalNav className={styles.menu} onClose={toggle} />
			</Scrollbar>
		</Drawer>
	);
};

export default VerticalMenu;
