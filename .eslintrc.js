'use strict';

const { configs } = require('@nullvoxpopuli/eslint-configs');
const { nodeMTS } = require('@nullvoxpopuli/eslint-configs/configs/node');

const config = configs.nodeCJS();

module.exports = {
  ...config,
  overrides: [...config.overrides, ...nodeMTS],
};
