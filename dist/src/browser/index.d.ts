import { BrowserBuilder } from '@angular-devkit/build-angular'
export default class CustomizeTerserBrowserBuilder extends BrowserBuilder {
  buildWebpackConfig(root: any, projectRoot: any, host: any, options: any): any
}
