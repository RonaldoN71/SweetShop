const multer = require("multer");

const storage = multer.memoryStorage(); // file kept in RAM temporarily

const upload = multer({ storage });

module.exports = upload;
