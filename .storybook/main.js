const cracoWebpack = require('./webpack.config')
const antdTheme = require('../src/config/theme')
module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],

  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    {
      name: '@storybook/preset-ant-design',
      options: {
        lessOptions: {
          modifyVars: antdTheme
        }
      }
    },
    {
      "name": "@storybook/preset-create-react-app",
      "options": {
        "craOverrides": {
          "fileLoaderExcludes": ["less"]
        }
      }
    }
  ],
  webpackFinal:(config)=>{
    return { ...config, resolve: { ...config.resolve, alias: {...config.resolve.alias,...cracoWebpack.resolve.alias} } }
  }
}
