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
  'tick-distance': process.env.TICK_DISTANCE,
  'player-idle-timeout': process.env.PLAYER_IDLE_TIMEOUT,
  'max-threads': process.env.MAX_THREADS,
  'level-name': 'Bedrock level',
  'level-seed': process.env.LEVEL_SEED,
  'default-player-permission-level':
    process.env.DEFAULT_PLAYER_PERMISSION_LEVEL,
  'texturepack-required': process.env.TEXTUREPACK_REQUIRED,
  'content-log-file-enabled': process.env.CONTENT_LOG_FILE_ENABLED,
  'compression-threshold': process.env.COMPRESSION_THRESHOLD,
  'compression-algorithm': process.env.COMPRESSION_ALGORITHM,
  'server-authoritative-movement': process.env.SERVER_AUTHORITATIVE_MOVEMENT,
  'player-movement-score-threshold':
    process.env.PLAYER_MOVEMENT_SCORE_THRESHOLD,
  'player-movement-action-direction-threshold':
    process.env.PLAYER_MOVEMENT_ACTION_DIRECTION_THRESHOLD,
  'player-movement-distance-threshold':
    process.env.PLAYER_MOVEMENT_DISTANCE_THRESHOLD,
  'player-movement-duration-threshold-in-ms':
    process.env.PLAYER_MOVEMENT_DURATION_THRESHOLD_IN_MS,
  'correct-player-movement': process.env.CORRECT_PLAYER_MOVEMENT,
  'server-authoritative-block-breaking':
    process.env.SERVER_AUTHORITATIVE_BLOCK_BREAKING,
  'chat-restriction': process.env.CHAT_RESTRICTION,
  'disable-player-interaction': process.env.DISABLE_PLAYER_INTERACTION,
};

(() => {
  let str = '';

  Object.entries(props).forEach(([key, value]) => {
    str += `${key}=${value}\n`;
  });

  fs.writeFileSync('./bedrock-server/server.properties', str);
})();
