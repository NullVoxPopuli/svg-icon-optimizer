// @ts-check
const assert = require('assert');

/**
 * @param {import('./types').Options} options
 */
function verifyOptions({ svgPaths, appPaths, componentName, iconArgName, outputPath }) {
  let ideally = {
    svgPaths: 'Expecting an array of strings that represent paths to svg files.',
    appPaths:
      'Expecting an array of strings or globs that contain the files for the icon-svg-optimizer to search for svg-icon usages.',
    componentName:
      'This should be the name of the component that the icon-svg-optimizer will search for. For example, `Icon`',
    iconArgName:
      'This should be the name of the arg that the icon name is passed to. For example, `@name`',
    outputPath:
      'This should be the path in the output directory (usually within `dist`) the svg and sprite map will be outputted to. For example, `/assets/svg/',
  };

  assert(svgPaths, `Option \`svgPaths\` is missing from options. ${ideally.svgPaths}`);
  assert(
    Array.isArray(svgPaths),
    `Option \`svgPaths\` was an unexpected type. Instead received: ${typeof svgPaths}. ` +
      ideally.svgPaths
  );
  assert(
    svgPaths.every((svg) => typeof svg === 'string'),
    `Option \`svgPaths\` contained entries of an unexpected type. ` + ideally.svgPaths
  );

  assert(appPaths, `Option \`appPaths\` is missing from options. ${ideally.appPaths}`);
  assert(
    Array.isArray(appPaths),
    `Option \`appPaths\` was an unexpected type. Instead received: ${typeof appPaths}. ` +
      ideally.appPaths
  );
  assert(
    appPaths.every((searchPath) => typeof searchPath === 'string'),
    `Option \`appPaths\` contained entries of an unexpected type.` + ideally.appPaths
  );

  assert(
    componentName,
    `Option \`componentName\` is missing from options. ${ideally.componentName}`
  );
  assert(
    typeof componentName === 'string',
    `Option \`componentName\` is an unexpected type. Expected string. ${ideally.componentName}`
  );

  assert(iconArgName, `Option \`iconArgName\` is missing from options. ${ideally.iconArgName}`);
  assert(
    typeof iconArgName === 'string',
    `Option \`iconArgName\` is an unexpected type. Expected string. ${ideally.iconArgName}`
  );

  assert(outputPath, `Option \`outputPath\` is missing from options. ${ideally.outputPath}`);
  assert(
    typeof outputPath === 'string',
    `Option \`outputPath\` is an unexpected type. Expected string. ${ideally.outputPath}`
  );
}

module.exports = { verifyOptions };
