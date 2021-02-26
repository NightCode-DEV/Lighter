class SyntaxError {
    constructor(message) {
        console.log('SyntaxError: ' + message);
    }
}

class ReferenceError {
    constructor(message) {
        console.log('[ReferenceError] ' + message);
        process.exit(1);
    }
}

class TypeError {
    constructor(message) {
        console.log('TypeError ' + message);
    }
}
module.exports = {
    SyntaxError,
    ReferenceError,
    TypeError,
};