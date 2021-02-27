const { TypeError, SyntaxError } = require("../Errors")

function define(specialForms, evaluate) {
    specialForms.doTimeout = (args, scope) => {
        if (args.length !== 2) throw SyntaxError("Invalid usage of arguments in doTimeout method.")
        if (isNaN(args[0].value)) throw TypeError("First argument for doTimeout method must be a number.")
        setTimeout(() => {
            evaluate(args[1], scope)
        }, args[0].value);
    };
}

module.exports = define;