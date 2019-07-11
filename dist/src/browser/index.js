'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const build_angular_1 = require('@angular-devkit/build-angular')
class CustomizeTerserBrowserBuilder extends build_angular_1.BrowserBuilder {
  buildWebpackConfig(root, projectRoot, host, options) {
    const terserOptionsCustom = options.terserOptions
    if (typeof terserOptionsCustom.keep_fnames === 'string')
      terserOptionsCustom.keep_fnames = new RegExp(terserOptionsCustom.keep_fnames)
    if (typeof terserOptionsCustom.keep_classnames === 'string')
      terserOptionsCustom.keep_classnames = new RegExp(terserOptionsCustom.keep_classnames)
    const webpackConfig = super.buildWebpackConfig(root, projectRoot, host, options)
    if (
      terserOptionsCustom &&
      webpackConfig.optimization &&
      webpackConfig.optimization.minimizer &&
      Array.isArray(webpackConfig.optimization.minimizer)
    ) {
      const terserPlugin = webpackConfig.optimization.minimizer.find(
        (minimizer) => minimizer.options && minimizer.options.terserOptions,
      )
      if (terserPlugin) {
        console.log('using custom terser options')
        const terserOptionsOriginal = terserPlugin.options.terserOptions
        terserPlugin.options.terserOptions = Object.assign({}, terserOptionsOriginal, terserOptionsCustom)
      }
    }
    return webpackConfig
  }
}
exports.default = CustomizeTerserBrowserBuilder
