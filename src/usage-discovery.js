// @ts-check

const path = require('path');
const fs = require('fs');
const globby = require('globby');
const { transform } = require('ember-template-recast');
const { extractTemplates } = require('./-parse-templates');

/**
 * @param {import('./types').ResolvedOptions} options
 */
function discoverUsages(options) {
  let files = globby.sync(options.appPaths, {
    expandDirectories: {
      files: ['**/*'],
      extensions: ['hbs', 'gts', 'gjs', 'js', 'ts'],
    },
  });

  let result = [];

  for (let filePath of files) {
    result.push(...parseFile(filePath, options));
  }

  return result;
}

module.exports = { discoverUsages };

function parseFile(filePath, options) {
  let ext = path.extname(filePath);
  let buffer = fs.readFileSync(filePath);
  let content = buffer.toString();

  switch (ext) {
    case '.hbs':
      return extractFromTemplate(content, options);
    case '.js':
    case '.ts':
      return extractFromHBSLiteral(content, options);
    case '.gjs':
    case '.gts':
      return extractFromTemplateTags(content, options);
    default:
      throw new Error(`Unexpected file type: ${ext}, ${filePath}`);
  }
}

/**
 * Receives hbs file or extracted template
 * @param {string} content
 * @param {import('./types').ResolvedOptions} options
 */
function extractFromTemplate(content, options) {
  let result = [];

  transform({
    template: content,
    plugin() {
      let activeNode;

      return {
        ElementNode: {
          enter(node) {
            if (node.tag !== options.componentName) return;
            activeNode = node;
          },
          exit() {
            activeNode = null;
          },
        },
        AttrNode: {
          enter(node) {
            if (!activeNode) return;
            if (node.name !== options.iconArgName) return;

            if (node.value.type !== 'TextNode') {
              throw new Error(
                `${options.componentName}'s @${options.iconArgName} argument must be a static TextNode value`
              );
            }

            result.push(node.value.chars);
          },
        },
      };
    },
  });

  return result;
}

/**
 * Receives js or ts file
 * @param {string} content
 * @param {import('./types').ResolvedOptions} options
 */
function extractFromHBSLiteral(content, options) {
  let result = [];

  let templates = extractTemplates(content);

  if (templates.length === 0) return result;

  return result;
}

/**
 * Receives js or ts file
 * @param {string} content
 * @param {import('./types').ResolvedOptions} options
 */
function extractFromTemplateTags(content, options) {
  let result = [];

  let templates = extractTemplates(content);

  if (templates.length === 0) return result;

  return result;
}
