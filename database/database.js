const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database/database.db');  

const authentication = async ({username, password}) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
    db.all(sql, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });

  });
}

const signup = async ({username, password}) => {
  return new Promise((resolve, reject) => {
    db.run(`INSERT INTO users (username, password) VALUES ('${username}', '${password}')`, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(true);
      }
    });
  });
}

module.exports = {
  authenticate: authentication,
  signup: signup
}