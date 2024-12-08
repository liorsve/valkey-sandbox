const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')
const path = require('path')
const webpack = require('webpack')

module.exports = {
  devServer: {
    // Remove hot reload configurations
    hot: false, // Disable hot module replacement
    port: 8080,
    host: 'localhost', // Changed from '0.0.0.0' to 'localhost'
    allowedHosts: 'all',
    client: {
      webSocketURL: {
        hostname: 'localhost',
        pathname: '/appws', // Changed from '/ws' to '/appws'
        port: 8080,
        protocol: 'ws'
      }
    },
    proxy: {
      '/appws': { // Changed from '/ws' to '/appws'
        target: 'ws://localhost:3000',
        ws: true,
        changeOrigin: true,
        secure: false,
        logLevel: 'debug',
        headers: {
          'Upgrade': 'websocket',
          'Connection': 'Upgrade'
        }
      }
    },
    setupMiddlewares: (middlewares, devServer) => {
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined')
      }

      // Add health check endpoint
      devServer.app.get('/health', (_, res) => {
        res.json({ status: 'ok' })
      })

      return middlewares
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        vue: '@vue/compat'
      },
      fallback: {
        path: require.resolve('path-browserify')
      }
    },
    plugins: [
      new MonacoWebpackPlugin({
        languages: ['javascript', 'typescript'],
        features: ['!gotoSymbol']
      }),
      new webpack.DefinePlugin({
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(false),
        __VUE_OPTIONS_API__: JSON.stringify(true),
        __VUE_PROD_DEVTOOLS__: JSON.stringify(false)
      })
    ]
  }
}
