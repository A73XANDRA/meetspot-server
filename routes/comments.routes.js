const router = require("express").Router()

const Comment = require('./../models/Comment.model')
const isAuthenticated = require('./../middleware/verifyToken')

router.get("/", isAuthenticated, (req, res, next) => {

    Comment
        .find()
        .then(comments => res.json(comments))
        .catch(err => next(err))
})

router.post("/post/:postId", isAuthenticated, (req, res, next) => {

    const { _id: owner } = req.payload
    const { postId: post } = req.params
    const { text } = req.body

    Comment
        .create({ owner, post, text })
        .then((newComment) => res.json(newComment))
        .catch(err => next(err))
})

router.get("/post/:postId", isAuthenticated, (req, res, next) => {

    const { postId } = req.params

    Comment
        .find({ post: postId })
        .populate('owner')
        .then((comments) => res.json(comments))
        .catch(err => next(err))
})

router.put("/:commentId", isAuthenticated, (req, res, next) => {

    const { commentId } = req.params
    const { post, text } = req.body

    Comment
        .findByIdAndUpdate(commentId, { post, text }, { new: true })
        .then((comment) => res.json(comment))
        .catch(err => next(err))
})

router.delete("/:commentId", isAuthenticated, (req, res, next) => {

    const { commentId } = req.params

    Comment
        .findByIdAndDelete(commentId)
        .then((comment) => res.json(comment))
        .catch(err => next(err))
})

router.put("/post/:postId/like", isAuthenticated, (req, res, next) => {

    const { postId } = req.params
    const { _id: userId } = req.payload

    Comment
        .findByIdAndUpdate(postId, { $push: { likes: userId } }, { new: true })
        .then((comment) => res.json(comment))
        .catch(err => next(err))
})

router.put("/post/:postId/unlike", isAuthenticated, (req, res, next) => {

    const { postId } = req.params
    const { _id: userId } = req.payload

    Comment
        .findByIdAndUpdate(postId, { $pull: { likes: userId } }, { new: true })
        .then((comment) => res.json(comment))
        .catch(err => next(err))
})




module.exports = router