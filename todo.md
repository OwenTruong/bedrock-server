## To Implement

Container for execution of ./bedrock_server and for environmental variable handling using nodejs (and add the abililty to choose to load currentVol or a backup from bind-mount

A container, "createBackupsContainer", making backups to a bind-mount, "backupDir", from a copy of currentVol

A volume, "currentVol", for currently loaded world (every single time project starts, minecraft should load from this volume unless specified in environment variable on if the user would like to grab the world from a bind mount)

A bind-mount directory, "backupDir", that contains all of the backups of the minecraft world

## Extras

A container, "sortPacks", sorting packs by behavior and resource packs from a bind-mount called "packsdir"
A bind-mount directory, "packsDir", that contains all of the resource and behavior packs in one directory.

A volume, "packs", for both behavior and resource packs.

## Next Actions

- Finish implementing the javascript for creating backups
