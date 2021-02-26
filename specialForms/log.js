function define(specialForms, evaluate) {
	specialForms.log = (args, scope) => {
		let string = '';
		if (!args.length) return console.log();
		args.forEach((x) => {
			string += `${scope[x.name]} `;
		});
		console.log(string);
	};
}

module.exports = define;
