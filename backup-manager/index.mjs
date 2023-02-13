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

/*******************
 * ENVIRONMENTAL CONSTANTS
 *******************/
const BACKUP_PATH = process.env.BACKUP_PATH;
const CURRENT_PATH = process.env.CURRENT_WORLD_PATH;
const BACKUP_TIME = process.env.BACKUP_TIME;
const NUM_OF_BACKUPS = process.env.NUM_OF_BACKUPS;

/*******************
 * HELPER FUNCTIONS
 *******************/

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
 *
 * @param {string[]} paths -> path of the directories (need to make sure all of the directories are in the same parent directory)
 * @returns {string[]} names of files sorted in chronological order
 */

/**
 *
 * @param {string} parentDirPath
 * @param {number} index -> Index of 0 represents the first element, index of -1 represents the last element
 * @returns {string}
 */
const getChildDirPathOf = (parentDirPath, index) => {
  const sortDirs = (paths) =>
    paths
      .map((path) => ({
        path,
        time: fs.statSync(path).mtime.getTime(),
      }))
      .sort((a, b) => a.time - b.time)
      .map((dir) => dir.path);

  const childDirPaths = fs
    .readdirSync(parentDirPath)
    .map((childName) => join(parentDirPath, childName));

  if (index === -1) return sortDirs(childDirPaths)[childDirPaths.length - 1];
  else return sortDirs(childDirPaths).slice(index, index + 1)[0];
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
      fs.rmSync(getChildDirPathOf(BACKUP_PATH, 0), {
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

/*******************
 * START HERE
 *******************/

(() => {
  const doesExist = (obj) => obj !== undefined;
  const isZero = (num) => num === 0;

  const CURRENT_WORLD_PATH = `${CURRENT_PATH}/Bedrock\ level`;
  const [current, ...otherCurrents] = getWorldNames(CURRENT_PATH);
  const backups = getWorldNames(BACKUP_PATH);
  const backupTimeInMin = BACKUP_TIME;
  const backupTimeInMS = backupTimeInMin * 60 * 1000;
  if (otherCurrents.length !== 0)
    throw new Error('current-world volume has more than 1 world');

  if (!doesExist(current) && isZero(backups.length))
    waitForWorldGeneration(
      500,
      setBackupTime.bind(null, backupTimeInMS, NUM_OF_BACKUPS)
    );
  else if (!doesExist(current) && !isZero(backups.length)) {
    fs.cpSync(getChildDirPathOf(BACKUP_PATH, -1), CURRENT_WORLD_PATH, {
      recursive: true,
    });
    setBackupTime(backupTimeInMS, NUM_OF_BACKUPS);
  } else if (doesExist(current)) setBackupTime(backupTimeInMS, NUM_OF_BACKUPS);
  else
    console.error(
      'Unknown Error while checking current-world volume and backups bind mount'
    );
})();
