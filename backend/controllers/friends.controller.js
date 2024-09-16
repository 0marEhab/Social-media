const User = require('../models/User');

const sendFriendRequest = async (req, res) => {
  try {
    const { recipientId } = req.body;
    const requesterId = req.user.id;

    const requester = await User.findById(requesterId);
    const recipient = await User.findById(recipientId);

    if (!requester || !recipient) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (requesterId === recipientId) {
      return res.status(400).json({ message: 'Cannot send friend request to yourself' });
    }
    if (requester.friends.includes(recipientId) || recipient.friends.includes(requesterId)) {
      return res.status(400).json({ message: 'Already friends' });
    }
    if (recipient.friendRequests.includes(requesterId)) {
      return res.status(400).json({ message: 'Friend request already sent' });
    }
    if (requester.requestedFriends.includes(recipientId)) {
      return res.status(400).json({ message: 'Friend request already received' });
    }

    recipient.friendRequests.push(requesterId);
    requester.requestedFriends.push(recipientId);

    await recipient.save();
    await requester.save();

    res.status(200).json({ message: 'Friend request sent' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};

const acceptFriendRequest = async (req, res) => {
  try {
    const { requesterId } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);
    const requester = await User.findById(requesterId);

    if (!user || !requester) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.friendRequests.includes(requesterId)) {
      return res.status(400).json({ message: 'Friend request does not exist' });
    }

    user.friendRequests.pull(requesterId);
    user.friends.push(requesterId);

    requester.requestedFriends.pull(userId);
    requester.friends.push(userId);

    await user.save();
    await requester.save();

    res.status(200).json({ message: 'Friend request accepted' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};

const rejectFriendRequest = async (req, res) => {
  try {
    const { requesterId } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);
    const requester = await User.findById(requesterId);

    if (!user || !requester) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.friendRequests.includes(requesterId)) {
      return res.status(400).json({ message: 'Friend request does not exist' });
    }

    user.friendRequests.pull(requesterId);
    requester.requestedFriends.pull(userId);

    await user.save();
    await requester.save();

    res.status(200).json({ message: 'Friend request rejected' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};

const getFriendRequests = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).populate('friendRequests', 'name email profilePic');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user.friendRequests);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};

const getFriends = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).populate('friends', 'name email profilePic');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user.friends);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};


const getSentRequests = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).populate('requestedFriends', 'name email profilePic');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user.requestedFriends);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};

const deleteSentRequest = async (req, res) => {
  try {
    const { recipientId } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);
    const recipient = await User.findById(recipientId);

    if (!user || !recipient) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.requestedFriends.includes(recipientId)) {
      return res.status(400).json({ message: 'Friend request does not exist' });
    }

    user.requestedFriends.pull(recipientId);
    recipient.friendRequests.pull(userId);

    await user.save();
    await recipient.save();

    res.status(200).json({ message: 'Sent friend request deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};



module.exports = {
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  getFriendRequests,
  getFriends,
  getSentRequests,
  deleteSentRequest
};
