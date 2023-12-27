// Import required modules for MySQL database connection and CSV-to-JSON conversion
const mysql = require('mysql');
const csvtojson = require('csvtojson');

// Establish a connection to the database
const db = mysql.createConnection({
    host: "localhost",              // Database host (in this case, it's running locally)
    user: "root",                   // Database username
    password: "Lavanya_lavanya02", // Database password
    database: "Books"               // Database name
});

// Connect to the database. Run .connect() to make the connection.
db.connect((err) => {
    if (err) throw err; // Throw an error if the connection is unsuccessful.
    console.log("Connected to Books database"); // Log a message indicating a successful connection.

    // Drop existing tables to ensure no residual data.
    // Drop cover and inventory first as they have a foreign key referencing the book table.
    var deleteExistingTables = "DROP TABLE IF EXISTS cover, inventory, author, publisher, location, category, format, book";
    db.query(deleteExistingTables, function (err, result) {
        if (err) throw err; // Throw an error if there's an issue with dropping tables.
        console.log("All existing tables deleted"); // Log a message indicating successful deletion of existing tables.
    });

    // Create the table called 'author' in the 'Books' database, if the table doesn't exist.
    // This table stores the author's id, name, etc...
    var authorTable = "CREATE TABLE IF NOT EXISTS author (" +
                    "id INT UNSIGNED AUTO_INCREMENT NOT NULL," +
                    "author VARCHAR(255) NOT NULL," +
                    "PRIMARY KEY(id))";
                    
    db.query(authorTable, function (err, result) {
        if (err) throw err; // Throw an error if there's an issue with creating the 'author' table.
        console.log("Author Table created in the database"); // Log a message indicating successful creation of the 'author' table.
    });

    // Create the table called 'publisher' in the 'Books' database, if the table doesn't exist.
    // This table stores the publisher's id, name, etc...
    var publisherTable = "CREATE TABLE IF NOT EXISTS publisher (" +
                        "id INT UNSIGNED AUTO_INCREMENT NOT NULL," +
                        "publisher VARCHAR(255) NOT NULL," +
                        "PRIMARY KEY(id))";
                        
    db.query(publisherTable, function (err, result) {
        if (err) throw err; // Throw an error if there's an issue with creating the 'publisher' table.
        console.log("Publisher Table created in the database"); // Log a message indicating successful creation of the 'publisher' table.
    });

    // Create the table called 'location' in the 'Books' database, if the table doesn't exist.
    // This table stores the book's publish location, etc...
    var locationTable = "CREATE TABLE IF NOT EXISTS location (" +
                        "id INT UNSIGNED AUTO_INCREMENT NOT NULL," +
                        "city VARCHAR(255) NOT NULL," +
                        "country VARCHAR(255) NOT NULL," +
                        "PRIMARY KEY(id))";
                        
    db.query(locationTable, function (err, result) {
        if (err) throw err; // Throw an error if there's an issue with creating the 'location' table.
        console.log("Location Table created in the database"); // Log a message indicating successful creation of the 'location' table.
    });

    // Create the table called 'category' in the 'Books' database, if the table doesn't exist.
    // This table stores the book's category, etc...
    var categoryTable = "CREATE TABLE IF NOT EXISTS category (" +
                        "id INT UNSIGNED AUTO_INCREMENT NOT NULL," +
                        "category VARCHAR(255) NOT NULL," +
                        "PRIMARY KEY(id))";
                        
    db.query(categoryTable, function (err, result) {
        if (err) throw err; // Throw an error if there's an issue with creating the 'category' table.
        console.log("Category Table created in the database"); // Log a message indicating successful creation of the 'category' table.
    });

    // Create the table called 'format' in the 'Books' database, if the table doesn't exist.
    // This table stores the book's format, etc...
    var formatTable = "CREATE TABLE IF NOT EXISTS format (" +
                    "id INT UNSIGNED AUTO_INCREMENT NOT NULL," +
                    "format VARCHAR(255) NOT NULL," +
                    "PRIMARY KEY(id))";
                    
    db.query(formatTable, function (err, result) {
        if (err) throw err; // Throw an error if there's an issue with creating the 'format' table.
        console.log("Format Table created in the database"); // Log a message indicating successful creation of the 'format' table.
    });

    // Create the table called 'book' in the 'Books' database, if the table doesn't exist.
    // This table stores the book's ISBN, title, etc...
    var bookTable = "CREATE TABLE IF NOT EXISTS book (" +
                    "id INT UNSIGNED AUTO_INCREMENT NOT NULL," +
                    "ISBN VARCHAR(255) NOT NULL," +
                    "title VARCHAR(255) NOT NULL," +
                    "year INT UNSIGNED NOT NULL," +
                    "price DECIMAL(5, 2) UNSIGNED NOT NULL," +
                    "rating DECIMAL(4, 2) UNSIGNED NOT NULL," +
                    "length INT UNSIGNED," +
                    "author_id INT UNSIGNED NOT NULL," +
                    "publisher_id INT UNSIGNED NOT NULL," +
                    "location_id INT UNSIGNED NOT NULL," +
                    "category_id INT UNSIGNED NOT NULL," +
                    "format_id INT UNSIGNED NOT NULL," +
                    "PRIMARY KEY(id)," +
                    "FOREIGN KEY (author_id) REFERENCES author(id)," +
                    "FOREIGN KEY (publisher_id) REFERENCES publisher(id)," +
                    "FOREIGN KEY (location_id) REFERENCES location(id)," +
                    "FOREIGN KEY (category_id) REFERENCES category(id)," +
                    "FOREIGN KEY (format_id) REFERENCES format(id))";

    db.query(bookTable, function (err, result) {
        if (err) throw err; // Throw an error if there's an issue with creating the 'book' table.
        console.log("Book Table created in the database"); // Log a message indicating successful creation of the 'book' table.
    });

    // Create the table called 'cover' in the 'Books' database, if the table doesn't exist.
    // This table stores the book's cover image, URL, etc...
    var coverTable = "CREATE TABLE IF NOT EXISTS cover (" +
                    "id INT UNSIGNED AUTO_INCREMENT NOT NULL," +
                    "url VARCHAR(255) NOT NULL," +
                    "image VARCHAR(255) NOT NULL," +
                    "PRIMARY KEY(id)," +
                    "book_id INT UNSIGNED NOT NULL," +
                    "FOREIGN KEY (book_id) REFERENCES book(id))";

    db.query(coverTable, function (err, result) {
        if (err) throw err; // Throw an error if there's an issue with creating the 'cover' table.
        console.log("Cover Table created in the database"); // Log a message indicating successful creation of the 'cover' table.
    });

    // Create the table called 'inventory' in the 'Books' database, if the table doesn't exist.
    // This table stores the book's quantity, etc...
    var inventoryTable = "CREATE TABLE IF NOT EXISTS inventory (" +
                        "id INT UNSIGNED AUTO_INCREMENT NOT NULL," +
                        "quantity INT UNSIGNED NOT NULL," +
                        "PRIMARY KEY(id)," +
                        "book_id INT UNSIGNED NOT NULL," +
                        "FOREIGN KEY (book_id) REFERENCES book(id))";

    db.query(inventoryTable, function (err, result) {
        if (err) throw err; // Throw an error if there's an issue with creating the 'inventory' table.
        console.log("Inventory Table created in the database"); // Log a message indicating successful creation of the 'inventory' table.
    });
});

