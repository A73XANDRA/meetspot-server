const router = require("express").Router()

const uploaderMiddleware = require("../middleware/uploader.middleware")

router.post('/image', uploaderMiddleware.array('imageData'), (req, res) => {

  if (!req.files) {
    res.status(500).json({ errorMessage: 'Error cargando el archivo' })
    return
  }

  const images = req.files.map(elm => elm.path)

  res.json({ cloudinary_urls: images })
})

module.exports = router