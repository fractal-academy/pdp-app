const CracoAlias = require('craco-alias')
const CracoLessPlugin = require('craco-less')
const antdTheme = require('./src/config/theme')

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'jsconfig',
        baseUrl: './src'
      }
    },
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: antdTheme,
            javascriptEnabled: true
          }
        }
      }
    }
  ]
}
