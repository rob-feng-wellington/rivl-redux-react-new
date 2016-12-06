'use strict';

var Promise = require('bluebird');
var r = require('rethinkdb-websocket-server').r;

var dbName = 'battledb';
var tb_players_name = 'players';
var tb_avatars_name = 'avatars';

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
          { first_name: "Rob", last_name: "Feng", gender: 'M', score: 1450},
          { first_name: "Luke", last_name: "Chen", gender: 'M', score: 1730},
          { first_name: "Hoken", last_name: "Guan", gender: 'M', score: 1560},
          { first_name: "Jo", last_name: "Spears", gender: 'F', score: 1700},
          { first_name: "Sat", last_name: "Vick", gender: 'F', score: 1449},
          { first_name: "Emily", last_name: "Good", gender: 'F', score: 1388}
      ])
  );
}

function insertAvatarsData(name) {
  return run(r.table(name).insert(
    [
      { name: 'Ring', path: 'images/avatars/Ring.png' },
      { name: 'Bilbo', path: 'images/avatars/Bilbo.png' },
      { name: 'Frodo', path: 'images/avatars/Frodo.png' },
      { name: 'Gandalf', path: 'images/avatars/Gandalf.png' },
      { name: 'Aragorn', path: 'images/avatars/Aragorn.png' },
      { name: 'Legolas', path: 'images/avatars/Legolas.png' },
      { name: 'Gimli', path: 'images/avatars/Gimli.png' },
      { name: 'Sam', path: 'images/avatars/Sam.png' },
      { name: 'Arwen', path: 'images/avatars/arwen.png' },
      { name: 'Galadriel', path: 'images/avatars/Galadriel.png' },
      { name: 'Tauriel', path: 'images/avatars/Tauriel.png' },
      { name: 'Rosie', path: 'images/avatars/Rosie.png' },
      { name: 'Gollum', path: 'images/avatars/Gollum.png' },
      { name: 'Sauron', path: 'images/avatars/Sauron.png' },
      { name: 'Angmar', path: 'images/avatars/Angmar.png' },
      { name: 'Orc', path: 'images/avatars/orc.png' },
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
    connPromise.then(function(c) { c.close(); });
    console.log('Completed');
});