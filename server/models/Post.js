const { Schema, Types, model } = require('mongoose')
const dateFormat = require('../utils/dateFormat.js')

const postSchema = new Schema({
    postText: {
        type: String,
        required: true,
        minlength: 1
    },
    postTitle: {
        type: String,
        required: true,
        minlength: 1
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp)
    },
    postAuthor: {
        type: String,
        required: true
    },
    comments: [
        {
            commentText: {
                type: String,
                required: true,
                minlength: 1,
                maxlength: 280,
            },
            createdAt: {
                type: Date,
                default: Date.now,
                get: (timestamp) => dateFormat(timestamp),
            },
        },
    ]
})

postSchema.virtual('commentCount').get(function () {
    return this.comments.length
})

const Post = model('Post', postSchema)

module.exports = Post