const mysql = require('mysql2');

const pool = mysql.createPool({
  database: "user_manager",
  user: "root",
  password: "12345678",
  host: "localhost",
  port: 3306,

});

pool.getConnection(function (err, connection){
 if (err) {
    console.log("Error getting");
 } else {
    console.log("Connection established");
 }
})

module.exports = pool.promise();