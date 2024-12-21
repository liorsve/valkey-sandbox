const path = require('path')
const webpack = require('webpack')
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
        changeOrigin: true
      }
    },
    static: {
      directory: path.join(__dirname, 'public'),
      serveIndex: true,
      watch: true,
      staticOptions: {
        extensions: ['html', 'css', 'js', 'woff2'],
        index: false,
      },
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
    plugins: [
      new webpack.DefinePlugin({
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: true,
      })
    ]
  },
  chainWebpack: (config) => {
    config.module
      .rule('fonts')
      .test(/\.(woff2?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/)
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'fonts/[name].[ext]'
      });
  },
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: 'Valkey SandBox IDE'
    }
  }
})
