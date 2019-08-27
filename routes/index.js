const express = require('express');
let router = express.Router();

var thinky = require('./../libs/thinky.js');
var r = thinky.r;

var Post = require('./../libs/models/post.js');
var Author = require('./../libs/models/author.js');

router.get('/', (req, res) => {
    Post.orderBy(r.asc('createdAt')).getJoin({
        Author: true
    }).then(function (posts) {
        res.render('post', { posts });
    });
})

router.post('/addPost', (req, res) => {
    var body = req.body;

    body.name = 'Michel';
    body.email = 'orphee@gmail.com';

    var post = new Post( body );
    var author = new Author( body );
    post.author = author;

    post.saveAll().then(function (result) {
        Post.getJoin({
            Author: true
        }).then(function (posts) {
            res.redirect('/');
        });
    });
});

module.exports = {
    router
    // , sessionMiddleware
};
