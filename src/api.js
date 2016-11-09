'use strict';

const RethinkdbWebsocketClient = require('rethinkdb-websocket-client');
const r = RethinkdbWebsocketClient.rethinkdb;
const Promise = RethinkdbWebsocketClient.Promise;

const dbName = 'battledb';
const tb_players_name = 'players';
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
      query = r.table(tb_players_name);
      break;
    case 'male':
      query = r.table(tb_players_name).filter(r.row('gender').eq("M"));
      break;
    case 'female':
      query = r.table(tb_players_name).filter(r.row('gender').eq("F"));
      break;
    default:
        throw new Error('Unknown filter: ${filter}');
  }

  return run(query).catch((err) => err).then((cursor) => (
    cursor.toArray().then((results) => results)
  ));
};

export const addPlayer = (playerObj) => {  
  const player = {
    first_name: playerObj.first_name,
    last_name: playerObj.last_name,
    gender: playerObj.gender,
    score: 1500
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
  

