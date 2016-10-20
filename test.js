const queryString = require('query-string');
var parsed = {};
parsed.foo = 'unicorn';
parsed.ilike = 'pizza';

const stringified = queryString.stringify(parsed);
console.log(stringified);