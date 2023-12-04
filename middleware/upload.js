const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        let ext = path.extname(file.originalname)
        cb(null, Date.now() + ext)
    }
})

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
        const allowedMimes = ["image/jpg", "image/jpeg", "image/png", "image/webp", "image/svg"];
        if (allowedMimes.includes(file.mimetype)) {
            callback(null, true)
        } else {
            console.log("Only jpg, png, jpeg, webp images are supported")
            callback(null, false)
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 2
    }
})

module.exports = upload;