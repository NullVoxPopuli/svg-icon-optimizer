const { Funnel } = require('broccoli-funnel');
const { MergeTrees } = require('broccoli-merge-trees');

const SVGOptimizer = require('./svgo-optimizer');
// const SpriteConfigGenerator = require('./sprite-config-generator');
const SpriteAssembler = require('./sprite-assembler');

const TrulyRemoveComments = {
  name: 'Remove Comments Starting With !',
  type: 'visitor',
  fn: () => {
    return {
      comment: {
        enter: (node, parentNode) => {
          if (node.value.charAt(0) === '!') {
            parentNode.children = parentNode.children.filter((child) => child !== node);
          }
        },
      },
    };
  },
};

function optimizeSVGs(treeWithSvgs) {
  let compiled = new SVGOptimizer(treeWithSvgs, {
    persist: false,
    svgoConfig: {
      multipass: true,
      plugins: ['preset-default', TrulyRemoveComments],
    },
  });
  let spriteTree = new SpriteAssembler([compiled]);

  return new MergeTrees([compiled, spriteTree]);
}

module.exports = {
  optimizeSVGs,
};
