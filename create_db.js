// Import the MySQL module
const mysql = require('mysql');

// Establish a database connection configuration
const db = mysql.createConnection({
    host: "localhost",         
    user: "root",              
    password: "Lavanya_lavanya02",
});

// Connect to the MySQL server
db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");

    // Create the database if it doesn't already exist
    db.query("CREATE DATABASE IF NOT EXISTS Books", function (err, result) {
        if (err) throw err;
        console.log("Books database created");
    });
});

// Close the database connection after the operations are completed
db.end(function(err) {
    if (err) throw err;
    console.log("Database connection closed");
});
