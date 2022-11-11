const path = require('path');
const fs = require('fs');

function getFoundations({ dir }) {
	const foundations = [];
	fs.readdir(path.resolve(dir, 'templates', 'theme', 'foundations'), function (err, files) {
		if (err) {
			console.log('Unable to scan foundations directory: ' + err);
			return;
		}
		files.forEach(function (file) {
			foundations.push(file.replace('.hbs', ''));
		});
	});
	return foundations;
}

module.exports = {
	getFoundations,
};
