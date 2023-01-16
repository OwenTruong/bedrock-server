import fs from 'fs';

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

const getFileNames = (dirPath) => fs.readdirSync(dirPath);
// TODO: Figure out a way to get the last modified time of each file

(() => {
  const [worldName] = getFileNames('/current');
  const backupNames = getFileNames('/backups');

  if (worldName === undefined) {
    if (backupNames.length === 0) console.log('Wait and then move onto next step');
    else console.log('Load the most recent backup to current-world')
  } else {
    console.log('Move onto next step');
  }
})();