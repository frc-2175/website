const sqlite = require('sqlite');
const bcrypt = require('bcrypt');
const fs = require('fs');
const crypto = require('crypto');

const dbPromise = sqlite.open('database');

// Create variables for encryption and decryption of tokens
let key = null;
const iv = Buffer.alloc(16, 0);
try {
    key = fs.readFileSync('token-key', 'utf8');
    console.log('Key length: ' + key.length);
} catch (e) {
    if (e.code === 'ENOENT') {
        // File not found
        console.warn("WARNING: Could not find file token-key! You won't be able to log in.");
    } else {
        throw e;
    }
}

/**
 * Adds a user to the database with their username and hashed password
 * @param {string} username username to add
 * @param {string} password password corresponding to the user
 * @param {function} callback the callback function which takes the error and 
 * whether or not the username entered was taken or not
 */
exports.addUser = async function(username, password) {
    const passwordHash = await bcrypt.hash(password, 10);
    const db = await dbPromise;

    try {
        await db.run('INSERT INTO users VALUES (?, ?)', username, passwordHash);
        return false;
    } catch (error) {
        if (error.code === 'SQLITE_CONSTRAINT') {
            return true;
        } else {
            throw error;
        }
    }
}

/**
 * Checks if a password is correct for a certain user
 * @param {string} username the username corresponding to the password
 * @param {string} password the password to be checked
 * @param {function} callback the callback function which takes the error and
 * whether or not the attempted password and the stored password are the same.
 */
exports.checkPassword = async function(username, password) {
    const db = await dbPromise;
    const row = await db.get('SELECT hash FROM users WHERE username = ?', username);
    if (!row) {
        return false;
    }

    const same = await bcrypt.compare(password, row.hash);

    return same;
}

/**
 * Generates a token based on a username
 * @param {string} username the username to be included in the token object
 */
exports.genToken = function(username) {
    const token = JSON.stringify({
        username: username,
    });
    const myKey = crypto.createCipheriv('aes-256-cbc', key, iv);
    let myStr = myKey.update(token, 'utf8', 'hex');
    myStr += myKey.final('hex');
    return myStr;
}

/**
 * Reads an encrypted token and converts it to JSON
 * @param {string} token the token to be read
 * @returns {object} the JSON object that the token refers to
 */
exports.readToken = function(token) {
    const myKey = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let myStr = myKey.update(token, 'hex', 'utf8');
    myStr += myKey.final('utf8');
    return JSON.parse(myStr);
}

/**
 * Checks if something is a valid token
 * @param {string} token the token to be checked
 * @returns {boolean} if the token was valid
 */
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
