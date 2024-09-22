const urlDomain = "http://localhost:3000";
const summaryApi = {
  domain: {
    url: "http://localhost:3000",
  },
  login: {
    url: `${urlDomain}/api/login`,
  },
  signup: {
    url: `${urlDomain}/api/signup`,
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
};
export default summaryApi;
