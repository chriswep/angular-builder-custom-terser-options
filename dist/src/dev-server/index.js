'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const build_angular_1 = require('@angular-devkit/build-angular')
const browser_1 = require('../browser')
class CustomizeTerserDevServerBuilder extends build_angular_1.DevServerBuilder {
  buildWebpackConfig(root, projectRoot, host, options) {
    const browserBuilder = new browser_1.default(this.context)
    const webpackConfig = browserBuilder.buildWebpackConfig(root, projectRoot, host, options)
    return webpackConfig
  }
}
exports.default = CustomizeTerserDevServerBuilder
