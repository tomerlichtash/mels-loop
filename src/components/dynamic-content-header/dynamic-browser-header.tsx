import React, { useContext, useEffect, useState } from "react";
import { IParsedPageData } from "../../interfaces/models";
import { classes } from "./dynamic-browser-header.st.css";
import { mlUtils } from "../../lib/ml-utils";
import { ReactLayoutContext } from "../../contexts/layout-context";
import { ReactDynamicContentContext } from "../../contexts/dynamic-content-context";
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

export interface IBrowserHeaderProps {
	pages: IParsedPageData[];
}

enum MenuStates { None, Open, Close };

export default function DynamicBrowserHeader({ pages }: IBrowserHeaderProps): JSX.Element {
	if (!pages || pages.length < 2) {
		return (<></>);
	}
	const [menuTimeout, setMenuTimeout] = useState(0);
	const [isMenuOpen, setMenuOpen] = useState(false);
	const [menuState, setMenuState] = useState(MenuStates.None);
	const layoutCtx = useContext(ReactLayoutContext);
	const dcCtx = useContext(ReactDynamicContentContext);

	// on mouse down in the navigation arrow, start a timer to pop up the navigation menu
	const onMouseDown = () => {
		setMenuTimeout(window.setTimeout(() => {
			setMenuState(MenuStates.Open);
		}, 500))
	};
	const onMouseUp = () => {
		setMenuState(MenuStates.Close);
	};

	useEffect(() => {
		let changed = false;
		let targetPage = -1;
		switch (menuState) {
			case MenuStates.None:
			case MenuStates.Close:
				if (isMenuOpen) {
					changed = true;
					setMenuOpen(false);
				}
				else if (menuState === MenuStates.Close) {
					targetPage = pages.length - 2;
				}
				setMenuState(MenuStates.None);
				break;
			case MenuStates.Open:
				if (!isMenuOpen) {
					changed = true;
					setMenuOpen(true);
				}
				break;
		}
		if (changed && menuTimeout) {
			clearTimeout(menuTimeout);
			setMenuTimeout(0);
		}
		if (targetPage >= 0) {
			dcCtx.setPageIndex(targetPage);
		}
		return () => window.clearTimeout(menuTimeout); // harmless if menuTimeout is 0
	}, [menuState, isMenuOpen, menuTimeout])

	return (
		<div className={classes.header}>
			<span
				className={classes.backIndicator}
				onMouseDown={onMouseDown}
				onMouseUp={onMouseUp}>
				<img src="/assets/long-arrow-alt-left-solid.png" />
			</span>
			<DropdownMenu.Root open={isMenuOpen}>
				<DropdownMenu.Trigger><span></span></DropdownMenu.Trigger>
				<DropdownMenu.Content 
					side="left" align="center" sideOffset={25} onInteractOutside={()=>setMenuState(MenuStates.Close)}>
					<div className={classes.linksContainer}>
					{
						// Map each page to a menuitem with a title
						pages.map((page, index) => {
							const isLast = index === dcCtx.pageIndex;
							// do nothing if this item points to the current page
							const setIndex = isLast ? 
								() => void 0 
								: () => {
									setMenuState(MenuStates.Close);
									dcCtx.setPageIndex(index)
								};
							return (
								<>
								{/* The last page is not navigable*/}
								{isLast && (
									<DropdownMenu.Separator key={mlUtils.uniqueId()}>
										<span className={classes.linkSeparator}></span>
									</DropdownMenu.Separator>
								)}
								<DropdownMenu.Item key={mlUtils.uniqueId()}
									onSelect={setIndex}>
									<span className={classes.itemLink} data-disabled={String(isLast)}
										onMouseUp={setIndex}>{page.metaData.title || layoutCtx.translate(page.metaData.glossary_key) || page.id}
									</span>
								</DropdownMenu.Item>
								</>
							)
						})
					}
					</div>
				</DropdownMenu.Content>
			</DropdownMenu.Root>

		</div>
	);
}
