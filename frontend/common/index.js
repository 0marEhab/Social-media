const urlDomain = "https://social-media-production-b27a.up.railway.app";
const summaryApi = {
  domain: {
    url: "https://social-media-production-b27a.up.railway.app",
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
  deleteProfile: {
    url: `${urlDomain}/api/deleteProfile`,
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
  deleteByAdmin: {
    url: `${urlDomain}/api/posts/admin/:id`,
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
  users: {
    url: `${urlDomain}/api/getUsers`,
  },
  tickets: {
    url: `${urlDomain}/api/tickets`,
  },
  stats: {
    url: `${urlDomain}/api/admin/stats`,
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
  sendReq: {
    url: `${urlDomain}/api/friends/request`,
  },
  fetchRequests: {
    url: `${urlDomain}/api/friends/myrequests`,
  },
  getFriendRequest: {
    url: `${urlDomain}/api/friends/requests`,
  },
  acceptFriendRequest: {
    url: `${urlDomain}/api/friends/accept`,
  },
  rejectFriendRequest: {
    url: `${urlDomain}/api/friends/reject`,
  },
  deleteFriend: {
    url: `${urlDomain}/api/friends/deleteFriend`,
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
  },
  reportedPosts: {
    url: `${urlDomain}/api/posts/reportedPosts`,
  },
  deleteUser: {
    url: `${urlDomain}/api/deleteUser/:id`,
  },
  getEvents: {
    url: `${urlDomain}/api/events`,
  },
  addEvent: {
    url: `${urlDomain}/api/events`,
  },
  deleteReply: {
    url: `${urlDomain}/api/posts/:id/comment/:commentId/reply/:replyId`,
  },
  editReply: {
    url: `${urlDomain}/api/posts/:id/comment/:commentId/reply/:replyId/edit`,
  },
  deletePostByAdmin: {
    url: `${urlDomain}/api/posts/admin/:id`,
  },
};

export default summaryApi;