// -------------- Run this only once to insert CSV data into the SQL database --------------
// Specify the CSV file containing the data
const csvFile = "data/book_dataset.csv";

// Convert the CSV data to JSON format
csvtojson().fromFile(csvFile).then(source => {
    // Initialize empty lists to store unique fields

    // Author
    var author_list = [];
    var author_full = [];

    // Publisher
    var publisher_list = [];
    var publisher_full = [];

    // Location
    var location_list = [];
    var location_full = [];

    // Cover
    var url_list = [];
    var image_list = [];

    // Inventory
    var quantity_list = [];

    // Category
    var category_list = [];
    var category_full = [];

    // Format
    var format_list = [];
    var format_full = [];

    // Book
    var ISBN_list = [];
    var title_list = [];
    var year_list = [];
    var price_list = [];
    var rating_list = [];
    var length_list = [];

    // Iterate through each row of the CSV data
    for (var i = 0; i < source.length; i++) {
        // Fetch data from each column in the current row

        // Author
        var author = source[i]["author"];

        // Publisher
        var publisher = source[i]["publisher"];

        // Location
        var location = source[i]["city/country"];

        // Cover
        var url = source[i]["url"];
        var image = source[i]["image"];

        // Inventory
        var quantity = source[i]["quantity"];

        // Category
        var category = source[i]["categories"];

        // Format
        var format = source[i]["format"];

        // Book
        var bookISBN = source[i]["ISBN"];
        var bookTitle = source[i]["title"];
        var bookYear = source[i]["year"];
        var bookPrice = source[i]["price"];
        var bookRating = source[i]["rating"];
        var bookLength = source[i]["length"];


        // Push data to names list if it doesnt already exist in the list

        // author, publisher, category, format tables contains repetitive data which results in a large dataset,
        // so only push unique ones into the lists
        if (author_list.includes(author) === false) author_list.push(author);
        if (publisher_list.includes(publisher) === false) publisher_list.push(publisher);
        if (category_list.includes(category) === false) category_list.push(category);
        if (format_list.includes(format) === false) format_list.push(format);

        // The location list contains city and country data,
        // which will be split into single elements later
        if (location_list.includes(location) === false) location_list.push(location);

        // Cover and inventory table fields are unique, so push all the fields into the lists
        url_list.push(url);
        image_list.push(image);
        quantity_list.push(quantity); 

        // Book table fields are unique, so push all the fields into the lists
        ISBN_list.push(bookISBN);
        title_list.push(bookTitle);
        year_list.push(bookYear);
        price_list.push(bookPrice);
        rating_list.push(bookRating);
        length_list.push(bookLength);

        // These lists store the full data of the fields (repetitive data)
        author_full.push(author);
        publisher_full.push(publisher);
        location_full.push(location);
        category_full.push(category);
        format_full.push(format);
    }

    // Iterate over the author_list to insert data into the 'author' table
    for (var i = 0; i < author_list.length; i++) {
        // SQL insert command
        var sqlInsert = `INSERT INTO author VALUES (?, ?)`;
        
        // Data to be inserted. Since the loop starts at 0, increment i by 1 for the ID.
        var data = [i + 1, author_list[i]];

        // Inserting data of the current row into the database
        db.query(sqlInsert, data, (err, results, fields) => {
            if (err) {
                console.log("Unable to insert author item at row ", i + 1);
                return console.log(err);
            }
        });
    }

    // Iterate over the publisher_list to insert data into the 'publisher' table
    for (var i = 0; i < publisher_list.length; i++) {
        // SQL insert command
        var sqlInsert = `INSERT INTO publisher VALUES (?, ?)`;
        
        // Data to be inserted. Since the loop starts at 0, increment i by 1 for the ID.
        var data = [i + 1, publisher_list[i]];

        // Inserting data of the current row into the database
        db.query(sqlInsert, data, (err, results, fields) => {
            if (err) {
                console.log("Unable to insert publisher item at row ", i + 1);
                return console.log(err);
            }
        });
    }

    // Lists to store city and country data
    var city = [];
    var country = [];

    // Iterate over the location_list to process and insert data into the 'location' table
    for (var i = 0; i < location_list.length; i++) {
        // Initialize empty string variable for saving city data later
        var city_temp = "";

        // Contains city and country data that needs to be saved into separate lists
        var city_country_pair = location_list[i].split(", ");

        // Handle different cases based on the length of city_country_pair
        if (city_country_pair == "") {
            city.push("NULL");
            country.push("NULL");
        } else if (city_country_pair.length == 1) {
            city.push("NULL");
            country.push(city_country_pair[0]);
        } else if (city_country_pair.length == 2) {
            city.push(city_country_pair[0]);
            country.push(city_country_pair[1]);
        } else if (city_country_pair.length > 2) {
            for (var x = 0; x < city_country_pair.length - 1; x++) {
                if (x == city_country_pair.length - 2) {
                    city_temp = city_temp + city_country_pair[x];
                } else {
                    city_temp = city_temp + city_country_pair[x] + ", ";
                }
            }
            city.push(city_temp);
            country.push(city_country_pair[city_country_pair.length - 1]);
        }

        // SQL insert command
        var sqlInsert = `INSERT INTO location VALUES (?, ?, ?)`;

        // Data to be inserted. Since the loop starts at 0, increment i by 1
        var data = [i + 1, city[i], country[i]];

        // Inserting data of the current row into the database
        db.query(sqlInsert, data, (err, results, fields) => {
            if (err) {
                console.log("Unable to insert location item at row ", i + 1);
                return console.log(err);
            }
        });
    }

    // Iterate over the category_list to process and insert data into the 'category' table
    for (var i = 0; i < category_list.length; i++) {
        // SQL insert command
        var sqlInsert = `INSERT INTO category VALUES (?, ?)`;

        // Data to be inserted. Since the loop starts at 0, increment i by 1
        var data = [i + 1, category_list[i]];

        // Inserting data of the current row into the database
        db.query(sqlInsert, data, (err, results, fields) => {
            if (err) {
                console.log("Unable to insert category item at row ", i + 1);
                return console.log(err);
            }
        });
    }

    // Iterate over the format_list to process and insert data into the 'format' table
    for (var i = 0; i < format_list.length; i++) {
        // SQL insert command
        var sqlInsert = `INSERT INTO format VALUES (?, ?)`;

        // Data to be inserted. Since the loop starts at 0, increment i by 1
        var data = [i + 1, format_list[i]];

        // Inserting data of the current row into the database
        db.query(sqlInsert, data, (err, results, fields) => {
            if (err) {
                console.log("Unable to insert format item at row ", i + 1);
                return console.log(err);
            }
        });
    }

    // Iterate over the ISBN_list to process and insert data into the 'book' table
    for (var i = 0; i < ISBN_list.length; i++) {
        var author_id;
        var publisher_id;
        var location_id;
        var category_id;
        var format_id;

        // For each foreign key, loop through the field data list (that only contains unique values)
        // Use an if statement to check if the data in the full-list exists in the unique-data-only list
        // If it exists, get the index (a) and use it as the id to be parsed into the database
        // The index (a) needs to be incremented by 1 as id in the database starts from 1 (instead of 0)
        for (var a = 0; a < author_list.length; a++) {
            if (author_full[i] == author_list[a]) {
                author_id = a + 1;
            }
        }

        for (var a = 0; a < publisher_list.length; a++) {
            if (publisher_full[i] == publisher_list[a]) {
                publisher_id = a + 1;
            }
        }

        for (var a = 0; a < location_list.length; a++) {
            if (location_full[i] == location_list[a]) {
                location_id = a + 1;
            }
        }

        for (var a = 0; a < category_list.length; a++) {
            if (category_full[i] == category_list[a]) {
                category_id = a + 1;
            }
        }

        for (var a = 0; a < format_list.length; a++) {
            if (format_full[i] == format_list[a]) {
                format_id = a + 1;
            }
        }

        // Insert command
        var sqlInsert = `INSERT INTO book VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        // Data to be inserted. Since the loop starts at 0, increment i by 1
        var data = [i + 1, ISBN_list[i], title_list[i], year_list[i], price_list[i], rating_list[i], length_list[i],
            author_id, publisher_id, location_id, category_id, format_id];

        // Inserting data of the current row into the database
        db.query(sqlInsert, data, (err, results, fields) => {
            if (err) {
                console.log("Unable to insert book item at row ", i + 1);
                return console.log(err);
            }
        });
    }

    // Insert data into the 'cover' table
    for (var i = 0; i < url_list.length; i++) {
        // Insert command
        var sqlInsertCover = `INSERT INTO cover VALUES(?, ?, ?, ?)`;

        // Data to be inserted. Since the loop starts at 0, increment i by 1
        var dataCover = [i + 1, url_list[i], image_list[i], i + 1];

        // Inserting data of the current row into the 'cover' table
        db.query(sqlInsertCover, dataCover, (err, results, fields) => {
            if (err) {
                console.log("Unable to insert cover item at row ", i + 1);
                return console.log(err);
            }
        });
    }

    // Insert data into the 'inventory' table
    for (var i = 0; i < quantity_list.length; i++) {
        // Insert command
        var sqlInsertInventory = `INSERT INTO inventory VALUES(?, ?, ?)`;

        // Data to be inserted. Since the loop starts at 0, increment i by 1
        var dataInventory = [i + 1, quantity_list[i], i + 1];

        // Inserting data of the current row into the 'inventory' table
        db.query(sqlInsertInventory, dataInventory, (err, results, fields) => {
            if (err) {
                console.log("Unable to insert inventory item at row ", i + 1);
                return console.log(err);
            }
        });
    }

    console.log("All items stored into the database successfully");
    
});