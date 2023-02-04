import fs from 'fs';
import { join } from 'path';

/* At Start */
// There is no world in current-world
// There are no backup worlds
// Wait for ./bedrock_server to create a new world (check every 500ms if there is a "Bedrock level" folder in current-world volume)
// There is at least 1 backup world
// Load the most recent backup to current-world
// There is a world in current-world
// There are no backup worlds
// Use current-world
// There is at least 1 backup world
// Use current-world

/*
No cur & no backup -> wait for ./bedrock_server to create new world
Yes cur & no backup -> Immediately backup cur to backup bind mount
No cur and yes backup -> Load last backup to cur
Yes cur and yes backup -> Immediately backup cur to backup bind mount

/* All other cases */
// setInterval to copy the dir in /current to /backups and name it with the current time.

// current
// backups

const BACKUP_PATH = '/backups';
const CURRENT_PATH = '/current';

const copyFile = (srcPath, dstPath) => fs.copyFileSync(srcPath, dstPath);
const doesExist = (obj) => obj !== undefined;
const isZero = (num) => num === 0;

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

const setBackupTime = (time) => {
  // Allow a total of 10 backup worlds. 1 daily backup (wont be deleted until the day after), 9 normal backups
  setInterval(() => {}, time);
};

(() => {
  const [current, ...otherCurrents] = getFileNames(CURRENT_PATH);
  const backups = getFileNames(BACKUP_PATH);

  if (otherCurrents.length !== 0)
    throw new Error('current-world volume has more than 1 world');

  if (!doesExist(current) && isZero(backups.length))
    console.log('SetInterval 500ms to check if /current has a filename');
  else if (!doesExist(current) && !isZero(backups.length))
    console.log('Copy most recent world in /backups to /current');
  else if (doesExist(current) && isZero(backups.length))
    console.log('SetInterval now and 20000ms backup /current to /backups');
  else
    console.error(
      'Unknown Error while checking current-world volume and backups bind mount'
    );
})();
