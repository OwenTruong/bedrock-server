import fs from "fs";
import { join } from "path";

/* At Start */
// There is no world in current-world
// There are no backup worlds
// Wait for ./bedrock_server to create a new world
// There is at least 1 backup world
// Load the most recent backup to current-world
// There is a world in current-world
// There are no backup worlds
// Use current-world
// There is at least 1 backup world
// Use current-world

/* All other cases */
// setInterval to copy the dir in /current to /backups and name it with the current time.

// current
// backups

const backupPath = "/backup";
const currentPath = "/current";

const getFileNames = (dirPath) => fs.readdirSync(dirPath);
// TODO: Figure out a way to get the last modified time of each file

const getLastModified = (dirPath) => {
  const files = fs.readdirSync(dirPath);
  return files
    .map((fileName) => ({
      name: fileName,
      time: fs.statSync(join(dirPath, fileName)).mtime.getTime(),
    }))
    .sort((a, b) => a.time - b.time)
    .map((fileName) => fileName.name)[files.length - 1];
};

const copyFile = (srcPath, dstPath) => fs.copyFileSync(srcPath, dstPath);

(() => {
  const [worldName] = getFileNames("/current");
  const backupNames = getFileNames("/backups");

  if (worldName === undefined) {
    if (backupNames.length === 0)
      console.log("Wait and then move onto next step");
    else console.log("Load the most recent backup to current-world");
  } else {
    console.log("Move onto next step");
  }
})();
