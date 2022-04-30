// @ts-check
'use strict';

const { MergeTrees } = require('broccoli-merge-trees');

const { verifyOptions } = require('./verify-options');
const { discoverUsages } = require('./usage-discovery');
const { copyByName } = require('./copy-by-name');

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
 * @param {import('./types').Options} opts
 */
function optimizeIcons(opts) {
  let options = { ...DEFAULTS, ...opts };

  verifyOptions(options);

  // TODO: the discovery phase needs to be a broccoli tree so that we get
  //       file watching and all that from the input files

  let iconNames = discoverUsages(options);

  /**
   * Step 2: find the requested icons from `svgPaths` and copy them to
   *         `outputPath`
   */
  let treeForIcons = copyByName(options, iconNames);

  /**
   * Step 3: optimize the SVGs and generate a sprite sheet
   */
  // TODO

  return new MergeTrees([treeForIcons]);
}

module.exports = { optimizeIcons };
