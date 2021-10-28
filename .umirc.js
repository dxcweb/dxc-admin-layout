// ref: https://umijs.org/config/
const plugins = [
  // ref: https://umijs.org/plugin/umi-plugin-react.html
  [
    'umi-plugin-react',
    {
      antd: true,
      dva: true,
      dynamicImport: true,
      title: 'dxcweb',
      locale: {
        enable: false, // default false
        default: 'zh-CN', // default zh-CN
      },
    },
  ],
];
export default {
  plugins,
  publicPath: process.env.publicPath,
  targets: {
    ie: 11,
  },
  theme: './src/theme.js',
  define: {
    'process.env': {
      baseURL: `${process.env.baseURL}`,
    },
  },
  hash: true,
};
