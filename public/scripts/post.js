module.exports = Post;

function Post(id, title, body, posted, image) {
    this.id = id;
    this.title = title;
    this.body = body;
    this.posted = posted;
    this.image = image;

    // console.log("image: " + image);
}
