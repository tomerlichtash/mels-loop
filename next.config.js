const path = require('path');
const nextTranslate = require('next-translate');

module.exports = {
  webpack5: true,
  compress: false,
  optimization: {
    minimizer: [],
    chunkIds: 'named',
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  ...nextTranslate(),
};
