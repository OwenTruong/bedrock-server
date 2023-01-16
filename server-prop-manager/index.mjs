import { writeFileSync } from 'fs';

const props = {
  "server-name": "Dedicated Server",
  "gamemode": "survival",
  "force-gamemode": false,
  "difficulty": "normal",
  "allow-cheats": true,
  "max-players": 10,
  "online-mode": false,
  "allow-list": false, 
  "server-port": 19132,
  "server-portv6": 19133,
  "enable-lan-visibility": true,
  "view-distance": 32,
  "tick-distance": 4,
  "player-idle-timeout": 0,
  "max-threads": 0,
  "level-name": "Bedrock level",
  "level-seed": "",
  "default-player-permission-level": "member",
  "texturepack-required": "true",
  "content-log-file-enabled": "false",
  "compression-threshold": 1,
  "compression-algorithm": "zlib",
  "server-authoritative-movement": "server-auth",
  "player-movement-score-threshold": 20,
  "player-movement-action-direction-threshold": 0.85,
  "player-movement-distance-threshold": 0.3,
  "player-movement-duration-threshold-in-ms": 500,
  "correct-player-movement": false,
  "server-authoritative-block-breaking": false,
  "chat-restriction": "None",
  "disable-player-interaction": false
}

let str = '';

Object.entries(props).forEach(([key, value]) => {
  str += `${key}=${value}\n`
});

fs.writeFileSync('./props.txt', str);



