'use strict';

const path = require('path');
const Funnel = require('broccoli-funnel');
const { MergeTrees } = require('broccoli-merge-trees');
const globby = require('globby');

const DEFAULTS = {
  appPaths: ['app', 'addon', 'src'],
  componentName: 'Icon',
  iconArgName: '@name',
  outputPath: '/assets/svg',
};

/**
 * Scans files in the `appPaths` directories looking for invocations of `componentName` with
 * `iconArgName` and copies the matching SVGs found in `svgPaths` to the `outputPath`
 *
 * This utility does not re-write templates, so your `componentName`'s implementation
 * will need to match the config passed to this utility. For example
 *
 * ```hbs
 * {{!-- app/components/icon.hbs --}}
 * <svg
 *   fill="currentColor"
 *   width="24"
 *   height="24"
 *   xmlns="http://www.w3.org/2000/svg"
 *   ...attributes
 * >
 *   <use href="/assets/svg/{{@name}}.svg#{{@name}}"></use>
 * </svg>
 * `
 *
 * @typedef Options
 * @property {string[]} svgPaths
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
 *
 * @property{string[]} [appPaths = ['app', 'addon', 'src']]
 * list of relative paths to search for svg path occurrences.
 * used for finding which svgs to copy to the build output
 *
 * @property {string} [componentName = 'Icon']
 * the name of the component to search for the `iconNameName`, which is then
 * used for finding which svgs to copy to the build output
 *
 * @property {string} [iconArgName = '@name']
 * the name of the argument that should match an svg found in the `svgPaths`
 *
 * @property {string} [outputPath = '/assets/svg/']
 * where to put the detected SVGs (and spritemap) in the build output
 *
 * @param {Options} options
 */
module.exports = function optimizeIcons(_options = {}) {
  let options = { ...DEFAULTS, ..._options };
  let iconNames = [];

  /**
   * Step 1: discover what icons are being requested from the `appPaths`
   */
  let searchPaths = globby.sync(options.appPaths, {
    expandDirectories: {
      files: ['**/*'],
      extensions: ['hbs', 'gts', 'gjs', 'js', 'ts'],
    },
  });

  console.log(searchPaths);

  /**
   * Step 2: find the requested icons from `svgPaths` and copy them to
   *         `outputPath`
   */
  let treeForIcons = new MergeTrees(
    options.svgPaths.map(
      (svgPath) =>
        new Funnel(svgPath, {
          destDir: options.outputPath,
          include: iconNames,
        })
    )
  );

  /**
   * Step 3: optimize the SVGs and generate a sprite sheet
   */
  // TODO

  return new MergeTrees([treeForIcons]);
};

/**
 * Support named imports / requires as well as default
 */
module.exports.optimizeIcons = module.exports;
