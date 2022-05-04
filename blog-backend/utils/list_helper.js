const dummy = (a) => {
  if (a || !a) return 1;
};

const totalLikes = (blogArrayOfObjects) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes;
  };

  return blogArrayOfObjects.reduce(reducer, 0);
};
  
module.exports = {
  dummy, totalLikes
};