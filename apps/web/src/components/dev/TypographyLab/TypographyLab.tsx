'use client';

import { useCallback, useEffect, useState } from 'react';

import { type FaceOption, HEBREW_FACES, LATIN_FACES, loadFace } from './fonts';
import styles from './TypographyLab.module.css';

/**
 * A typography workbench, for development only.
 *
 * Everything on this site is set from tokens, so a face or a measure can be
 * changed in one line — but judging that change means editing a stylesheet,
 * rebuilding, reloading and remembering what the previous one looked like.
 * This drives the same tokens live, on the real pages, in whichever locale is
 * open, so the comparison is between two settings of the actual text rather
 * than between a specimen and a memory.
 *
 * It writes to the document and nothing else. Nothing here is persisted to the
 * repo: when a setting wins, Copy CSS prints the token declarations to paste
 * into the stylesheets, and the panel is emptied by Reset.
 */

interface Settings {
	latin: string;
	hebrew: string;
	/** Body size in rem, the step the prose renders at. */
	size: number;
	/** Measure in ch. */
	measure: number;
	leading: number;
	/** Weight for glossary terms and annotations. */
	termWeight: number;
	/** Weight for quoted paragraphs. */
	quoteWeight: number;
}

const DEFAULTS: Settings = {
	latin: 'Roboto Slab (current)',
	hebrew: 'Heebo (current)',
	size: 1,
	measure: 67,
	leading: 1.65,
	termWeight: 500,
	quoteWeight: 500,
};

const STORAGE_KEY = 'mels-loop:typography-lab';

function findFace(faces: FaceOption[], label: string): FaceOption {
	return faces.find((f) => f.label === label) ?? faces[0];
}

/** The families live on <body>; everything else is a :root token. */
const BODY_PROPS = ['--font-roboto-slab', '--font-hebrew'];
const ROOT_PROPS = [
	'--ml-font-latin',
	'--ml-font-hebrew',
	'--ml-font-size-md',
	'--ml-prose-measure',
	'--ml-prose-line-height',
	'--ml-term-font-weight',
	'--ml-quote-font-weight',
];

function clearOverrides(): void {
	for (const prop of BODY_PROPS) document.body.style.removeProperty(prop);
	for (const prop of ROOT_PROPS) {
		document.documentElement.style.removeProperty(prop);
	}
}

