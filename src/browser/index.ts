import { BrowserBuilder } from '@angular-devkit/build-angular'

export default class CustomizeTerserBrowserBuilder extends BrowserBuilder {
  public buildWebpackConfig(root: any, projectRoot: any, host: any, options: any) {
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
      const terserPlugin = (webpackConfig.optimization.minimizer as any[]).find(
        (minimizer) => minimizer.options && minimizer.terserOptions,
      )
      if (terserPlugin) {
        const terserOptionsOriginal = terserPlugin.options.terserOptions
        terserPlugin.options.terserOptions = {
          ...terserOptionsOriginal,
          ...terserOptionsCustom,
        }
      }
    }
    return webpackConfig
  }
}
