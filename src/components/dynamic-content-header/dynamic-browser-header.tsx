import React, { useContext, useEffect, useState } from "react";
import { IParsedPageData } from "../../interfaces/models";
import { classes } from "./dynamic-browser-header.st.css";
import { mlUtils } from "../../lib/ml-utils";
import { ReactLayoutContext } from "../../contexts/layout-context";
import { ReactDynamicContentContext } from "../../contexts/dynamic-content-context";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ReactPopoverContext } from "../../contexts/popover-context";

/* eslint-disable */
export interface IBrowserHeaderProps {
	pages: IParsedPageData[];
}

enum MenuStates {
	None,
	Open,
	Close,
}

const NAV_BUTTON_KEY = "header-back";
export default function DynamicBrowserHeader({
	pages,
}: IBrowserHeaderProps): JSX.Element {
	const [menuTimeout, setMenuTimeout] = useState(0);
	const [isMenuOpen, setMenuOpen] = useState(false);
	const [menuState, setMenuState] = useState(MenuStates.None);
	const [prevPageCount, setPrevPageCount] = useState(0);
	const { translate, locale, localeInfo } = useContext(ReactLayoutContext);
	const dcCtx = useContext(ReactDynamicContentContext);
	const popoverCtx = useContext(ReactPopoverContext);

	// on mouse down in the navigation arrow, start a timer to pop up the navigation menu
	const onMouseDown = () => {
		//console.log("mouse down");
		setMenuTimeout(
			window.setTimeout(() => {
				//console.log("setting menu state to open")
				setMenuState(MenuStates.Open);
			}, 500)
		);
	};
	const onMouseUp = () => {
		//console.log("mouse up");
		setMenuState(MenuStates.Close);
	};

	useEffect(() => {
		//console.log("useeffect for toolbar, pages", pages.length, "toolbar:", toolbar)
		if (pages.length === prevPageCount) {
			//console.log("page count hasn't change", prevPageCount);
			return;
		}
		//console.log("page count changed");
		setPrevPageCount(pages.length)
		if (pages.length === 0) {
			popoverCtx.removeToolbarItems(NAV_BUTTON_KEY);
			return;
		}
		popoverCtx.addToolbarItems({
			element: (
				<div className={classes.header} key={mlUtils.uniqueId(NAV_BUTTON_KEY)}>
				<span
					className={classes.backIndicator}
					onMouseDown={onMouseDown}
					onMouseUp={onMouseUp}
				>
					{locale === "en" ? <ArrowLeftIcon /> : <ArrowRightIcon />}
				</span>
				<DropdownMenu.Root open={isMenuOpen}>
					<DropdownMenu.Trigger>
						<span></span>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content
						side={localeInfo.left}
						align="center"
						sideOffset={25}
						onInteractOutside={() => setMenuState(MenuStates.Close)}
					>
						<div className={classes.linksContainer}>
							{
								// Map each page to a menuitem with a title
								pages.map((page, index) => {
									const isLast = index === dcCtx.pageIndex;
									// do nothing if this item points to the current page
									const setIndex = isLast
										? () => void 0
										: () => {
												setMenuState(MenuStates.Close);
												dcCtx.setPageIndex(index);
											};
									return (
											<DropdownMenu.Item
												key={mlUtils.uniqueId()}
												onSelect={setIndex}
											>
												<span
													className={classes.itemLink}
													data-disabled={String(isLast)}
													onMouseUp={setIndex}
													key={mlUtils.uniqueId()}
												>
													{page.metaData.title ||
														translate(page.metaData.glossary_key) ||
														page.id}
												</span>
											</DropdownMenu.Item>
									);
								})
							}
						</div>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			</div>
				),
			id: NAV_BUTTON_KEY,
			enabled: true,
		})
	}, [toolbar, pages, prevPageCount, dcCtx])

	useEffect(() => {
		let changed = false;
		let targetPage = -1;
		switch (menuState) {
			case MenuStates.None:
			case MenuStates.Close:
				if (isMenuOpen) {
					changed = true;
					setMenuOpen(false);
				} else if (menuState === MenuStates.Close) {
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
	}, [menuState, isMenuOpen, menuTimeout, pages, dcCtx]);

	if (!pages || pages.length < 100) {
		return <></>;
	}

	return (
		<div className={classes.header}>
			<span
				className={classes.backIndicator}
				onMouseDown={onMouseDown}
				onMouseUp={onMouseUp}
			>
				{locale === "en" ? <ArrowLeftIcon /> : <ArrowRightIcon />}
			</span>
			<DropdownMenu.Root open={isMenuOpen}>
				<DropdownMenu.Trigger>
					<span></span>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content
					side={localeInfo.left}
					align="center"
					sideOffset={25}
					onInteractOutside={() => setMenuState(MenuStates.Close)}
				>
					<div className={classes.linksContainer}>
						{
							// Map each page to a menuitem with a title
							pages.map((page, index) => {
								const isLast = index === dcCtx.pageIndex;
								// do nothing if this item points to the current page
								const setIndex = isLast
									? () => void 0
									: () => {
											setMenuState(MenuStates.Close);
											dcCtx.setPageIndex(index);
									  };
								return (
										<DropdownMenu.Item
											key={mlUtils.uniqueId()}
											onSelect={setIndex}
										>
											<span
												className={classes.itemLink}
												data-disabled={String(isLast)}
												onMouseUp={setIndex}
												key={mlUtils.uniqueId()}
											>
												{page.metaData.title ||
													translate(page.metaData.glossary_key) ||
													page.id}
											</span>
										</DropdownMenu.Item>
								);
							})
						}
					</div>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</div>
	);
}
