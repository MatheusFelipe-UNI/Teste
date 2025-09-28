const { unlink } = require("fs/promises");
const path = require("path");

async function deleteFile(fileName) {
   const dirUpload = "public/uploads";
   const filePath = path.join(dirUpload, fileName);
   await unlink(filePath);
   return true; 
}

module.exports = deleteFile;