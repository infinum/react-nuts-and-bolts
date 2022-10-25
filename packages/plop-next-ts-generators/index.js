/**
 * @typedef {{ baseUrl?: string; componentsUrl?: string }} Config
 */

/**
 * @param {import("plop").NodePlopAPI} plop
 * @param {Config} config
 */
module.exports = function projectStructure(plop, config) {
	plop.setGenerator('theme', require('./generators/theme')(config));
	plop.setGenerator('component', require('./generators/component')(config));
};
