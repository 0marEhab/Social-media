
const urlDomain = "http://localhost:3000";
const summaryApi = {
  domain: {
    url: "http://localhost:3000",
  },
  login: {
    url: `${urlDomain}/api/login`,
  },
  editProfile: {
    url: `${urlDomain}/api/editUser`,
  },
  editProfilePic: {
    url: `${urlDomain}/api/update-profile-pic`,
  },
  signup: {
    url: `${urlDomain}/api/signup`,
  },
  getConversation: {
    url: `${urlDomain}/api/getConversation/`,
  },
  getUserById: {
    url: `${urlDomain}/api/getUserById`,
  },

  getMessage: {
    url: `${urlDomain}/api/getMessage`,
  },
  postMessage: {
    url: `${urlDomain}/api/sendMessage`,
  },
  home: {
    url: `${urlDomain}/`,
  },
  post: {
    url: `${urlDomain}/api/posts/:id`,
  },
  posts: {
    url: `${urlDomain}/api/posts`,
  },
  like: {
    url: `${urlDomain}/api/posts/like/:id`,
  },
  addComment: {
    url: `${urlDomain}/api/posts/comment/:id`,
  },
  likeComment: {
    url: `${urlDomain}/api/posts/:id/comment/:commentId/like`,
  },
  delete: {
    url: `${urlDomain}/api/posts/:id`,
  },
  update: {
    url: `${urlDomain}/api/posts/:id`,
  },
  create: {
    url: `${urlDomain}/api/posts`,
  },
  user: {
    url: `${urlDomain}/api/getUser`,
  },
  share: {
    url: `${urlDomain}/api/posts/share/:id`,
  },
  createTicket: {
    url: `${urlDomain}/api/createTicket`,
  },
  myFriends: {
    url: `${urlDomain}/api/friends/get`,
  },
  suggestions: {
    url: `${urlDomain}/api/friends/suggestions`,
  },
  reportPost: {
    url: `${urlDomain}/api/posts/reportPost/:id`,
  },
  deleteComment: {
    url: `${urlDomain}/api/posts/:id/comment/:commentId`,
  },
  editComment: {
    url: `${urlDomain}/api/posts/:id/comment/:commentId/edit`,
  },
  replyComment: {
    url: `${urlDomain}/api/posts/:id/comment/:commentId/reply`,
  }
};

export default summaryApi;
