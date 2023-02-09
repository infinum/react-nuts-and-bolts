import Environment from 'jest-environment-jsdom';

class InfinumTestEnvironment extends Environment {
	public async setup() {
		await super.setup();
		if (typeof this.global.TextEncoder === 'undefined') {
			const { TextEncoder, TextDecoder } = await require('util');
			this.global.TextEncoder = TextEncoder;
			this.global.TextDecoder = TextDecoder;
		}
	}
}

export default InfinumTestEnvironment;
