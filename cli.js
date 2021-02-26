const { run } = require('./run.js');
const fs = require('fs');
run(fs.readFileSync(process.argv[2]).toString());