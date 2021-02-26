function define(specialForms, evaluate) {
	specialForms.do = (args, scope) => {
		let value = false;
		for (let arg of args) {
			value = evaluate(arg, scope);
		}
		return value;
	};
}

module.exports = define;
