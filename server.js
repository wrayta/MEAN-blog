var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var Post = require('./public/post');

var mysql = require('mysql');

var HOST = ''; //TODO: fill in host
var PORT = ''; //TODO: fill in which port you're using
var MYSQL_USER = ''; //TODO: fill in your MySQL user id
var MYSQL_PASS = ''; //TODO: fill in your MySQL password
var DATABASE = 'blog'; //make sure you have a database with this name
var TABLE = 'entry'; //make sure you have a table with this name

var connection = mysql.createConnection({
    host: HOST,
    user: MYSQL_USER,
    password: MYSQL_PASS,
    port: PORT
});

connection.connect(function(err){
    if(err){
        console.log('Error connecting to db');
        return;
    }
    console.log('Connection established');
});

connection.query('use ' + DATABASE);

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.post("/api/blogpost", createPost);
app.get("/api/blogpost", getAllPosts);
app.get("/api/blogpost/:id", getPostById);
app.delete("/api/blogpost/:id", deletePost);
app.put("/api/blogpost/:id", updatePost);

function updatePost(req, res) {
    var postId = req.params.id;
    var post = req.body;

    connection.query('UPDATE ' + TABLE + ' SET title="' + post.title
        + '", body="' + post.body + '" WHERE id=' + postId,
        function (err, res) {
            if (err){
                res.sendStatus(400);
            }
            console.log('Last insert ID: ', res.insertId);
        });

    res.json(200);
}

function getPostById(req, res) {
    var postId = req.params.id;

    connection.query('SELECT * FROM ' + TABLE + ' WHERE id=' + postId,
        function (err, rows, response) {
            if (err) {
                response.sendStatus(400);
            }
            console.log('Last insert ID: ', response.insertId);

            var editedPost = new Post(rows[0].id, rows[0].title, rows[0].body);

            res.json(editedPost);
        });

    // res.json(200);
}

function deletePost(req, res) {
    var postId = req.params.id;

    connection.query('DELETE FROM ' + TABLE + ' WHERE id=' + postId,
        function (err, res) {
            if (err){
                res.sendStatus(400);
            }
            console.log('Last insert ID: ', res.insertId);
        });

    res.json(200);

}

function getAllPosts(req, res) {

    connection.query('SELECT * FROM '+ TABLE,
        function (err, rows, response) {
            if (err){
                response.sendStatus(400);
            }
            console.log('Last insert ID: ', response.insertId);

            var posts = [];

            for(var i in rows) {
                var aPost = new Post(rows[i].id, rows[i].title, rows[i].body);
                posts.push(aPost);
            }

            res.json(posts);

        });

    // res.json(200);

}

function createPost(req, res) {
    var post = req.body;
    console.log(post);
    connection.query('insert into '+ TABLE +' (title, body) values ("' + post.title + '", "' + post.body + '")',
        function (err, res) {
            if (err){
                res.sendStatus(400);
            }
            console.log('Last insert ID: ', res.insertId);
        });

    res.json(200);
}
app.listen(3000);
