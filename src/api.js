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

const delay = (ms) =>
    new Promise(resolve => setTimeout(resolve, ms));

export const fetchPlayers = (filter) => {
  switch(filter){
    case 'all':
      query = r.table('players');
      break;
    case 'male':
      query = r.table('players').filter(r.row('gender').eq("M"));
      break;
    case 'female':
      query = r.table('players').filter(r.row('gender').eq("F"));
      break;
    default:
        throw new Error('Unknown filter: ${filter}');
  }
  return run(query)
    .catch((err) => (err))
    .then((cursor) => (
      cursor.toArray().then((results) => (
        results
      ))
    ));
};

export const addPlayer = (playerObj) => 
  delay(500).then(() => {
    const player = {
      id: v4(),
      first_name: playerObj.first_name,
      last_name: playerObj.last_name,
      gender: 'M'
    };

    fakeDatabase.players.push(player);
    return player;
  });

export const updateScore = (playerId) =>
  delay(500).then(() => {
    const player = fakeDatabase.players.find(p => p.id === playerId);
    player.score += 1;
    return player; 
  });

