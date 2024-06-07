const _ = require("lodash");

const dummy = (blogs) => {
  // array of blogs
  return 1;
};

function totalLikes(blogs) {
  if (blogs.length === 0) {
    return 0;
  } else {
    const sumOfLikes = blogs.reduce((accumulator, blog) => {
      return (accumulator += blog.likes);
    }, 0);
    //console.log('sumoflikes', sumOfLikes)
    return sumOfLikes;
  }
}

function favoriteBlog(blogs) {
  const mostLiked = blogs.reduce((prev, current) =>
    +prev.likes > +current.likes ? prev : current,
  );
  delete mostLiked._id;
  delete mostLiked.__v;
  delete mostLiked.url;
  //console.log("mostlikedblog", mostLiked)
  return mostLiked;
}

function mostBlogs(blogs) {
  // return author with most blogs and amount of blogs

  const mostBlogsValues = _.chain(blogs) // wraps value
    .countBy("author") // { 'name1': 1, 'name2': 2, ..}, author name and count
    .entries() // [['name1', 1], ['name2', 2], ...]
    .maxBy(_.last) // get max by count
    .value(); // unwrap value

  const mostBlogs = {
    author: _.head(mostBlogsValues),
    blogs: _.last(mostBlogsValues),
  };

  return mostBlogs;
}

function mostLikes(blogs) {
  // return author whose blog posts have largest amount of likes

  // pick wanted properties (author, likes)
  // [{author: '', likes: 4}, {}, ...]
  const authorAndLikes = _.map(blogs, function (b) {
    return _.pick(b, ["author", "likes"]);
  });

  // convert into Map with reduce, sum likes
  const summedLikesMap = authorAndLikes.reduce((prev, current) => {
    let count = prev.get(current.author) || 0;
    prev.set(current.author, current.likes + count);
    return prev;
  }, new Map());
  // Map object back to an array
  const summedLikes = [...summedLikesMap].map(([author, likes]) => {
    return { author, likes };
  });

  // get the object with most amount of likes
  const mostLikes = _.maxBy(summedLikes, "likes");

  return mostLikes;
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
