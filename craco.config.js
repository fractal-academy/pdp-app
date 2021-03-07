const { whenDev } = require('@craco/craco')

const CracoAlias = require('craco-alias')
const CracoLessPlugin = require('craco-less')
const antdTheme = require('./src/config/theme')
const CircularDependencyPlugin = require('circular-dependency-plugin')

module.exports = {
  webpack: {
    plugins: [
      ...whenDev(
        () => [
          new CircularDependencyPlugin({
            onDetected({ paths, compilation }) {
              const pathChain = paths.join(' -> ')
              if (pathChain.includes('src')) {
                compilation.warnings.push(new Error(pathChain))
              }
            }
          })
        ],
        []
      )
    ]
  },
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
