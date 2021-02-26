function define(specialForms, evaluate) {
	specialForms.concat = (args, scope) => {
		if (!args.length) {
			throw new SyntaxError('Incorrect use of call');
		}

		let output = '';

		args.forEach((arg) => {
			output += arg.name || arg.value;
		});

		return output;
	};
}

module.exports = define;
