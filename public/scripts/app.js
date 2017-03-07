(function() {
    angular
        .module("BlogApp", [])
        .controller("BlogController", BlogController)
        .directive("fileread", [function () {
            return {
                scope: {
                    fileread: "="
                },
                link: function (scope, element, attributes) {
                    element.bind("change", function (changeEvent) {
                        var reader = new FileReader();
                        reader.onload = function (loadEvent) {

                            $('#image').attr('src', loadEvent.target.result);
                            $('#image').attr('width', 600);

                            scope.$apply(function () {
                                scope.fileread = loadEvent.target.result;
                            });

                        };

                        reader.readAsDataURL(changeEvent.target.files[0]);

                    });
                }
            }
        }]);

    function BlogController($scope, $http) {

        $scope.createPost = createPost;
        $scope.deletePost = deletePost;
        $scope.editPost = editPost;
        $scope.updatePost = updatePost;

        function init() {
            getAllPosts();
        }
        init();

        function updatePost(post) {
            console.log(post);
            $http
                .put("/api/blogpost/"+post.id, post)
                .success(getAllPosts);
        }

        function editPost(postId) {
            $http
                .get("/api/blogpost/"+postId)
                .success(function(post){
                    $('#image').attr('src', post.image);
                    $('#image').attr('width', 600);
                    $scope.post = post;
                });
        }

        function deletePost(postId) {
            $http
                .delete("/api/blogpost/"+postId)
                .success(getAllPosts);
        }

        function getAllPosts() {
            $http
                .get("/api/blogpost")
                .success(function(posts){

                    $scope.posts = posts;
                })
                .error(function(response){
                    console.log("Failed to retrieve posts...");
            });
        }

        function createPost(post) {

            $http
                .post("/api/blogpost", post)
                .success(getAllPosts)
                .error(function(response){
                    console.log("Failed to create post...");
                });

        }
    }
})();
