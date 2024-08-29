const { Schema, model } = require("mongoose")

const postSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'The Post needs an owner Id.']
    },
    images: [{
      type: String,
      required: [true, 'You need to upload one image at least.']
    }],
    description: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now
    },
    comments: [{
      type: Schema.Types.ObjectId,
      ref: 'Comment'
    }],
    categories: [{
      type: String,
      enum: ['Nature', 'Lifestyle', 'Technology', 'Food', 'Sport', 'Health', 'Travel', 'Business', 'Music', 'Art', 'Beach', 'Pubs'],
      required: [true, 'Choose one Category at least.']
    }],
    likes: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }]
  },
  {
    timestamps: true
  }
)

const Post = model("Post", postSchema)

module.exports = Post