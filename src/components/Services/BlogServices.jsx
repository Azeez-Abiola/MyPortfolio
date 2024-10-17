// Mock data
let posts = [
    {
      id: '1',
      title: 'Getting Started with React',
      content: '<p>React is a popular JavaScript library for building user interfaces...</p>',
      imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      excerpt: 'Learn the basics of React and start building your first application.',
      category: 'tech',
      published: true,
      comments: [],
    },
    {
      id: '2',
      title: 'TypeScript: The Future of JavaScript',
      content: '<p>TypeScript is a typed superset of JavaScript that compiles to plain JavaScript...</p>',
      imageUrl: 'https://images.unsplash.com/photo-1616469829941-c7200edec809?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      excerpt: 'Discover how TypeScript can improve your JavaScript development experience.',
      category: 'tech',
      published: false,
      comments: [],
    },
  ];
  
  export const fetchBlogPosts = async (showUnpublished = false) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filteredPosts = showUnpublished ? posts : posts.filter(post => post.published);
        resolve(filteredPosts);
      }, 500);
    });
  };
  
  export const fetchBlogPost = async (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const post = posts.find((p) => p.id === id);
        if (post) {
          resolve(post);
        } else {
          reject(new Error('Post not found'));
        }
      }, 500);
    });
  };
  
  export const createBlogPost = async (post) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newPost = { ...post, id: String(posts.length + 1), comments: [] };
        posts.push(newPost);
        resolve(newPost);
      }, 500);
    });
  };
  
  export const updateBlogPost = async (id, post) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = posts.findIndex((p) => p.id === id);
        if (index !== -1) {
          posts[index] = { ...posts[index], ...post };
          resolve(posts[index]);
        } else {
          reject(new Error('Post not found'));
        }
      }, 500);
    });
  };
  
  export const deleteBlogPost = async (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = posts.findIndex((p) => p.id === id);
        if (index !== -1) {
          posts.splice(index, 1);
          resolve();
        } else {
          reject(new Error('Post not found'));
        }
      }, 500);
    });
  };
  
  export const addComment = async (postId, comment) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const post = posts.find(p => p.id === postId);
        if (post) {
          const newComment = { ...comment, id: String(post.comments.length + 1), replies: [] };
          post.comments.push(newComment);
          resolve(newComment);
        } else {
          reject(new Error('Post not found'));
        }
      }, 500);
    });
  };
  
  export const addReply = async (postId, commentId, reply) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const post = posts.find(p => p.id === postId);
        if (post) {
          const comment = post.comments.find(c => c.id === commentId);
          if (comment) {
            const newReply = { ...reply, id: String(comment.replies.length + 1), replies: [] };
            comment.replies.push(newReply);
            resolve(newReply);
          } else {
            reject(new Error('Comment not found'));
          }
        } else {
          reject(new Error('Post not found'));
        }
      }, 500);
    });
  };