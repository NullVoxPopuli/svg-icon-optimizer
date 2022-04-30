// @ts-check

const { Funnel } = require('broccoli-funnel');
const { MergeTrees } = require('broccoli-merge-trees');

/**
 * @param {import('./types').ResolvedOptions} options
 * @param {string[]} iconNames
 */
function copyByName(options, iconNames) {
  let svgs = iconNames.map((name) => `${name}.svg`);

  let funnels = options.svgPaths.map(
    (svgPath) =>
      new Funnel(svgPath, {
        destDir: options.outputPath,
        include: svgs,
      })
  );

  return new MergeTrees(funnels);
}

module.exports = {
  copyByName,
};
