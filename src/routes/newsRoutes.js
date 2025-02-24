const express = require("express");
const multer = require("multer");
const { getNews, getNewsById, createNews, updateNews, deleteNews } = require("../controllers/newsController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.get("/", getNews);
router.get("/:id", getNewsById);
router.post("/", authMiddleware, upload.single("image"), createNews);
router.put("/:id", authMiddleware, upload.single("image"), updateNews);
router.delete("/:id", authMiddleware, deleteNews);

module.exports = router;
