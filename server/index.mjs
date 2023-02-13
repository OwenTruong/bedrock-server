import fs from 'fs';

const props = {
  'server-name': process.env.SERVER_NAME,
  gamemode: process.env.GAMEMODE,
  'force-gamemode': process.env.FORCE_GAMEMODE,
  difficulty: process.env.DIFFICULTY,
  'allow-cheats': process.env.ALLOW_CHEATS,
  'max-players': process.env.MAX_PLAYER,
  'online-mode': process.env.ONLINE_MODE,
  'allow-list': process.env.ALLOW_LIST,
  'server-port': process.env.SERVER_PORT,
  'server-portv6': process.env.SERVER_PORTV6,
  'enable-lan-visibility': process.env.ENABLE_LAN_VISIBILITY,
  'view-distance': process.env.VIEW_DISTANCE,
  'tick-distance': 4,
  'player-idle-timeout': 0,
  'max-threads': 0,
  'level-name': 'Bedrock level',
  'level-seed': '',
  'default-player-permission-level': 'member',
  'texturepack-required': 'true',
  'content-log-file-enabled': 'false',
  'compression-threshold': 1,
  'compression-algorithm': 'zlib',
  'server-authoritative-movement': 'server-auth',
  'player-movement-score-threshold': 20,
  'player-movement-action-direction-threshold': 0.85,
  'player-movement-distance-threshold': 0.3,
  'player-movement-duration-threshold-in-ms': 500,
  'correct-player-movement': false,
  'server-authoritative-block-breaking': false,
  'chat-restriction': 'None',
  'disable-player-interaction': false,
};

(() => {
  let str = '';

  Object.entries(props).forEach(([key, value]) => {
    str += `${key}=${value}\n`;
  });

  fs.writeFileSync('./server.properties', str);
})();
