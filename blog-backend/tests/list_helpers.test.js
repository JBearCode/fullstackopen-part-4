const listHelper = require('../utils/list_helper');

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
];

const manyBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 11,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }  
];

describe('total likes', () => {
  
  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });

  test('when list has many blogs, equals the likes of all blogs', () => {
    const result = listHelper.totalLikes(manyBlogs);
    expect(result).toBe(47);
  });
});

describe('smaller object with most likes', () => {
  const smallerObject1 = {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    likes: 5
  };

  const smallerObject2 = {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    likes: 12
  };

  test('when list has only one blog, returns smaller object', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog);
    expect(result).toEqual(smallerObject1);
  });
  
  test('when list has many blogs, returns smaller object of one blog with most likes', () => {
    const result = listHelper.favoriteBlog(manyBlogs);
    expect(result).toEqual(smallerObject2);
  });
});

describe('find author with most blogs', () => {
  const firstObject = {
    author: 'Edsger W. Dijkstra',
    blogs: 1
  };
  
  const secondObject = {
    author: 'Robert C. Martin',
    blogs: 3
  };
  
  test('when list has only one blog, return object with author and 1', () => {
    const result = listHelper.mostBlogs(listWithOneBlog);
    expect(result).toEqual(firstObject);
  });

  test('when list has many blogs, return object with author and number of blogs', () => {
    const result = listHelper.mostBlogs(manyBlogs);
    expect(result).toEqual(secondObject);
  });
});

describe('find author with most likes', () => {
  const firstObject = {
    author: 'Edsger W. Dijkstra',
    likes: 5
  };
    
  const secondObject = {
    author: 'Robert C. Martin',
    likes: 23
  };
  
  test('across one blog', () => {
    const result = listHelper.mostLikes(listWithOneBlog);
    expect(result).toEqual(firstObject);
  });

  test('across many blogs', () => {
    const result = listHelper.mostLikes(manyBlogs);
    expect(result).toEqual(secondObject);
  });
});