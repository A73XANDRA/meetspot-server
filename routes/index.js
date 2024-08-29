module.exports = app => {

  const postsRouter = require("./posts.routes")
  app.use("/api/posts", postsRouter)

  const commentsRouter = require("./comments.routes")
  app.use("/api/comments", commentsRouter)

  const profileRouter = require("./profile.routes")
  app.use("/api/profile", profileRouter)

  const authRouter = require("./auth.routes")
  app.use("/api/auth", authRouter)

  const uploadRoutes = require("./upload.routes")
  app.use("/upload", uploadRoutes)
}
