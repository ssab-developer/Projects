const multer = require('multer');
const path = require('path');
const { nanoid } = require('nanoid');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), "uploads"))
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname + '-' + nanoid(10))
    }
});

const upload = multer({ storage: storage })

module.exports = {
    upload
};