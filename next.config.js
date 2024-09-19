const nextTranslate = require('next-translate-plugin');
const legacyRedirects = require('./legacy.json');
const { withAxiom } = require('next-axiom');
const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  optimizeFonts: true,
  publicRuntimeConfig: {
    basePath: process.env.BASE_PATH || '/public/',
  },
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname,
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  // https://stackoverflow.com/questions/78159947/my-previously-working-library-returns-a-weird-cannot-read-properties-of-null-re
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.resolve.alias["react"] = path.resolve("./node_modules/react");
    return config;
  },
  // webpack: (config) => {
  //   config.resolve.alias = {
  //     ...config.resolve.alias,
  //     '@melsloop/ml-components': require.resolve('@melsloop/ml-components/dist/cjs/bundle.js'),
  //   };
  //   return config;
  // },
  // experimental: { esmExternals: false },
  // experimental: {
  //   // 	serverActions: true,
  // },
  async redirects() {
    return legacyRedirects;
  },
};

module.exports = nextTranslate(nextConfig);
