const { SyntaxError, TypeError } = require("../Errors");
const fetch = require("node-fetch");

function define(specialForms, evaluate, parse) {
    specialForms.print = (args, scope) => {
        if (!args) throw new SyntaxError("Missing string to print.");
        return console.log(args[0].value)
    };
}

module.exports = define;