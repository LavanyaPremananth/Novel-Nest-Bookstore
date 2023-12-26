const mysql = require('mysql');

// Establish a database connection
const db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "Lavanya_lavanya02",
});

db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");

    // delete the database to ensure there are no residual data
    // db.query("DROP DATABASE Books", function (err, result) {
    //     if (err) throw err;
    //     console.log("Books database deleted");
    // });

    // create the database
    db.query("CREATE DATABASE IF NOT EXISTS Books", function (err, result) {
      if (err) throw err;
      console.log("Books database created");
    });
  });
  
// Close the database connection after the operation
connection.end(function(err) {
  if (err) throw err;
  console.log("Database connection closed");
});