export function TypographyLab() {
	const [open, setOpen] = useState(false);
	const [settings, setSettings] = useState<Settings>(DEFAULTS);
	const [copied, setCopied] = useState(false);

	/* Survives the reload that changing a font often prompts. */
	useEffect(() => {
		const saved = window.localStorage.getItem(STORAGE_KEY);
		if (saved) {
			try {
				setSettings({ ...DEFAULTS, ...JSON.parse(saved) });
			} catch {
				/* a malformed entry is not worth reporting; the defaults stand */
			}
		}
	}, []);

	useEffect(() => {
		/*
		 * At the defaults the lab writes nothing at all, rather than writing the
		 * defaults out. Otherwise a panel left open pins the page to whatever
		 * the tokens happened to say the day it was last touched, and a real
		 * change to the stylesheet would appear to have no effect.
		 */
		if (
			(Object.keys(DEFAULTS) as (keyof Settings)[]).every(
				(k) => settings[k] === DEFAULTS[k],
			)
		) {
			clearOverrides();
			window.localStorage.removeItem(STORAGE_KEY);
			return;
		}

		const latin = findFace(LATIN_FACES, settings.latin);
		const hebrew = findFace(HEBREW_FACES, settings.hebrew);
		loadFace(latin.family);
		loadFace(hebrew.family);

		/*
		 * The family overrides go on <body>, not <html>. next/font declares
		 * --font-roboto-slab and --font-hebrew via a class on the body
		 * element, and globals.css reads those in preference to the token, so
		 * a value inherited from above would lose to them. The rest are plain
		 * :root tokens.
		 */
		const body = document.body.style;
		body.setProperty('--font-roboto-slab', latin.stack);
		body.setProperty('--font-hebrew', hebrew.stack);

		const root = document.documentElement.style;
		root.setProperty('--ml-font-latin', latin.stack);
		root.setProperty('--ml-font-hebrew', hebrew.stack);
		root.setProperty('--ml-font-size-md', `${settings.size}rem`);
		root.setProperty('--ml-prose-measure', `${settings.measure}ch`);
		root.setProperty('--ml-prose-line-height', String(settings.leading));
		root.setProperty('--ml-term-font-weight', String(settings.termWeight));
		root.setProperty('--ml-quote-font-weight', String(settings.quoteWeight));

		window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
		setCopied(false);
	}, [settings]);

	/* Returning to the defaults is all it takes — the effect clears the
	 * overrides rather than rewriting them. */
	const reset = useCallback(() => setSettings(DEFAULTS), []);

	const copy = useCallback(() => {
		const latin = findFace(LATIN_FACES, settings.latin);
		const hebrew = findFace(HEBREW_FACES, settings.hebrew);
		const lines = [
			'/* packages/ui/src/styles/tokens/base/typography.css */',
			`--ml-font-latin: ${latin.stack};`,
			`--ml-font-hebrew: ${hebrew.stack};`,
			`--ml-font-size-md: ${settings.size}rem;`,
			'',
			'/* apps/web/src/styles/layout.css */',
			`--ml-prose-measure: ${settings.measure}ch;`,
			`--ml-prose-line-height: ${settings.leading};`,
			`--ml-term-font-weight: ${settings.termWeight};`,
			`--ml-quote-font-weight: ${settings.quoteWeight};`,
		];
		if (latin.family || hebrew.family) {
			lines.push(
				'',
				'/* apps/web/src/fonts.ts — a face has to be loaded there too,',
				'   or the token falls through to the bundled one. */',
			);
		}
		void navigator.clipboard.writeText(lines.join('\n'));
		setCopied(true);
	}, [settings]);

	const set = <K extends keyof Settings>(key: K, value: Settings[K]) =>
		setSettings((prev) => ({ ...prev, [key]: value }));

	const latinNote = findFace(LATIN_FACES, settings.latin).note;
	const hebrewNote = findFace(HEBREW_FACES, settings.hebrew).note;

	if (!open) {
		return (
			<button
				type="button"
				className={styles.handle}
				onClick={() => setOpen(true)}
				aria-label="Open typography lab"
			>
				Aa
			</button>
		);
	}

	return (
		<aside className={styles.panel} aria-label="Typography lab">
			<header className={styles.header}>
				<h2 className={styles.title}>Typography</h2>
				<button
					type="button"
					className={styles.close}
					onClick={() => setOpen(false)}
					aria-label="Close typography lab"
				>
					×
				</button>
			</header>

			<label className={styles.field}>
				<span className={styles.label}>Latin</span>
				<select
					className={styles.select}
					value={settings.latin}
					onChange={(e) => set('latin', e.target.value)}
				>
					{LATIN_FACES.map((f) => (
						<option key={f.label} value={f.label}>
							{f.label}
						</option>
					))}
				</select>
			</label>
			<p className={styles.note}>{latinNote}</p>

			<label className={styles.field}>
				<span className={styles.label}>Hebrew</span>
				<select
					className={styles.select}
					value={settings.hebrew}
					onChange={(e) => set('hebrew', e.target.value)}
				>
					{HEBREW_FACES.map((f) => (
						<option key={f.label} value={f.label}>
							{f.label}
						</option>
					))}
				</select>
			</label>
			<p className={styles.note}>{hebrewNote}</p>

			<label className={styles.field}>
				<span className={styles.label}>Body</span>
				<input
					className={styles.range}
					type="range"
					min={0.85}
					max={1.3}
					step={0.01}
					value={settings.size}
					onChange={(e) => set('size', Number(e.target.value))}
				/>
				<output className={styles.value}>{settings.size.toFixed(2)}rem</output>
			</label>

			<label className={styles.field}>
				<span className={styles.label}>Measure</span>
				<input
					className={styles.range}
					type="range"
					min={45}
					max={95}
					step={1}
					value={settings.measure}
					onChange={(e) => set('measure', Number(e.target.value))}
				/>
				<output className={styles.value}>{settings.measure}ch</output>
			</label>

			<label className={styles.field}>
				<span className={styles.label}>Leading</span>
				<input
					className={styles.range}
					type="range"
					min={1.2}
					max={2}
					step={0.01}
					value={settings.leading}
					onChange={(e) => set('leading', Number(e.target.value))}
				/>
				<output className={styles.value}>{settings.leading.toFixed(2)}</output>
			</label>

			<label className={styles.field}>
				<span className={styles.label}>Terms</span>
				<input
					className={styles.range}
					type="range"
					min={400}
					max={700}
					step={100}
					value={settings.termWeight}
					onChange={(e) => set('termWeight', Number(e.target.value))}
				/>
				<output className={styles.value}>{settings.termWeight}</output>
			</label>

			<label className={styles.field}>
				<span className={styles.label}>Quotes</span>
				<input
					className={styles.range}
					type="range"
					min={400}
					max={700}
					step={100}
					value={settings.quoteWeight}
					onChange={(e) => set('quoteWeight', Number(e.target.value))}
				/>
				<output className={styles.value}>{settings.quoteWeight}</output>
			</label>

			<footer className={styles.footer}>
				<button type="button" className={styles.button} onClick={reset}>
					Reset
				</button>
				<button type="button" className={styles.button} onClick={copy}>
					{copied ? 'Copied' : 'Copy CSS'}
				</button>
			</footer>
		</aside>
	);
}
