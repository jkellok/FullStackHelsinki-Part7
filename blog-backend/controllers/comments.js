const commentsRouter = require("express").Router();
const Comment = require("../models/comment");
const Blog = require("../models/blog")

commentsRouter.get("/:blogId/comments", async (request, response) => {
  const comments = await Comment.find({ blog: request.params.blogId}).populate("blog", { title: 1 });
  response.json(comments);
});

commentsRouter.post("/:blogId/comments", async (request, response) => {
  const body = request.body;
  const blogId = request.params.blogId

  if (body.content === undefined) {
    return response.status(400).json({ error: "content missing" });
  }

  const comment = new Comment({
    content: body.content,
    blog: blogId,
  });

  comment
    .save()
    .then(() => Blog.findById(request.params.blogId))
    .then((blog) => {
      blog.comments.push(comment)
      return blog.save();
    })
    .catch((error) => {
      console.log(error)
    })

  response.status(201).json(comment);
});

module.exports = commentsRouter;
