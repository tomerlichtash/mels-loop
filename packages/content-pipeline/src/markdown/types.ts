/** A unified plugin with optional options, for config-driven pipeline composition. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PluginSpec = [plugin: any, ...options: any[]];

export interface MarkdownProcessOptions {
	/** Remark plugins inserted after GFM, before the remark→rehype bridge. */
	remarkPlugins?: PluginSpec[];
	/** Rehype plugins appended after rehype-raw. */
	rehypePlugins?: PluginSpec[];
}
