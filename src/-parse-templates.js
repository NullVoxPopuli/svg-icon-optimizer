const { getTemplateLocals } = require('@glimmer/syntax');
const {
  preprocessEmbeddedTemplates,
} = require('ember-template-imports/lib/preprocess-embedded-templates');
const util = require('ember-template-imports/src/util');
const jscodeshift = require('jscodeshift');

/**
 * I think eventually ember-template-imports will provide this for us? this is a lot of boilerplate
 *
 * @param {string} text
 */
function parseTemplates(text) {
  const preprocessed = preprocessEmbeddedTemplates(text, {
    getTemplateLocals,
    relativePath: 'n/a',

    templateTag: util.TEMPLATE_TAG_NAME,
    templateTagReplacement: util.TEMPLATE_TAG_PLACEHOLDER,

    includeSourceMaps: false,
    includeTemplateTokens: true,
  });

  const transformed = preprocessed.output;

  return transformed;
}

function extractTemplates(code) {
  let parsed = parseTemplates(code);
  let j = jscodeshift.withParser('ts');
  let root = j(parsed);
  let result = [];

  root
    .find(j.CallExpression, { callee: { name: util.TEMPLATE_TAG_PLACEHOLDER } })
    .forEach((path) => {
      let template = path.node?.arguments?.[0]?.quasis?.[0]?.value?.raw;

      result.push(template);
    });

  return result;
}

module.exports = {
  parseTemplates,
  extractTemplates,
};
