const sqlite = require('sqlite3');
const bcrypt = require('bcrypt');
const db = new sqlite.Database('database');

exports.addUser = function(username, password, callback) {
    hash(password, function(error, encrypted) {
        if(error === null) {
            db.run('INSERT INTO users VALUES (?, ?)', username, encrypted, function(error) {
                if(error !== undefined) {
                    callback(error);
                } else {
                    callback(null);
                }
            });
        } else {
            callback(error);
        }
    })
}

function hash(password, callback) {
    bcrypt.hash(password, 10, function(error, encrypted) {
        if(error === undefined) {
            callback(null, encrypted);
        } else {
            callback(error, "");
        }
    });
}

exports.checkPassword = function(username, password, callback) {
    db.get('SELECT hash FROM users WHERE username = ?', username, function(error, row) {
        if(!error) {
            bcrypt.compare(password, row.hash, function(error, same) {
                if(error === undefined) {
                    callback(null, same);
                } else {
                    callback(error, false);
                }
            });
        } else {
            callback(error, false);
        }
    });
}
