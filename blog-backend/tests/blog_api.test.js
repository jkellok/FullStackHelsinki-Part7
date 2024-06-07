const { test, after, beforeEach, describe } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const helper = require("./test_helper");
const bcrypt = require("bcrypt");
const Blog = require("../models/blog");
const User = require("../models/user");

describe("when there is initially saved blog posts", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(helper.initialBlogPosts);
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({ username: "root", passwordHash });
    await user.save();
  });

  let token = null;

  // login to get token
  beforeEach(async () => {
    const response = await api.post("/api/login").send({
      username: "root",
      password: "sekret",
    });
    token = response.body.token;
  });

  test("correct amount of blog posts returned in JSON", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/blogs");
    assert.strictEqual(response.body.length, helper.initialBlogPosts.length);
  });

  test("unique identifier property of blog posts is named id", async () => {
    const response = await api.get("/api/blogs");
    assert(Object.keys(response.body[0]).includes("id"));
  });

  describe("adding a blog post", async () => {
    test("a valid blog post can be added", async () => {
      const newBlogPost = {
        title: "new blog post made",
        author: "developer",
        url: "http://localhost:3003",
        likes: 6,
      };

      await api
        .post("/api/blogs")
        .send(newBlogPost)
        .set("Authorization", `Bearer ${token}`)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const response = await api.get("/api/blogs");
      const titles = response.body.map((r) => r.title);

      assert.strictEqual(
        response.body.length,
        helper.initialBlogPosts.length + 1,
      );
      assert(titles.includes("new blog post made"));
    });

    test("adding a blog post without token is responded with code 401", async () => {
      const newBlogPost = {
        title: "new blog post made",
        author: "developer",
        url: "http://localhost:3003",
        likes: 6,
      };

      await api.post("/api/blogs").send(newBlogPost).expect(401);
    });

    describe("missing properties", () => {
      test("default likes property to zero if missing", async () => {
        const newBlogPost = {
          title: "new blog post made without likes",
          author: "developer",
          url: "http://localhost:3003",
        };

        await api
          .post("/api/blogs")
          .send(newBlogPost)
          .set("Authorization", `Bearer ${token}`)
          .expect(201)
          .expect("Content-Type", /application\/json/);

        const response = await api.get("/api/blogs");
        const likes = response.body.map((r) => r.likes);

        assert.strictEqual(likes[response.body.length - 1], 0);
      });

      test("if title propertiy missing, respond with 400", async () => {
        const newBlogPostWithoutTitle = {
          author: "developer",
          url: "http://localhost:3003",
          likes: 10,
        };

        await api
          .post("/api/blogs")
          .send(newBlogPostWithoutTitle)
          .set("Authorization", `Bearer ${token}`)
          .expect(400);

        const response = await api.get("/api/blogs");
        assert.strictEqual(
          response.body.length,
          helper.initialBlogPosts.length,
        );
      });

      test("if url property missing, respond with 400", async () => {
        const newBlogPostWithoutUrl = {
          title: "new blog post made without likes",
          author: "developer",
          likes: 10,
        };

        await api
          .post("/api/blogs")
          .send(newBlogPostWithoutUrl)
          .set("Authorization", `Bearer ${token}`)
          .expect(400);

        const response = await api.get("/api/blogs");
        assert.strictEqual(
          response.body.length,
          helper.initialBlogPosts.length,
        );
      });
    });
  });

  describe("deletion of a blog post", async () => {
    test("deleting a blog post succees with status code 204", async () => {
      // add a blog post first to get correct ownership
      const newBlogPost = {
        title: "new blog post made",
        author: "developer",
        url: "http://localhost:3003",
        likes: 6,
      };

      await api
        .post("/api/blogs")
        .send(newBlogPost)
        .set("Authorization", `Bearer ${token}`)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const blogsAtStart = await helper.blogsInDb();
      const blogToDelete = blogsAtStart[blogsAtStart.length - 1];

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(204);

      const blogsAtEnd = await helper.blogsInDb();
      assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1);
      const titles = blogsAtEnd.map((r) => r.title);
      assert(!titles.includes(blogToDelete.title));
    });
  });

  describe("updating a blog post", async () => {
    test("updating a blog post is saved", async () => {
      const blogAtStart = await helper.blogsInDb();
      const blogToUpdate = blogAtStart[0];
      const updatedLikes = 1234;
      blogToUpdate.likes = updatedLikes;

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(blogToUpdate)
        .expect(200);

      const response = await api.get("/api/blogs");
      assert.strictEqual(response.body[0].likes, updatedLikes);
    });
  });
});

after(async () => {
  await mongoose.connection.close();
});
