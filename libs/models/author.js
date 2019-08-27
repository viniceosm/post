var thinky = require('./../thinky.js');
var type = thinky.type;
var r = thinky.r;

var Author = thinky.createModel("Author", {
    id: type.string(),      // a normal string
    name: type.string().min(2),  // a string of at least two characters
    email: type.string().email(),  // a string that is a valid email
    createdAt: type.date().default(r.now())
});

module.exports = Author;