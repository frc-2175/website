const sqlite = require('sqlite3');
const db = new sqlite.Database('database');

// This is a list of commands to be run to create the database schema
const commands = [
  `CREATE TABLE users(
    username TEXT,
    hash TEXT,
    PRIMARY KEY(username)
  );`,
];

/* This is a list of callback functions to handle errors that might come up
   with the commands being run. Callback functions correspond to the command
   at the same index in the commands[] array.
   */
const callbacks = [
  function(err) {
    if(err) {
      console.log(err);
    }
    console.log('Created users table');
  }
]

// Serializes the following database commands
db.serialize(function() {
  // Tries to create the metadata table for holding the version number
  db.run(`CREATE TABLE metadata(
      version INTEGER
    );`, function(error) {
      if(error !== null) {
        console.log('Table metadata already exists');
      }
    }
  );

  /* Once the metadata table confidently exists, we try to get the version 
     number from the table. If that fails, we assign 0 as the version since
     failure means that there was no version number. If that was successful,
     we store the version number and we execute all of the commands and 
     callbacks in their respective arrays from that version number as the 
     starting index.
     */
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

/**
 * Runs commands from the commands array with their respective callbacks
 * @param {number} index the index at which to start the commands
 */
function doCommandsFrom(index) {
    for (let i = index; i < commands.lengh; i++){
        db.run(commands[i], function(err) {
          await callbacks[i](err);
        });
    }
}
