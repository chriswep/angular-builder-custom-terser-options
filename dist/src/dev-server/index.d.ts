import { DevServerBuilder } from '@angular-devkit/build-angular'
export default class CustomizeTerserDevServerBuilder extends DevServerBuilder {
  buildWebpackConfig(root: any, projectRoot: any, host: any, options: any): any
}
