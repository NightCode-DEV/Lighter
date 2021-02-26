const {parse} = require('./run.js');

console.log('Hey');
console.log(JSON.stringify(parse('do(define(hi, 10))'), null, 2));
