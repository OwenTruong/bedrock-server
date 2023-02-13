# bedrock-server

### Description

A Docker app with two services: one service for setting server.properties and starting the bedrock_server, and another service for creating periodic backups.

## "bedrock-server" Service

Everything should be automatic and default environments for server.properties are provided. If you need to make changes to server.properties, there are three ways:

- Create a .env file and add any properties you would like to change in there.
- Modify the default environments directly in the docker-compose.yml file.
- Set environment variables like this: "MAX_PLAYER=10 docker compose up"

## "create-backups" Service

create-backups will create backups of the world running periodically. You can set the directory it backups to, the # of backups you would like and how often to back up in minutes.

### Environment Variables (and Defaults)

- BACKUP_PATH -> ./backups
- BACKUP_TIME -> 5
- NUM_OF_BACKUPS -> 15

Just like for "bedrock-server", there are three ways to set environment variables.

- Inline example:
  - BACKUP_PATH=~/mybackups docker compose up
    - This will back up your world to a directory called mybackups in the current user's directory.
  - BACKUP_TIME=0.9 docker compose up
    - Sets the timer to backup every 0.9 minute, or roughly every 54 seconds.
  - NUM_OF_BACKUPS=5 docker compose up
    - Sets to 5 max backup instead of the default 15.

### Things To Look Out For

- A way to delete the worlds in the "current" volume is not provided to prevent the accidental deletion of a world. Please delete the "current" volume manually using docker volume rm command.
- The configuration for IP worked for me, but may not work for you if your local IP is different from 192.168.1.X. Please change the subnet, ip_range and gateway if needed be in networks->bedrock->ipam->config.
