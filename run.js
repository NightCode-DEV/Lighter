/*
	do(define(x, 10),
   		if(>(x, 5),
      		print("large"),
			print("small")
		)
	)
*/

const errors = require('./Errors.js');
const events = require('./Events.js');

function parseExpression(program) {
    program = skipSpace(program);
    let match, expr;
    if ((match = /^"([^"]*)"/.exec(program))) {
        expr = { type: 'value', value: match[1] };
    } else if ((match = /^\d+\b/.exec(program))) {
        expr = { type: 'value', value: Number(match[0]) };
    } else if ((match = /^[^\s(),#"]+/.exec(program))) {
        expr = { type: 'word', name: match[0] };
    } else {
        throw new SyntaxError('Unexpected syntax: ' + program);
    }

    return parseApply(expr, program.slice(match[0].length));
}

function skipSpace(string) {
    let first = string.search(/\S/);
    if (first == -1) return '';
    return string.slice(first);
}

function parseApply(expr, program) {
    program = skipSpace(program);
    if (program[0] != '(') {
        return { expr: expr, rest: program };
    }

    program = skipSpace(program.slice(1));
    expr = { type: 'apply', operator: expr, args: [] };
    while (program[0] != ')') {
        let arg = parseExpression(program);
        expr.args.push(arg.expr);
        program = skipSpace(arg.rest);
        if (program[0] == ',') {
            program = skipSpace(program.slice(1));
        } else if (program[0] != ')') {
            throw new errors.SyntaxError("Expected ',' or ')'");
        }
    }
    return parseApply(expr, program.slice(1));
}

function parse(program) {
    let { expr, rest } = parseExpression(program);
    if (skipSpace(rest).length > 0) {
        throw new SyntaxError('Unexpected text after program');
    }
    return expr;
}

const specialForms = Object.create(null);

function evaluate(expr, scope) {
    if (expr.type == 'value') {
        return expr.value;
    } else if (expr.type == 'word') {
        if (expr.name in scope) {
            return scope[expr.name];
        } else {
            new ReferenceError(`Undefined binding: ${expr.name}`);
        }
    } else if (expr.type == 'apply') {
        let { operator, args } = expr;
        if (operator.type == 'word' && operator.name in specialForms) {
            return specialForms[operator.name](expr.args, scope);
        } else {
            let op = evaluate(operator, scope);
            if (typeof op == 'function') {
                return op(...args.map((arg) => evaluate(arg, scope)));
            } else {
                throw new TypeError('Applying a non-function.');
            }
        }
    }
}

require('./specialForms/call.js')(specialForms, evaluate);
require('./specialForms/concat.js')(specialForms, evaluate);
require('./specialForms/define.js')(specialForms, evaluate);
require('./specialForms/do.js')(specialForms, evaluate);
require('./specialForms/function.js')(specialForms, evaluate);
require('./specialForms/if.js')(specialForms, evaluate);
require('./specialForms/log.js')(specialForms, evaluate);
require('./specialForms/require.js')(specialForms, evaluate, parse);
require('./specialForms/while.js')(specialForms, evaluate);
require("./specialForms/loop")(specialForms, evaluate);
require("./specialForms/request")(specialForms, evaluate)
require("./specialForms/doInterval")(specialForms, evaluate)

const topScope = Object.create(null);

topScope.true = true;
topScope.false = false;

for (let op of['+', '-', '*', '/', '==', '<', '>']) {
    topScope[op] = Function('a, b', `return a ${op} b;`);
}

topScope.print = (value) => {
    console.log(value);
    return value;
};

function run(program) {
    return evaluate(parse(program), Object.create(topScope));
}

module.exports = {
    run,
    parse
};