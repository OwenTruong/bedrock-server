import fs from 'fs';
import { basename, join } from 'path';

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

const doesExist = (obj) => obj !== undefined;
const isZero = (num) => num === 0;

const fileLog = (filePath, message) =>
  fs.writeFileSync(filePath, message, { flag: 'w' });

/**
 *
 * @param {string} dirPath
 * @returns {string[]}
 */
const getWorldNames = (dirPath) =>
  fs
    .readdirSync(dirPath)
    .filter((name) => fs.statSync(join(dirPath, name)).isDirectory());

/**
 * @param {string} dirPath
 * @returns {string} Returns the path of the last modified file/folder in the directory path, dirPath
 */
const getLastModifiedPath = (dirPath) => {
  const files = fs.readdirSync(dirPath);
  return join(
    dirPath,
    files
      .map((name) => ({
        name: name,
        time: fs.statSync(join(dirPath, name)).mtime.getTime(),
      }))
      .sort((a, b) => a.time - b.time)
      .map((file) => file.name)[0]
  );
};

/**
 *
 * @param {number} time
 * @param {number} maxBackups
 */
const setBackupTime = (time, maxBackups) => {
  const getDstPath = (currentWorldName) => {
    const date = new Date();
    return `${BACKUP_PATH}/${currentWorldName}-${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}--${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`;
  };

  setInterval(() => {
    const currentWorldPath =
      CURRENT_PATH + '/' + getWorldNames(CURRENT_PATH)[0];
    const currentWorldName = basename(currentWorldPath);

    if (getWorldNames(BACKUP_PATH).length >= maxBackups)
      fs.rmSync(getLastModifiedPath(BACKUP_PATH), {
        recursive: true,
        force: true,
      });

    fs.cpSync(currentWorldPath, getDstPath(currentWorldName), {
      recursive: true,
    });
  }, time);
};

/**
 *
 * @param {number} ms
 * @param {*} startBackups - setBackupTime but with all parameters filled out already
 */
const waitForWorldGeneration = (ms, startBackups) => {
  setTimeout(() => {
    if (getWorldNames(CURRENT_PATH).length != 0) startBackups();
    else waitForWorldGeneration(ms, startBackups);
  }, ms);
};

(() => {
  const [current, ...otherCurrents] = getWorldNames(CURRENT_PATH);
  const backups = getWorldNames(BACKUP_PATH);
  const backupTimeInMin = 20;
  const backupTimeInMS = backupTimeInMin * 60 * 1000;

  if (otherCurrents.length !== 0)
    throw new Error('current-world volume has more than 1 world');

  if (!doesExist(current) && isZero(backups.length))
    waitForWorldGeneration(500, setBackupTime.bind(null, backupTimeInMS, 15));
  else if (!doesExist(current) && !isZero(backups.length))
    console.log('Copy most recent world in /backups to /current');
  else if (doesExist(current)) setBackupTime(backupTimeInMS, 15);
  else
    console.error(
      'Unknown Error while checking current-world volume and backups bind mount'
    );
})();
