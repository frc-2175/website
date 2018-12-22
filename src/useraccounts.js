const sqlite = require('sqlite3');
const bcrypt = require('bcrypt');
const fs = require('fs');
const crypto = require('crypto');
const db = new sqlite.Database('database');

const key = fs.readFileSync('token-key', 'utf8');
const iv = Buffer.alloc(16, 0);

exports.addUser = function(username, password, callback) {
    hash(password, function(error, encrypted) {
        try {
            if(error === null) {
                db.run('INSERT INTO users VALUES (?, ?)', username, encrypted, function(error) {
                    try {
                        if(error) {
                            callback(null, true);
                        } else {
                            callback(null, false);
                        }
                    } catch(error) {
                        callback(error);
                    }
                });
            } else {
                callback(error);
            }
        } catch(error) {
            callback(error);
        }
    })
}

function hash(password, callback) {
    bcrypt.hash(password, 10, function(error, encrypted) {
        try {
            if(error === undefined) {
                callback(null, encrypted);
            } else {
                callback(error, "");
            }
        } catch(error) {
            callback(error, "");
        }
    });
}

exports.checkPassword = function(username, password, callback) {
    db.get('SELECT hash FROM users WHERE username = ?', username, function(error, row) {
        try {
            if(!error) {
                bcrypt.compare(password, row.hash, function(error, same) {
                    try {
                        if(error === undefined) {
                            callback(null, same);
                        } else {
                            callback(error, false);
                        }
                    } catch(error) {
                        callback(error, false);
                    }
                });
            } else {
                callback(error, false);
            }
        } catch(error) {
            callback(error, false);
        }
    });
}

exports.genToken = function(username) {
    const token = JSON.stringify({
        username: username,
    });
    const myKey = crypto.createCipheriv('aes-256-cbc', key, iv);
    let myStr = myKey.update(token, 'utf8', 'hex');
    myStr += myKey.final('hex');
    return myStr;
}

exports.readToken = function(token) {
    const myKey = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let myStr = myKey.update(token, 'hex', 'utf8');
    myStr += myKey.final('utf8');
    return JSON.parse(myStr);
}

exports.isValidToken = function(token) {
    try {
        const tokenObj = exports.readToken(token);
        if(!tokenObj.username) {
            console.log('No username variable for the token');
            return false;
        }
    } catch(error) {
        return false;
    }    
    return true;
}
