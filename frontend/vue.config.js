const path = require('path')
const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  publicPath: '/',
  outputDir: path.resolve(__dirname, '../backend/frontend/dist'),
  devServer: {
    port: 8080,
    host: 'localhost',
    allowedHosts: 'all',
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    client: {
      webSocketURL: {
        hostname: 'localhost',
        pathname: '/appws',
        port: 8080,
        protocol: 'ws'
      }
    },
    proxy: {
      '/appws': {
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
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    output: {
      globalObject: 'self',
      filename: '[name].js'
    },
  },
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: 'ValKey SandBox IDE'
    }
  }
})
