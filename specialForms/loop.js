const { SyntaxError, TypeError } = require("../Errors");

function define(specialForms, evaluate, parse) {
    specialForms.loop = (args, scope) => {
        if (args.length < 2) throw new SyntaxError("Invalid usage of arguments in loop");
        if (typeof args[0].value !== "number") throw new TypeError("First argument must be a type of number.");
        for (let i = 0; i < args[0].value; i++) {
            evaluate(args[1], scope)
        }

    };
}

module.exports = define;