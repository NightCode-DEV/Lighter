const { SyntaxError } = require("../Errors")

function define(specialForms, evaluate) {
    specialForms.if = (args, scope) => {
        if (args.length != 3) {
            throw new SyntaxError('Wrong number of args to if');
        } else if (evaluate(args[0], scope) !== false) {
            return evaluate(args[1], scope);
        } else {
            return evaluate(args[2], scope);
        }
    };
}

module.exports = define;