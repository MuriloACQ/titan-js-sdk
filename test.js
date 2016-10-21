const queryString = require('query-string');
var parsed = {};
parsed.foo = undefined;
parsed.ilike = undefined;

const stringified = queryString.stringify(parsed);
console.log(stringified);