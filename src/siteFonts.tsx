import { flattenArray, unique } from 'utils/index';
import { default as siteFontData } from 'config/siteFonts.json' assert { type: 'json' };

const fontBasePath = '/assets/fonts';

type IFontFace = {
	id: string;
};

interface IFontFaceLink extends IFontFace {
	href: string;
	format: string;
}

interface IFontFaceDecl extends IFontFaceLink {
	name: string;
	weight: number;
}

const FontFaceLink = ({ id, href, format }: IFontFaceLink) => (
	<link
		key={unique.id()}
		rel="preload"
		href={`${fontBasePath}/${id}/${href}`}
		as="font"
		type={`font/${format}`}
		crossOrigin="anonymous"
	/>
);

const FontFaceDecl = ({ name, id, href, weight, format }: IFontFaceDecl) => {
	const fontFaceProps = [
		['font-family', `"${name}"`],
		['src', `url("${fontBasePath}/${id}/${href}") format("${format}")`],
		['font-weight', weight],
		['font-display', 'swap'],
	];
	return `@font-face{${fontFaceProps
		.map((keyVal) => `${keyVal[0]}: ${keyVal[1]};`)
		.join('')}}`;
};

export const fontFaceDecls = siteFontData
	.map(({ id, name, family }) => {
		return family
			.map(({ weight, format, href }) =>
				FontFaceDecl({ name, id, href, weight, format })
			)
			.join('');
	})
	.join('');

export const fontFaceLinks = flattenArray(
	siteFontData.map(({ id, family }) =>
		family.map(({ href, format }) => FontFaceLink({ id, href, format }))
	)
);
