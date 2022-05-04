const dummy = (a) => {
  if (a || !a) return 1;
};

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
  
module.exports = {
  dummy, totalLikes, favoriteBlog
};