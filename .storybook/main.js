const cracoWebpack = require('./webpack.config')
module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app"
  ],
  webpackFinal:(config)=>{
    return { ...config, resolve: { ...config.resolve, alias: {...config.resolve.alias,...cracoWebpack.resolve.alias} } }
  }
}