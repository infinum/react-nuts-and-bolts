const path = require('path');

const CORE_DOMAIN = 'core';
const SHARED_DOMAIN = 'shared';
const FEATURE_DOMAIN = 'feature';
const rootDomains = [CORE_DOMAIN, SHARED_DOMAIN, FEATURE_DOMAIN];

const SINGLE_PART_COMPONENT = 'single-part';
const MULTI_PART_COMPONENT = 'multi-part';
const componentTypes = [SINGLE_PART_COMPONENT, MULTI_PART_COMPONENT];

const dir = path.resolve(__dirname);

module.exports = {
	dir,

	CORE_DOMAIN,
	SHARED_DOMAIN,
	FEATURE_DOMAIN,
	rootDomains,

	SINGLE_PART_COMPONENT,
	MULTI_PART_COMPONENT,
	componentTypes,
};
