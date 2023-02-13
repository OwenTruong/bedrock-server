## To Implement

Container for execution of ./bedrock_server and for environmental variable handling using nodejs (and add the abililty to choose to load current or a backup from bind-mount)

A container making backups to a bind-mount, "backups", from a copy of current

A volume, "current", for currently loaded world (every single time project starts, minecraft should load from this volume unless specified in environment variable on if the user would like to grab the world from a bind mount)

A bind-mount directory, "backupDir", that contains all of the backups of the minecraft world

## Extras

A container, "sortPacks", sorting packs by behavior and resource packs from a bind-mount called "packsdir"
A bind-mount directory, "packsDir", that contains all of the resource and behavior packs in one directory.

A volume, "packs", for both behavior and resource packs.
