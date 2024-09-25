const Post = require('../models/Post');

const getStats = async (req, res) => {
    try {
        const postCount = await Post.countDocuments();
        const likeCount = await Post.aggregate([
            {
                $project: {
                    numberOfLikes: { $size: "$likes" },
                },
            },
            {
                $group: {
                    _id: null,
                    totalLikes: { $sum: "$numberOfLikes" },
                },
            },
        ]);

        const commentCount = await Post.aggregate([
            {
                $project: {
                    numberOfComments: { $size: "$comments" },
                },
            },
            {
                $group: {
                    _id: null,
                    totalComments: { $sum: "$numberOfComments" },
                },
            },
        ]);

        res.status(200).json({
            posts: postCount,
            likes: likeCount.length > 0 ? likeCount[0].totalLikes : 0,
            comments: commentCount.length > 0 ? commentCount[0].totalComments : 0,
        });
    } catch (error) {
        console.error('Error retrieving stats:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getStats,
};
