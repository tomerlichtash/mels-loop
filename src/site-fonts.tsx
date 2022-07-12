export interface IFontFace {
	id: string;
}

export interface IFontFaceLink extends IFontFace {
	href: string;
	format: string;
}

export interface IFontFaceDecl extends IFontFaceLink {
	name: string;
	weight: number;
}

const fontBasePath = "/assets/fonts"; // e.g. /public/assets/fonts

function flatten(arr) {
	return arr.reduce(function (flat, toFlatten) {
		return flat.concat(
			Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten
		);
	}, []);
}

const fontTypes = [
	{
		id: "roboto-slab",
		name: "Roboto Slab",
		family: [
			{
				weight: 300,
				format: "woff2",
				href: `RobotoSlab-Regular.woff2`,
			},
			{
				weight: 500,
				format: "woff2",
				href: "RobotoSlab-Medium.woff2",
			},
			{
				weight: 700,
				format: "woff2",
				href: "RobotoSlab-Bold.woff2",
			},
		],
	},
	{
		id: "assistant",
		name: "Assistant",
		family: [
			{
				weight: 300,
				format: "woff2",
				href: "Assistant-Regular.woff2",
			},
			{
				weight: 500,
				format: "woff2",
				href: "Assistant-SemiBold.woff2",
			},
			{
				weight: 700,
				format: "woff2",
				href: "Assistant-Bold.woff2",
			},
		],
	},
];

const FontFaceDecl = ({ name, id, href, weight, format }: IFontFaceDecl) => {
	const props = [
		["font-family", `"${name}"`],
		["src", `url("${fontBasePath}/${id}/${href}") format("${format}")`],
		["font-weight", weight],
		["font-display", "swap"],
	];
	return `@font-face{${props
		.map((couple) => `${couple[0]}: ${couple[1]};`)
		.join("")}}`;
};

const FontFaceLink = ({ id, href, format }: IFontFaceLink) => {
	return (
		<link
			rel="preload"
			href={`${fontBasePath}/${id}/${href}`}
			as="font"
			type={`font/${format}`}
			crossOrigin="anonymous"
		/>
	);
};

export const fontFacesDecls = fontTypes
	.map(({ id, name, family }) => {
		return family
			.map(({ weight, format, href }) => {
				return FontFaceDecl({ name, id, href, weight, format });
			})
			.join("");
	})
	.join("");

export const fontFacesLinks = flatten(
	fontTypes.map(({ id, family }) => {
		return family.map(({ href, format }) => {
			return FontFaceLink({ id, href, format });
		});
	})
);
