/**
 * Candidate faces for the typography lab.
 *
 * The Hebrew list is the constraint, not the Latin one. A face has to carry a
 * real Hebrew design — not a Latin family with Hebrew bolted on — and the set
 * that does is small. Each entry names the weights worth loading; the lab
 * fetches them from Google Fonts on demand, which is why this is a dev-only
 * component.
 *
 * `stack` is what gets written into the CSS variable, fallback included.
 */
export interface FaceOption {
	/** Google Fonts family name, or null for the face already bundled. */
	family: string | null;
	label: string;
	stack: string;
	/** A word on how it behaves, shown under the control. */
	note: string;
}

const WEIGHTS = '300;400;500;600;700';

const google = (family: string, stack: string, note: string): FaceOption => ({
	family,
	label: family,
	stack,
	note,
});

/**
 * Latin. The site is currently set in a slab serif, which is doing a lot of
 * the archive's character; the alternatives are chosen to test that rather
 * than to agree with it — two slabs, three text serifs built for long reading,
 * one transitional, one sans.
 */
export const LATIN_FACES: FaceOption[] = [
	{
		family: null,
		label: 'Roboto Slab (current)',
		stack: "'Roboto Slab', serif",
		note: 'Slab serif. Heavy stems before any weight is added — the reason <strong> is set at 600 rather than 700.',
	},
	google(
		'Roboto',
		"'Roboto', sans-serif",
		"Heebo's own Latin — the two are one design across two scripts. The most literal pairing available, at the cost of the archive's editorial character.",
	),
	google(
		'Roboto Serif',
		"'Roboto Serif', serif",
		'Same superfamily, a text serif rather than a slab. Keeps the shared skeleton while reading less mechanical than Roboto Slab.',
	),
	google(
		'Zilla Slab',
		"'Zilla Slab', serif",
		'The other slab worth trying: narrower than Roboto Slab, so more characters fit the same measure.',
	),
	google(
		'Literata',
		"'Literata', serif",
		'Built for long-form reading on screen. Larger x-height, so it holds up a step smaller.',
	),
	google(
		'Source Serif 4',
		"'Source Serif 4', serif",
		'Quieter than a slab. Leaves emphasis and links to do the marking rather than the body texture.',
	),
	google(
		'Spectral',
		"'Spectral', serif",
		'Low contrast, generous spacing. Suits justified setting — fewer awkward gaps.',
	),
	google(
		'EB Garamond',
		"'EB Garamond', serif",
		'Old-style. Historically wrong for 1983 computing, which may be exactly the tension worth seeing.',
	),
	google(
		'IBM Plex Sans',
		"'IBM Plex Sans', sans-serif",
		'A sans, for contrast — and the closest thing here to the terminals the story is about.',
	),
];

/**
 * Hebrew. Assistant is a humanist sans; the interesting question is whether a
 * Hebrew serif sits better beside a Latin serif, since the two locales
 * currently disagree about what kind of text this is.
 */
export const HEBREW_FACES: FaceOption[] = [
	{
		family: null,
		label: 'Heebo (current)',
		stack: "'Heebo', sans-serif",
		note: "Roboto's Hebrew companion — shares its skeleton with Roboto Slab, so the two scripts are related rather than merely adjacent.",
	},
	google(
		'Assistant',
		"'Assistant', sans-serif",
		'The previous face. Humanist sans; its Medium sits very close to Regular, which is why terms needed 600 in Hebrew.',
	),
	google(
		'Frank Ruhl Libre',
		"'Frank Ruhl Libre', serif",
		'The classic Hebrew book serif. Pairs with a Latin serif in a way Assistant cannot.',
	),
	google(
		'Noto Serif Hebrew',
		"'Noto Serif Hebrew', serif",
		'A serif with a full weight range, which Frank Ruhl historically lacked.',
	),
	google(
		'David Libre',
		"'David Libre', serif",
		'Israeli mid-century. Period-appropriate for a text about the same decades.',
	),
	google(
		'Rubik',
		"'Rubik', sans-serif",
		'Rounder, more contemporary. Reads younger than the archive probably wants.',
	),
	google(
		'IBM Plex Sans Hebrew',
		"'IBM Plex Sans Hebrew', sans-serif",
		'The Hebrew companion to IBM Plex Sans — the one pair here designed together.',
	),
];

/** Injects a Google Fonts stylesheet once per family. */
export function loadFace(family: string | null): void {
	if (!family || typeof document === 'undefined') return;
	const id = `typography-lab-${family.replace(/\s+/g, '-').toLowerCase()}`;
	if (document.getElementById(id)) return;

	const link = document.createElement('link');
	link.id = id;
	link.rel = 'stylesheet';
	link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(
		family,
	).replace(/%20/g, '+')}:wght@${WEIGHTS}&display=swap`;
	document.head.appendChild(link);
}
