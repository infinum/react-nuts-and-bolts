const path = require('path');

const dir = path.resolve(__dirname);

const CORE_DOMAIN = 'core';
const SHARED_DOMAIN = 'shared';
const FEATURE_DOMAIN = 'feature';
const rootDomains = [CORE_DOMAIN, SHARED_DOMAIN, FEATURE_DOMAIN];

const SINGLE_PART_COMPONENT = 'single-part';
const MULTI_PART_COMPONENT = 'multi-part';
const componentTypes = [SINGLE_PART_COMPONENT, MULTI_PART_COMPONENT];

const RADIUS_FOUNDATION = 'radius';
const SPACING_FOUNDATION = 'spacing';
const TYPOGRAPHY_FOUNDATION = 'typography';
const Z_INDEX_FOUNDATION = 'z-index';
const foundations = [
	'blur',
	'borders',
	'breakpoints',
	'colors',
	RADIUS_FOUNDATION,
	'shadows',
	'sizes',
	SPACING_FOUNDATION,
	'transitions',
	TYPOGRAPHY_FOUNDATION,
	Z_INDEX_FOUNDATION,
];

module.exports = {
	dir,

	CORE_DOMAIN,
	SHARED_DOMAIN,
	FEATURE_DOMAIN,
	rootDomains,

	SINGLE_PART_COMPONENT,
	MULTI_PART_COMPONENT,
	componentTypes,

	RADIUS_FOUNDATION,
	SPACING_FOUNDATION,
	TYPOGRAPHY_FOUNDATION,
	Z_INDEX_FOUNDATION,
	foundations,
};
