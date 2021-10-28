module.exports = {
  type: 'react-component',
  npm: {
    esModules: false,
    umd: false,
  },
  devServer: {
    disableHostCheck: true,
  },
  webpack: {
    rules: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
};
