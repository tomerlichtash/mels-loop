import React, { useContext } from "react";
import { ReactLayoutContext } from "../../contexts/layout-context";
import { v4 as uuidv4 } from "uuid";
import {
	NavigationMenu,
	NavigationMenuList,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuContent,
	NavigationMenuViewport,
	ViewportPosition,
	StyledIndicator,
	StyledTrigger,
	StyledArrow,
	StyledCaret,
	ContentList,
	ListItem,
	LinkTitle,
	LinkText,
	navMenuLinkStyle,
} from "./styled-primitives";

type GroupLayoutType = "one" | "two";
export interface MenuItem {
	type: string;
	title: string;
	description: string;
	url: string;
}

export interface MenuGroup {
	title: string;
	layout: string;
	content: MenuItem[];
}

interface NavMenuProps {
	items: MenuGroup[];
}

export const NavMenu = ({ items }: NavMenuProps) => {
	const { translate } = useContext(ReactLayoutContext);

	const listItem = (item) => (
		<ListItem key={uuidv4()}>
			<NavigationMenuLink css={navMenuLinkStyle} href={item.url}>
				<LinkTitle>{translate(item.title as string)}</LinkTitle>
				<LinkText>{item.description}</LinkText>
			</NavigationMenuLink>
		</ListItem>
	);

	const menuItem = (group) => (
		<NavigationMenuItem key={uuidv4()}>
			<StyledTrigger>
				{group.title}
				<StyledCaret aria-hidden />
			</StyledTrigger>
			<NavigationMenuContent>
				<ContentList layout={group.layout as GroupLayoutType}>
					{group.content.map(listItem)}
				</ContentList>
			</NavigationMenuContent>
		</NavigationMenuItem>
	);

	return (
		<NavigationMenu>
			<NavigationMenuList style={{ padding: 0 }}>
				{items.map(menuItem)}
				<StyledIndicator>
					<StyledArrow />
				</StyledIndicator>
			</NavigationMenuList>
			<ViewportPosition>
				<NavigationMenuViewport />
			</ViewportPosition>
		</NavigationMenu>
	);
};

export default NavMenu;

{
	/* <NavigationMenuItem>
					<StyledTrigger>
						Articles
						<StyledCaret aria-hidden />
					</StyledTrigger>
					<NavigationMenuContent>
						<ContentList layout="one">
							<ListItem>
								<NavigationMenuLink
									css={navMenuLinkStyle}
									href="http://melsloop.com"
								>
									<LinkTitle>Item 1</LinkTitle>
									<LinkText>
										CSS-in-JS with best-in-class developer experience.
									</LinkText>
								</NavigationMenuLink>
							</ListItem>
							<ListItem>
								<NavigationMenuLink
									css={navMenuLinkStyle}
									href="http://melsloop.com"
								>
									<LinkTitle>Item 2</LinkTitle>
									<LinkText>
										CSS-in-JS with best-in-class developer experience.
									</LinkText>
								</NavigationMenuLink>
							</ListItem>
							<ListItem>
								<NavigationMenuLink
									css={navMenuLinkStyle}
									href="http://melsloop.com"
								>
									<LinkTitle>Item 3</LinkTitle>
									<LinkText>
										CSS-in-JS with best-in-class developer experience.
									</LinkText>
								</NavigationMenuLink>
							</ListItem>
							<ListItem>
								<NavigationMenuLink
									css={navMenuLinkStyle}
									href="http://melsloop.com"
								>
									<LinkTitle>Item 4</LinkTitle>
									<LinkText>
										CSS-in-JS with best-in-class developer experience.
									</LinkText>
								</NavigationMenuLink>
							</ListItem>
						</ContentList>
					</NavigationMenuContent>
				</NavigationMenuItem>

				<NavigationMenuItem>
					<StyledTrigger>
						Resources
						<StyledCaret aria-hidden />
					</StyledTrigger>
					<NavigationMenuContent>
						<ContentList layout="two">
							<ListItem>
								<NavigationMenuLink
									css={navMenuLinkStyle}
									href="http://melsloop.com"
								>
									<LinkTitle>Item 1</LinkTitle>
									<LinkText>
										CSS-in-JS with best-in-class developer experience.
									</LinkText>
								</NavigationMenuLink>
							</ListItem>
							<ListItem>
								<NavigationMenuLink
									css={navMenuLinkStyle}
									href="http://melsloop.com"
								>
									<LinkTitle>Item 2</LinkTitle>
									<LinkText>
										CSS-in-JS with best-in-class developer experience.
									</LinkText>
								</NavigationMenuLink>
							</ListItem>
							<ListItem>
								<NavigationMenuLink
									css={navMenuLinkStyle}
									href="http://melsloop.com"
								>
									<LinkTitle>Item 3</LinkTitle>
									<LinkText>
										CSS-in-JS with best-in-class developer experience.
									</LinkText>
								</NavigationMenuLink>
							</ListItem>
							<ListItem>
								<NavigationMenuLink
									css={navMenuLinkStyle}
									href="http://melsloop.com"
								>
									<LinkTitle>Item 4</LinkTitle>
									<LinkText>
										CSS-in-JS with best-in-class developer experience.
									</LinkText>
								</NavigationMenuLink>
							</ListItem>
						</ContentList>
					</NavigationMenuContent>
				</NavigationMenuItem>

				<NavigationMenuItem>
					<StyledTrigger>
						About
						<StyledCaret aria-hidden />
					</StyledTrigger>
					<NavigationMenuContent>
						<ContentList layout="two">
							<ListItem>
								<NavigationMenuLink
									css={navMenuLinkStyle}
									href="http://melsloop.com"
								>
									<LinkTitle>Item 1</LinkTitle>
									<LinkText>
										CSS-in-JS with best-in-class developer experience.
									</LinkText>
								</NavigationMenuLink>
							</ListItem>
							<ListItem>
								<NavigationMenuLink
									css={navMenuLinkStyle}
									href="http://melsloop.com"
								>
									<LinkTitle>Item 2</LinkTitle>
									<LinkText>
										CSS-in-JS with best-in-class developer experience.
									</LinkText>
								</NavigationMenuLink>
							</ListItem>
							<ListItem>
								<NavigationMenuLink
									css={navMenuLinkStyle}
									href="http://melsloop.com"
								>
									<LinkTitle>Item 3</LinkTitle>
									<LinkText>
										CSS-in-JS with best-in-class developer experience.
									</LinkText>
								</NavigationMenuLink>
							</ListItem>
							<ListItem>
								<NavigationMenuLink
									css={navMenuLinkStyle}
									href="http://melsloop.com"
								>
									<LinkTitle>Item 4</LinkTitle>
									<LinkText>
										CSS-in-JS with best-in-class developer experience.
									</LinkText>
								</NavigationMenuLink>
							</ListItem>
						</ContentList>
					</NavigationMenuContent>
				</NavigationMenuItem> */
}
