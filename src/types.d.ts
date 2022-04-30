export interface Options {
  /**
   *
   * list of absolute paths to find svgs that could be used in your app.
   * example:
   *
   * ```js
   * [
   *   path.join(
   *     path.dirname(require.resolve('@fortawesome/fontawesome-free/package.json')),
   *     'svgs'
   *   )
   * ]
   * ```
   */
  svgPaths: string[];

  /**
   * list of relative paths to search for svg path occurrences.
   * used for finding which svgs to copy to the build output
   *
   * defaults to ['app', 'addon', 'src']
   */
  appPaths?: string[];

  /**
   *
   * the name of the component to search for the `iconNameName`, which is then
   * used for finding which svgs to copy to the build output
   *
   * defaults to 'Icon'
   */
  componentName?: string;

  /**
   * the name of the argument that should match an svg found in the `svgPaths`
   *
   * defaults to '@name'
   */
  iconArgName?: string;

  /**
   *
   * where to put the detected SVGs (and spritemap) in the build output
   *
   * defaults to '/assets/svg/'
   */
  outputPath?: string;
}

export type ResolvedOptions = Required<Options>;
