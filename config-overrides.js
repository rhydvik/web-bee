// eslint-disable-next-line
const {override, fixBabelImports, useEslintRc, addLessLoader} = require('customize-cra');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  // overrides for ant.design
  addLessLoader({
    javascriptEnabled: true,
  }),
  useEslintRc(),
);
