function define(specialForms, evaluate) {
	specialForms.function = (args, scope) => {
		if (args.length != 2) {
			throw new SyntaxError('Incorrect use of function');
		}
		if (args[0].type == 'value') {
			if (args[0].value.split(' ').length > 1) {
				throw new SyntaxError('Cannot use spaces in functions names');
			}

			let value = args[1];
			scope[args[0].value] = value;
			return value;
		} else {
			throw new SyntaxError('In function names you can only use strings');
		}
	};
}

module.exports = define;
