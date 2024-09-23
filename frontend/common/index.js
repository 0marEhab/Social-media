const urlDomain = "http://localhost:3000";

const summaryApi = {
  login: {
    url: `${urlDomain}/api/login`,
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
};
export default summaryApi;
