function define(specialForms, evaluate) {
	specialForms.while = (args, scope) => {
		if (args.length != 2) {
			throw new SyntaxError('Wrong number of args to while');
		}

		while (evaluate(args[0], scope) !== false) {
			evaluate(args[1], scope);
		}

		return false;
	};
}

module.exports = define;
