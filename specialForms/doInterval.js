const { TypeError, SyntaxError } = require("../Errors")

function define(specialForms, evaluate) {
    specialForms.doInterval = (args, scope) => {
        if (args.length !== 2) throw SyntaxError("Invalid usage of arguments in doInterval method.")
        if (isNaN(args[0].value)) throw TypeError("First argument for doInterval method must be a number.")
        setInterval(() => {
            evaluate(args[1], scope)
        }, args[0].value)
    };
}

module.exports = define;