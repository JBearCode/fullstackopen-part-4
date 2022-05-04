var groupBy = require('lodash/groupby');

const totalLikes = (blogArrayOfObjects) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes;
  };

  return blogArrayOfObjects.reduce(reducer, 0);
};

const favoriteBlog = (blogArrayOfObjects) => {
  const reducer = (previous, current) => {
    return previous.likes > current.likes ? previous : current;
  };

  const fullFavoriteObject = blogArrayOfObjects.reduce(reducer, 0);

  return (({ title, author, likes }) => ({ title, author, likes }))(fullFavoriteObject);
};

const mostBlogs = (blogArrayOfObjects) => {
  const reducer = (previous, current) => {
    return previous.length > current.length ? previous : current;
  };

  const grouped = groupBy(blogArrayOfObjects, 'author');
  const entries = Object.entries(grouped);
  const reduced = entries.reduce(reducer, 0);
  const authorBlogsObject = {
    author: reduced[0],
    blogs: reduced[1].length
  };

  return authorBlogsObject;
};

const mostLikes = (blogArrayOfObjects) => {
  const reduceLikes = (total, current) => {
    return total + current.likes;
  };
  
  const reduceAuthors = (previous, current) => {
    if (previous[1] == undefined) {
      return current;
    }
    const previousTotal = previous[1].reduce(reduceLikes, 0);
    const currentTotal = current[1].reduce(reduceLikes, 0);
    return previousTotal > currentTotal ? previous : current;
  };
  
  const grouped = groupBy(blogArrayOfObjects, 'author');
  const entries = Object.entries(grouped);
  const reduced = entries.reduce(reduceAuthors, 0);
  const winnerTotalLikes = reduced[1].reduce((total, current) => total + current.likes, 0);

  const authorLikesObject = {
    author: reduced[0],
    likes: winnerTotalLikes
  };

  return authorLikesObject;
};

  
module.exports = {
  totalLikes, favoriteBlog, mostBlogs, mostLikes
};