const fs = require('fs');
const isValidPath = require('is-valid-path');

function define(specialForms, evaluate, parse) {
	specialForms.require = (args, scope) => {
		if (args.length != 1) {
			throw new SyntaxError('Incorrect use of require');
		}
		if (fs.existsSync(args[0].value)) {
			evaluate(parse(fs.readFileSync(args[0].value).toString()), scope);
		} else {
			throw new ReferenceError("File wasn't found!");
		}
	};
}

module.exports = define;
