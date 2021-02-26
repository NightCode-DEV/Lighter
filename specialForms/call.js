const { SyntaxError } = require('../Errors.js');

function define(specialForms, evaluate) {
    specialForms.call = async(args, scope) => {
        if (args <= 0) {
            throw new SyntaxError(
                `Incorrect usage of function call in ${process.argv[2]}`
            );
        }
        if (args[0].type == 'value') {
            if (args[0].value.split(' ').length > 1) {
                throw new SyntaxError('Cannot use spaces in functions names');
            }

            if (args[0].value in scope) {
                const variables = [];

                for (arg of args.slice(1)) {
                    variables.push({
                        type: 'apply',
                        operator: {
                            type: 'word',
                            name: 'define',
                        },
                        args: [{
                                type: 'word',
                                name: `args[${args.slice(1).indexOf(arg)}]`,
                            },
                            {
                                type: 'value',
                                value: arg.value,
                            },
                        ],
                    });
                }

                const toEvaluate = {
                    type: 'apply',
                    operator: {
                        type: 'word',
                        name: 'do',
                    },
                    args: variables,
                };

                toEvaluate.args.push(scope[args[0].value]);

                evaluate(toEvaluate, scope);
            } else {
                throw new ReferenceError(
                    'Function ' + args[0].value + ' was never defined'
                );
            }
        } else {
            throw new SyntaxError('In function names you can only use strings');
        }
    };
}

module.exports = define;