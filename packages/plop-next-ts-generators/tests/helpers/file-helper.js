import fs from 'node:fs';
import { resolve } from 'node:path';

export const getFileHelper = () => {
	let cleanupFiles = [];

	const cleanup = () => {
		if (!cleanupFiles.length) return;

		for (const file of cleanupFiles) {
			try {
				fs.unlinkSync(file);
			} catch (e) {
				// ignore
			}
		}

		cleanupFiles = [];
	};

	afterEach(() => {
		cleanup();
	});

	const getFilePath = async (path) => {
		const expectedFilePath = resolve(__dirname, '../', path);

		cleanupFiles.push(expectedFilePath);

		try {
			await fs.promises.unlink(expectedFilePath);
		} catch (e) {
			// ignore
		}

		return expectedFilePath;
	};

	return {
		getFilePath,
	};
};
