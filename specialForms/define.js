function define(specialForms, evaluate) {
    specialForms.define = (args, scope) => {
        if (args.length != 2) {
            throw new SyntaxError('Incorrect use of define');
        }
        let value = evaluate(args[1], scope);
        scope[args[0].name] = value;
        return value;
    };
}

module.exports = define;