const sqlite = require('sqlite3');
const db = new sqlite.Database('database');

const commands = [
  `CREATE TABLE users(
    username TEXT,
    hash TEXT,
    PRIMARY KEY(username)
  );`,
  'ALTER TABLE users ADD COLUMN food TEXT'  
];

const callbacks = [
  function(err) {
    if(err !== undefined) {
      console.log(err.message);
    }
    console.log('Created users table');
  },
  function(err) {
    if(err !== undefined) {
      console.log(err.message);
    }
    console.log('Created food column');
  }
]

db.serialize(function() {
  db.run(`CREATE TABLE metadata(
      version INTEGER
    );`, function(error) {
      if(error !== null) {
        console.log('Table metadata already exists');
      }
    }
  );
  db.get(`SELECT version FROM metadata`, function(error, row) {
    let start;
    if(row === undefined) {
      db.run(`INSERT INTO metadata VALUES (0)`, function(error) {
        if(error !== null) {
          console.log('Inserting version number failed');
          process.exit(1);
        }
      });
      start = 0;
    } else {
      start = row.version;
    }
    doCommandsFrom(start);
    db.run(`UPDATE metadata SET version = ${commands.length}`);
  });
});

function doCommandsFrom(index) {
  if(index < commands.length) {
    db.run(commands[index], function(err) {
      callbacks[index](err);
      doCommandsFrom(index + 1);
    });
  }
}
