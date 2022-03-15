module.exports.webpackPlugin = (defaultPluginOptions) => {
	return {
		...defaultPluginOptions,
		stylableConfig(defaultStylableConfig) {
			return {
				...defaultStylableConfig,
				// Example override the namespace generation strategy
				// resolveNamespace: (ns)=> `prefix-${ns}`
			};
		},
		// Example to unsafely ignore duplicate namespace errors
		// unsafeMuteDiagnostics: {
		//   DUPLICATE_MODULE_NAMESPACE: 'warn'
		// }
	};
};
