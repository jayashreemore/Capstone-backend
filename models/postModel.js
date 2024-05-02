const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Movie name is required"],
        },
        prince: {
            type: String,
            required: [true, "Prince name is required"],
        },
        princess: {
            type: String,
            required: [true, "princess is required"],
        },
        content: {
            type: String,
            required: [true, "Movie story description is required"],
        },
        postedBy: {
            type: ObjectId,
            ref: "User",
        },
        image: {
            url: String,
            public_id: String,
        },
        likes: [{ type: ObjectId, ref: "User" }],
        comments: [
            {
                text: String,
                created: { type: Date, default: Date.now },
                postedBy: {
                    type: ObjectId,
                    ref: "User",
                },
            },
        ],
    },
    { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);