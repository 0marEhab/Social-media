const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:5173",
  },
});

let users = [];

// Add or update user in the list
const addUser = (userId, socketId) => {
  const existingUser = users.find((user) => user.userId === userId);
  if (existingUser) {
    existingUser.socketId = socketId; // Update socketId for reconnected user
  } else {
    users.push({ userId, socketId });
  }
};

// Remove user when disconnected
const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

// Get user by userId
const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  // When a user connects
  console.log("A user connected.");

  // Take userId and socketId from user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users); // Emit updated users list
  });

  // Send and get message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    if (user) {
      io.to(user.socketId).emit("getMessage", {
        senderId,
        text,
      });
    }
  });

  // When a user disconnects
  socket.on("disconnect", () => {
    console.log("A user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users); // Emit updated users list
  });
});
