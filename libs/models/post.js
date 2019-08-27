var thinky = require('./../thinky.js');
var type = thinky.type;
var r = thinky.r;

var Author = require('./author.js');

var Post = thinky.createModel("Post", {
    id: String,
    title: String,
    content: String,
    idAuthor: String,
    createdAt: type.date().default(r.now())
});

// Join the models
Post.belongsTo(Author, "author", "idAuthor", "id");

module.exports = Post;