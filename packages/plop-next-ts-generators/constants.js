const path = require('path');
const { getFoundations } = require('./utils');

const dir = path.resolve(__dirname);

const CORE_DOMAIN = 'core';
const SHARED_DOMAIN = 'shared';
const FEATURE_DOMAIN = 'features';
const rootDomains = [CORE_DOMAIN, SHARED_DOMAIN, FEATURE_DOMAIN];

const SINGLE_PART_COMPONENT = 'single-part';
const MULTI_PART_COMPONENT = 'multi-part';
const componentTypes = [SINGLE_PART_COMPONENT, MULTI_PART_COMPONENT];

const INIT_COMMAND = 'init';
const ADD_FOUNDATION_COMMAND = 'add-foundation';
const ADD_COMPONENT_COMMAND = 'add-component';
const foundationCommands = [INIT_COMMAND, ADD_FOUNDATION_COMMAND, ADD_COMPONENT_COMMAND];

const RADIUS_FOUNDATION = 'radius';
const SPACING_FOUNDATION = 'spacing';
const TYPOGRAPHY_FOUNDATION = 'typography';
const Z_INDEX_FOUNDATION = 'z-index';

const foundations = getFoundations({ dir });

/**
 * @constant
 * @type {import('./index').Config}
 */
const defaultConfig = {
	baseUrl: 'src',
	componentsUrl: 'components',
};

module.exports = {
	dir,
	defaultConfig,

	CORE_DOMAIN,
	SHARED_DOMAIN,
	FEATURE_DOMAIN,
	rootDomains,

	SINGLE_PART_COMPONENT,
	MULTI_PART_COMPONENT,
	componentTypes,

	INIT_COMMAND,
	ADD_FOUNDATION_COMMAND,
	ADD_COMPONENT_COMMAND,
	foundationCommands,
	foundations,
	RADIUS_FOUNDATION,
	SPACING_FOUNDATION,
	TYPOGRAPHY_FOUNDATION,
	Z_INDEX_FOUNDATION,
};
