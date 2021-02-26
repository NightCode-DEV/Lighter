const { SyntaxError, TypeError } = require("../Errors");
const fetch = require("node-fetch");

function define(specialForms, evaluate, parse) {
    specialForms.request = (args, scope) => {

        if (args[0].value.toUpperCase() !== "GET") return TypeError("Invalid request method.")

        let data;

        fetch(args[1].value)
            .then(res => res.json())
            .then(json => {
                data.assign(json)
                console.log(data)
            })

        // return data;

    };
}

module.exports = define;