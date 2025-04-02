// To import we use require which is common js

const fs = require("fs");

// To read file

// fs.readFile("./example.txt", (err, data) => {
//   if (err) {
//     console.log("error", err);
//     return;
//   }

//   console.log("the data us", data.toString());
// });

const content = "Hello world need to be added into example 1";

// Create a file
// fs.writeFile("./example1.txt", content, (err, data) => {
//   if (err) {
//     console.log("error", err);
//     return;
//   }

//   console.log("file has been written");
// });

// To rename file

// fs.rename("./new-file.txt", "./old-file.txt", (err) => {
//   if (err) {
//     console.log("error", err);
//     return;
//   }

//   console.log("file name has been changed");
// });

// To delete file

// fs.unlink("./old-file.txt", (err) => {
//   if (err) {
//     console.log("error", err);
//     return;
//   }

//   console.log("file has been deleted");
// });

// To update file

// fs.appendFile("./example.txt", content, (err) => {
//   if (err) {
//     console.log("error", err);
//     return;
//   }

//   console.log("file has been updated");
// });

// To check stats of file

// fs.stat("./example.txt", (err, stats) => {
//   if (err) {
//     console.log("error", err);
//     return;
//   }

//   console.log(stats);
// });

// TO create directory

const directoryName = "./my-directory/file2";

// fs.mkdir(directoryName, (err) => {
//   if (err) {
//     console.log("Error", err);
//     return;
//   }

//   console.log("Directory has been created");
// });

// To delete directory

// fs.rmdir(directoryName, (err) => {
//   if (err) {
//     console.log("Error", err);
//     return;
//   }

//   console.log("Directory has been deleted");
// });

// To remove all folders in dierctory

// fs.rmdir(directoryName, { recursive: true }, (err) => {
//   if (err) {
//     console.log("Error", err);
//     return;
//   }

//   console.log("Directory has been deleted");
// });

// To check is directory exists

// Sync
// if (fs.existsSync(directoryName)) {
//   console.log("file exists", directoryName);
// } else {
//   console.log("not file exists", directoryName);
// }

// Async

// fs.access(directoryName, fs.constants.F_OK, (err) => {
//   if (err) {
//     console.log("Error", err);
//   }

//   console.log("file exists");
// });

// const path = require("path");

// const filename = path.basename("/path/to/file.txt");
// console.log(filename);
// const dirname = path.dirname("/path/to/file.txt");
// console.log(dirname);
// const extension = path.extname("/path/to/file.txt");
// console.log(extension);

// const pathInfo = path.parse("path/to/file.txt");
// console.log(pathInfo);

// const isAbsoulte1 = path.isAbsolute("./path/to/file.txt");
// console.log(isAbsoulte1);

// const isAbsoulte2 = path.isAbsolute("/path/to/file.txt");
// console.log(isAbsoulte2);

// Copy one file to another
const sourcePath = "./my-directory/file1/sourceFile.txt";
const destinationPath = "./my-directory/file1/destinationFile.txt";

// fs.readFile(sourcePath, (err, data) => {
//   if (err) {
//     console.log(err);
//     return;
//   }

//   fs.writeFile(destinationPath, data.toString(), (err) => {
//     if (err) {
//       console.log(err);
//       return;
//     }

//     console.log("Data copuied");
//   });
// });

const readStream = fs.createReadStream(sourcePath);
const writeStream = fs.createWriteStream(destinationPath);

readStream.pipe(writeStream);

readStream.on("error", (err) => {
  console.log("error while reading file", err);
});

writeStream.on("error", (err) => {
  console.log("error while writeStream file", err);
});

writeStream.on("finish", (err) => {
  console.log("file copy successfully");
});
