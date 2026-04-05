const fs = require('fs');
const log = fs.readFileSync('typecheck.log', 'utf8');
const regex = /Argument of type '"([^"]+)"' is not assignable/g;
const matches = [...log.matchAll(regex)].map(m => m[1]);
fs.writeFileSync('missing_keys.txt', [...new Set(matches)].join('\n'));
