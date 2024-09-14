const fs = require("fs");
const path = require("path");
const tesseract = require("node-tesseract-ocr");

const uploadsDir = path.join(__dirname, "uploads");

const config = {
    lang: "spa",
    // oem: 1,
    // psm: 3,
};

fs.readdir(uploadsDir, (err, files) => {
    if (err) {
        console.error("Could not list the directory.", err);
        process.exit(1);
    }

    files.forEach((file, index) => {
        const filePath = path.join(uploadsDir, file);

        tesseract
            .recognize(filePath, config)
            .then((text) => {
                console.log(`Text from ${file}: ${text}`);
            })
            .catch((err) => {
                console.error(`Error processing ${file}:`, err);
            });
    });
});
