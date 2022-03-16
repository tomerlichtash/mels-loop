import { render as testRender } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

export const render = (component, driver) => {
	const rendered = testRender(component as React.ReactElement);
	return {
		component: rendered,
		driver: driver(rendered.container as Element),
		event: userEvent,
	};
};
