'use strict';

const RethinkdbWebsocketClient = require('rethinkdb-websocket-client');
const r = RethinkdbWebsocketClient.rethinkdb;
const Promise = RethinkdbWebsocketClient.Promise;

const dbName = 'battledb';
const tb_players_name = 'players';
const tb_avatars_name = 'avatars';
const tb_games_name = 'games';
let query = '';

const options = {
  host: 'localhost',       // hostname of the websocket server
  port: 8015,             // port number of the websocket server
  path: '/db',               // HTTP path to websocket route
  secure: false,           // set true to use secure TLS websockets
  db: dbName,              // default database, passed to rethinkdb.connect
};

const connPromise = RethinkdbWebsocketClient.connect(options);

const run = (q) => (
    connPromise.then((c) => (
      q.run(c)
    ))
);

export const fetchPlayers = (filter) => {
  switch(filter){
    case 'all':
      query = r.table(tb_players_name).merge(function (player) {
        return {
            games: r.table(tb_games_name).getAll(player('id'),
                {index: 'player_id'}).orderBy(r.desc('createdAt')).coerceTo('array')
        }
      });
      break;
    case 'male':
      query = r.table(tb_players_name).filter(r.row('gender').eq("M")).merge(function (player) {
        return {
            games: r.table(tb_games_name).getAll(player('id'),
                {index: 'player_id'}).orderBy(r.desc('createdAt')).coerceTo('array')
        }
      });
      break;
    case 'female':
      query = r.table(tb_players_name).filter(r.row('gender').eq("F")).merge(function (player) {
        return {
            games: r.table(tb_games_name).getAll(player('id'),
                {index: 'player_id'}).orderBy(r.desc('createdAt')).coerceTo('array')
        }
      });
      break;
    default:
        throw new Error('Unknown filter: ${filter}');
  }

  return run(query).catch((err) => err).then((cursor) => (
    cursor.toArray().then((results) => results)
  ));
};

export const fetchPlayer = (id) => {
  query = r.table(tb_players_name).get(id).merge(function(player){
    return {
      games: r.table(tb_games_name).getAll(player('id'),
        {index: 'player_id'}).orderBy(r.desc('createdAt')).coerceTo('array')
    }
  });
  return run(query).catch((err) => err).then((result) => result);
}

export const addPlayer = (playerObj) => {  
  const player = {
    first_name: playerObj.first_name,
    last_name: playerObj.last_name,
    gender: playerObj.gender,
    avartar_base64: playerObj.avartar_base64
  };

  query = r.table(tb_players_name).insert(player);
  return run(query)
    .catch((err) => err)
    .then((result) => {
      let key = result.generated_keys[0];
      query = r.table(tb_players_name).get(key);
      return run(query).catch((err) => err).then((results)=>results);
    });
};

export const updateScore = (playerId) => {
  query = r.table(tb_players_name).get(playerId).update({score: r.row('score').add(10)});
  return run(query)
    .catch((err) => err)
    .then((results) => {
      query = r.table(tb_players_name).get(playerId);
      return run(query).catch((err) => err).then((results)=>results);
    });
};

export const editPlayerScore = (playerId, score) => {
  query = r.table(tb_players_name).get(playerId).update({score: score});
  return run(query)
    .catch((err) => err)
    .then((results) => {
      query = r.table(tb_players_name).get(playerId);
      return run(query).catch((err) => err).then((results)=>results);
    });
}

export const fetchAvatars = () => {
  query = r.table(tb_avatars_name);

  return run(query).catch((err) => err).then((cursor) => (
    cursor.toArray().then((results) => results)
  ));
}

export const getAvatar = (id) => {
  query = r.table(tb_avatars_name).get(id);
  return run(query).catch((err) => err).then((cursor) => (
    cursor.toArray().then((result) => result)
  ));
}

export const addGame = (game) => {
  query = r.table(tb_games_name).insert(game);
  return run(query)
    .catch((err) => err)
    .then((result) => result);
}