const { Schema, model } = require("mongoose")

const commentSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'The Comment need to be associated to an User Id.']
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
      required: [true, 'The Comment need to be associated to a Post Id.']
    },
    text: {
      type: String,
      required: [true, 'The comment cant be empty.']
    },
    likes: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }]
  },
  {
    timestamps: true
  }
)

const Comment = model("Comment", commentSchema)

module.exports = Comment