// Import libraries
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require("path");

// Initialise objects and declare constants

// Create Express app
const app = express();

// Declare web port
const port = 8080;

// Create MySQL connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Lavanya_lavanya02",
    database: "Books",
    multipleStatements: true
});

// Establish MySQL connection
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("Connected to the database");
});

// Make the database connection accessible globally
global.db = db;

// Use bodyParser for parsing URL-encoded data
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
require("./routes/main")(app);

// Serve static files (styles.css and scripts.js) using express.static
app.use(express.static('public'));
app.use('/css', express.static(path.join(__dirname, "/public/css")));
app.use('/js', express.static(path.join(__dirname, "/public/js")));

// Set up templating engine (EJS)
app.engine("html", require("ejs").renderFile);
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

// Listen on the specified port
app.listen(port, () => console.log(`Node server is running on port ${port}!`));
