/** A unified plugin with optional options, for config-driven pipeline composition. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PluginSpec = [plugin: any, ...options: any[]];

export interface MarkdownProcessOptions {
	/** Remark plugins inserted after GFM, before the remark→rehype bridge. */
	remarkPlugins?: PluginSpec[];
	/** Rehype plugins appended after rehype-raw. */
	rehypePlugins?: PluginSpec[];
	/**
	 * Transforms applied to the raw markdown before it is parsed.
	 *
	 * For expansions that cannot survive parsing — anything whose syntax a
	 * parser extension would claim first. Everything else belongs in a plugin,
	 * where it can see structure rather than guess at it from a string.
	 */
	preprocess?: ((content: string) => string)[];
}
