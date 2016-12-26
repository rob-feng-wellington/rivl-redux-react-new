'use strict';

var Promise = require('bluebird');
var r = require('rethinkdb-websocket-server').r;

var dbName = 'battledb';
var tb_players_name = 'players';
var tb_avatars_name = 'avatars';
var tb_games_name = 'games';

var connPromise = Promise.promisify(r.connect)({
    host: 'localhost',
    port: 28015,
    db: dbName,
});

function run(q) {
    return connPromise.then(function(c) {
        return q.run(c);
    });
}

function recreateDb(name) {
    return run(r.dbDrop(name))
        .catch(function(){})
        .then(function() { return run(r.dbCreate(name)); });
}

function recreateTable(name) {
  return run(r.tableDrop(name))
      .catch(function(){})
      .then(function() { return run(r.tableCreate(name)); });
}

function insertSampleData(name) {
  return run(r.table(name).insert([
          { first_name: "Rob", last_name: "Feng", gender: 'M', createdAt: + new Date()},
          { first_name: "Luke", last_name: "Chen", gender: 'M', createdAt: + new Date()},
          { first_name: "Hoken", last_name: "Guan", gender: 'M', createdAt: + new Date()},
          { first_name: "Jo", last_name: "Spears", gender: 'F', createdAt: + new Date()},
          { first_name: "Sat", last_name: "Vick", gender: 'F', createdAt: + new Date()},
          { first_name: "Emily", last_name: "Good", gender: 'F', createdAt: + new Date()}
      ])
  );
}

function insertAvatarsData(name) {
  return run(r.table(name).insert(
    [
      { name: 'Ring', path: 'images/avatars/Ring.png', createdAt: + new Date() },
      { name: 'Bilbo', path: 'images/avatars/Bilbo.png', createdAt: + new Date() },
      { name: 'Frodo', path: 'images/avatars/Frodo.png', createdAt: + new Date() },
      { name: 'Gandalf', path: 'images/avatars/Gandalf.png', createdAt: + new Date() },
      { name: 'Aragorn', path: 'images/avatars/Aragorn.png', createdAt: + new Date() },
      { name: 'Legolas', path: 'images/avatars/Legolas.png', createdAt: + new Date() },
      { name: 'Gimli', path: 'images/avatars/Gimli.png', createdAt: + new Date() },
      { name: 'Sam', path: 'images/avatars/Sam.png', createdAt: + new Date() },
      { name: 'Arwen', path: 'images/avatars/arwen.png', createdAt: + new Date() },
      { name: 'Galadriel', path: 'images/avatars/Galadriel.png', createdAt: + new Date() },
      { name: 'Tauriel', path: 'images/avatars/Tauriel.png', createdAt: + new Date() },
      { name: 'Rosie', path: 'images/avatars/Rosie.png', createdAt: + new Date() },
      { name: 'Gollum', path: 'images/avatars/Gollum.png', createdAt: + new Date() },
      { name: 'Sauron', path: 'images/avatars/Sauron.png', createdAt: + new Date() },
      { name: 'Angmar', path: 'images/avatars/Angmar.png', createdAt: + new Date()},
      { name: 'Orc', path: 'images/avatars/orc.png', createdAt: + new Date() },
    ]
  ));
}

console.log('Resetting db...');

recreateDb(dbName).then(function() {
    return recreateTable(tb_players_name).then(function() {
        return run(r.table(tb_players_name).indexCreate('createdAt')).then(function() {
            return insertSampleData(tb_players_name);
        });
    });
}).then(function(){
    return recreateTable(tb_avatars_name).then(function() {
        return run(r.table(tb_avatars_name).indexCreate('createdAt')).then(function() {
          return insertAvatarsData(tb_avatars_name);
        });
    });
}).then(function() {
    return recreateTable(tb_games_name).then(function() {
      return run(r.table(tb_games_name).indexCreate('player_id')).then(function() {
        return run(r.table(tb_games_name).indexCreate('createdAt'));
      });
    })
}).then(function() {
    connPromise.then(function(c) { c.close(); });
    console.log('Completed');
});