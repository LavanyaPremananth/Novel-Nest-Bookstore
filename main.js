// Importing the render function from the "ejs" module
const { render } = require("ejs");

// Exporting a function that sets up routes for a web app
module.exports = function (app) {

    // Handling a GET request to the root route ("/")
    app.get("/", function (req, res) {
        // SQL query to retrieve information about books, authors, publishers, etc.
        let sqlquery = "SELECT id, ISBN, title, year, price, rating, length FROM book;" +
                       "SELECT author.author FROM author INNER JOIN book ON author.id = author_id ORDER BY book.id;" +
                       "SELECT publisher.publisher FROM publisher INNER JOIN book ON publisher.id = publisher_id ORDER BY book.id;" +
                       "SELECT location.city, location.country FROM location INNER JOIN book ON location.id = location_id ORDER BY book.id;" +
                       "SELECT category.category FROM category INNER JOIN book ON category.id = category_id ORDER BY book.id;" +
                       "SELECT format.format FROM format INNER JOIN book ON format.id = format_id ORDER BY book.id;" +
                       "SELECT cover.url, cover.image FROM cover INNER JOIN book ON book.id = book_id ORDER BY book.id;" +
                       "SELECT inventory.quantity FROM inventory INNER JOIN book ON book.id = book_id ORDER BY book.id;"

        // Executing the SQL query using the "db" connection
        db.query(sqlquery, function (err, result, fields) {
            // Handling any errors that may occur during the database query
            if (err) throw err;
            else {
                // Rendering the "index.ejs" page with data retrieved from the database
                res.render("index.ejs", {
                    book: result[0],         // Book information
                    author: result[1],       // Author information
                    publisher: result[2],    // Publisher information
                    location: result[3],     // Location information
                    category: result[4],     // Category information
                    format: result[5],       // Format information
                    cover: result[6],        // Cover information
                    inventory: result[7],    // Inventory information
                    search: ''               // Empty search term initially
                });
            }
        });
    });

    // Handling a POST request to the root route ("/") with search functionality
    app.post("/", function (req, res) {
        // Extracting the search keyword from the request body
        let keyword = [req.body.keyword];

        // Constructing a SQL query to search for books based on the title
        let sqlquery = "SELECT id, ISBN, title, year, price, rating, length FROM book WHERE title LIKE '%" + keyword + "%';" +
                    "SELECT author.author FROM author INNER JOIN book ON author.id = author_id WHERE title LIKE '%" + keyword + "%';" +
                    "SELECT publisher.publisher FROM publisher INNER JOIN book ON publisher.id = publisher_id WHERE title LIKE '%" + keyword + "%';" +
                    "SELECT location.city, location.country FROM location INNER JOIN book ON location.id = location_id WHERE title LIKE '%" + keyword + "%';" +
                    "SELECT category.category FROM category INNER JOIN book ON category.id = category_id WHERE title LIKE '%" + keyword + "%';" +
                    "SELECT format.format FROM format INNER JOIN book ON format.id = format_id WHERE title LIKE '%" + keyword + "%';" +
                    "SELECT cover.url, cover.image FROM cover INNER JOIN book ON book.id = book_id WHERE title LIKE '%" + keyword + "%';" +
                    "SELECT inventory.quantity FROM inventory INNER JOIN book ON book.id = book_id WHERE title LIKE '%" + keyword + "%';"

        // Executing the SQL query using the "db" connection
        db.query(sqlquery, function (err, result, fields) {
            // Handling any errors that may occur during the database query
            if (err) throw err;
            else {
                // Rendering the "index.ejs" page with search results
                res.render("index.ejs", {
                    book: result[0],         // Book information
                    author: result[1],       // Author information
                    publisher: result[2],    // Publisher information
                    location: result[3],     // Location information
                    category: result[4],     // Category information
                    format: result[5],       // Format information
                    cover: result[6],        // Cover information
                    inventory: result[7],    // Inventory information
                    search: keyword         // Search keyword to display in the UI
                });
            }
        });
    });

    // Handling a POST request to the "/searchAuthor" route for searching authors
    app.post("/searchAuthor", function (req, res) {
        // Extracting the search keyword for the author from the request body
        let keyword = [req.body.keyword];

        // Constructing a SQL query to search for books, authors, etc., based on the author field
        let sqlquery = "SELECT book.id, ISBN, title, year, price, rating, length FROM book INNER JOIN author ON author.id = author_id WHERE author.author LIKE '%" + keyword + "%';" +
                    "SELECT author.author FROM author INNER JOIN book ON author.id = author_id WHERE author.author LIKE '%" + keyword + "%';" +
                    "SELECT publisher.publisher FROM publisher INNER JOIN book INNER JOIN author ON publisher.id = publisher_id AND author.id = author_id WHERE author.author LIKE '%" + keyword + "%';" +
                    "SELECT location.city, location.country FROM location INNER JOIN book INNER JOIN author ON location.id = location_id AND author.id = author_id WHERE author.author LIKE '%" + keyword + "%';" +
                    "SELECT category.category FROM category INNER JOIN book INNER JOIN author ON category.id = category_id AND author.id = author_id WHERE author.author LIKE '%" + keyword + "%';" +
                    "SELECT format.format FROM format INNER JOIN book INNER JOIN author ON format.id = format_id AND author.id = author_id WHERE author.author LIKE '%" + keyword + "%';" +
                    "SELECT cover.url, cover.image FROM cover INNER JOIN book INNER JOIN author ON book.id = book_id AND author.id = author_id WHERE author.author LIKE '%" + keyword + "%';" +
                    "SELECT inventory.quantity FROM inventory INNER JOIN book INNER JOIN author ON book.id = book_id AND author.id = author_id WHERE author.author LIKE '%" + keyword + "%';"

        // Executing the SQL query using the "db" connection
        db.query(sqlquery, function (err, result, fields) {
            // Handling any errors that may occur during the database query
            if (err) throw err;
            else {
                // Rendering the "index.ejs" page with search results for authors
                res.render("index.ejs", {
                    book: result[0],         // Book information
                    author: result[1],       // Author information
                    publisher: result[2],    // Publisher information
                    location: result[3],     // Location information
                    category: result[4],     // Category information
                    format: result[5],       // Format information
                    cover: result[6],        // Cover information
                    inventory: result[7],    // Inventory information
                    search: keyword         // Search keyword to display in the UI
                });
            }
        });
    });

    // Handling a POST request to the "/searchPublisher" route for searching publishers
    app.post("/searchPublisher", function (req, res) {
        // Extracting the search keyword for the publisher from the request body
        let keyword = [req.body.keyword];

        // Constructing a SQL query to search for books, authors, etc., based on the publisher field
        let sqlquery = "SELECT book.id, ISBN, title, year, price, rating, length FROM book INNER JOIN publisher ON publisher.id = publisher_id WHERE publisher.publisher LIKE '%" + keyword + "%';" +
                    "SELECT author.author FROM author INNER JOIN book INNER JOIN publisher ON author.id = author_id AND publisher.id = publisher_id WHERE publisher.publisher LIKE '%" + keyword + "%';" +
                    "SELECT publisher.publisher FROM publisher INNER JOIN book ON publisher.id = publisher_id WHERE publisher.publisher LIKE '%" + keyword + "%';" +
                    "SELECT location.city, location.country FROM location INNER JOIN book INNER JOIN publisher ON location.id = location_id AND publisher.id = publisher_id WHERE publisher.publisher LIKE '%" + keyword + "%';" +
                    "SELECT category.category FROM category INNER JOIN book INNER JOIN publisher ON category.id = category_id AND publisher.id = publisher_id WHERE publisher.publisher LIKE '%" + keyword + "%';" +
                    "SELECT format.format FROM format INNER JOIN book INNER JOIN publisher ON format.id = format_id AND publisher.id = publisher_id WHERE publisher.publisher LIKE '%" + keyword + "%';" +
                    "SELECT cover.url, cover.image FROM cover INNER JOIN book INNER JOIN publisher ON book.id = book_id AND publisher.id = publisher_id WHERE publisher.publisher LIKE '%" + keyword + "%';" +
                    "SELECT inventory.quantity FROM inventory INNER JOIN book INNER JOIN publisher ON book.id = book_id AND publisher.id = publisher_id WHERE publisher.publisher LIKE '%" + keyword + "%';"

        // Executing the SQL query using the "db" connection
        db.query(sqlquery, function (err, result, fields) {
            // Handling any errors that may occur during the database query
            if (err) throw err;
            else {
                // Rendering the "index.ejs" page with search results for publishers
                res.render("index.ejs", {
                    book: result[0],         // Book information
                    author: result[1],       // Author information
                    publisher: result[2],    // Publisher information
                    location: result[3],     // Location information
                    category: result[4],     // Category information
                    format: result[5],       // Format information
                    cover: result[6],        // Cover information
                    inventory: result[7],    // Inventory information
                    search: keyword         // Search keyword to display in the UI
                });
            }
        });
    });

    // Handling a POST request to the "/searchCategory" route for searching categories
    app.post("/searchCategory", function (req, res) {
        // Extracting the search keyword for the category from the request body
        let keyword = [req.body.keyword];

        // Constructing a SQL query to search for books, authors, etc., based on the category field
        let sqlquery = "SELECT book.id, ISBN, title, year, price, rating, length FROM book INNER JOIN category ON category.id = category_id WHERE category.category LIKE '%" + keyword + "%';" +
                    "SELECT author.author FROM author INNER JOIN book INNER JOIN category ON author.id = author_id AND category.id = category_id WHERE category.category LIKE '%" + keyword + "%';" +
                    "SELECT publisher.publisher FROM publisher INNER JOIN book INNER JOIN category ON publisher.id = publisher_id AND category.id = category_id WHERE category.category LIKE '%" + keyword + "%';" +
                    "SELECT location.city, location.country FROM location INNER JOIN book INNER JOIN category ON location.id = location_id AND category.id = category_id WHERE category.category LIKE '%" + keyword + "%';" +
                    "SELECT category.category FROM category INNER JOIN book ON category.id = category_id WHERE category.category LIKE '%" + keyword + "%';" +
                    "SELECT format.format FROM format INNER JOIN book INNER JOIN category ON format.id = format_id AND category.id = category_id WHERE category.category LIKE '%" + keyword + "%';" +
                    "SELECT cover.url, cover.image FROM cover INNER JOIN book INNER JOIN category ON book.id = book_id AND category.id = category_id WHERE category.category LIKE '%" + keyword + "%';" +
                    "SELECT inventory.quantity FROM inventory INNER JOIN book INNER JOIN category ON book.id = book_id AND category.id = category_id WHERE category.category LIKE '%" + keyword + "%';"

        // Executing the SQL query using the "db" connection
        db.query(sqlquery, function (err, result, fields) {
            // Handling any errors that may occur during the database query
            if (err) throw err;
            else {
                // Rendering the "index.ejs" page with search results for categories
                res.render("index.ejs", {
                    book: result[0],         // Book information
                    author: result[1],       // Author information
                    publisher: result[2],    // Publisher information
                    location: result[3],     // Location information
                    category: result[4],     // Category information
                    format: result[5],       // Format information
                    cover: result[6],        // Cover information
                    inventory: result[7],    // Inventory information
                    search: keyword         // Search keyword to display in the UI
                });
            }
        });
    });




    // Handling a GET request to the "/book" route, rendering the "book.ejs" page with all book fields
    app.get("/book", function (req, res) {
        // Constructing a SQL query to retrieve all fields from the "book" table
        let sqlquery = "SELECT * FROM book";

        // Executing the SQL query using the "db" connection
        db.query(sqlquery, function (err, result, fields) {
            // Handling any errors that may occur during the database query
            if (err) throw err;
            else {
                // Rendering the "book.ejs" page with all book information
                res.render("book.ejs", {book: result, search: ''});
            }
        });
    });

    // Handling a POST request to the "/book" route for searching books
    app.post("/book", function (req, res) {
        // Extracting the search keyword for book title from the request body
        let keyword = [req.body.keyword];

        // Constructing a SQL query to search for books based on the title field
        let sqlquery = "SELECT * FROM book WHERE title LIKE '%" + keyword + "%'";

        // Executing the SQL query using the "db" connection
        db.query(sqlquery, function (err, result, fields) {
            // Handling any errors that may occur during the database query
            if (err) throw err;
            else {
                // Rendering the "book.ejs" page with search results for books
                res.render("book.ejs", {book: result, search: keyword});
            }
        });
    });

    // Handling a GET request to the "/author" route, rendering the "author.ejs" page with all author fields
    app.get("/author", function (req, res) {
        // Constructing a SQL query to retrieve all fields from the "author" table
        let sqlquery = "SELECT * FROM author";

        // Executing the SQL query using the "db" connection
        db.query(sqlquery, function (err, result, fields) {
            // Handling any errors that may occur during the database query
            if (err) throw err;
            else {
                // Rendering the "author.ejs" page with all author information
                res.render("author.ejs", {author: result});
            }
        });
    });

    // Handling a POST request to the "/author" route for searching authors
    app.post("/author", function (req, res) {
        // Extracting the search keyword for author name from the request body
        let keyword = [req.body.keyword];

        // Constructing a SQL query to search for authors based on the author field
        let sqlquery = "SELECT * FROM author WHERE author LIKE '%" + keyword + "%'";

        // Executing the SQL query using the "db" connection
        db.query(sqlquery, function (err, result, fields) {
            // Handling any errors that may occur during the database query
            if (err) throw err;
            else {
                // Rendering the "author.ejs" page with search results for authors
                res.render("author.ejs", {author: result, search: keyword});
            }
        });
    });

    // Handling a GET request to the "/publisher" route, rendering the "publisher.ejs" page with all publisher fields
    app.get("/publisher", function (req, res) {
        // Constructing a SQL query to retrieve all fields from the "publisher" table
        let sqlquery = "SELECT * FROM publisher";

        // Executing the SQL query using the "db" connection
        db.query(sqlquery, function (err, result, fields) {
            // Handling any errors that may occur during the database query
            if (err) throw err;
            else {
                // Rendering the "publisher.ejs" page with all publisher information
                res.render("publisher.ejs", {publisher: result, search: ''});
            }
        });
    });

    // Handling a POST request to the "/publisher" route for searching publishers
    app.post("/publisher", function (req, res) {
        // Extracting the search keyword for the publisher name from the request body
        let keyword = [req.body.keyword];

        // Constructing a SQL query to search for publishers based on the publisher field
        let sqlquery = "SELECT * FROM publisher WHERE publisher LIKE '%" + keyword + "%'";

        // Executing the SQL query using the "db" connection
        db.query(sqlquery, function (err, result, fields) {
            // Handling any errors that may occur during the database query
            if (err) throw err;
            else {
                // Rendering the "publisher.ejs" page with search results for publishers
                res.render("publisher.ejs", {publisher: result, search: keyword});
            }
        });
    });

    // Handling a GET request to the "/location" route, rendering the "location.ejs" page with all location fields
    app.get("/location", function (req, res) {
        // Constructing a SQL query to retrieve all fields from the "location" table
        let sqlquery = "SELECT * FROM location";

        // Executing the SQL query using the "db" connection
        db.query(sqlquery, function (err, result, fields) {
            // Handling any errors that may occur during the database query
            if (err) throw err;
            else {
                // Rendering the "location.ejs" page with all location information
                res.render("location.ejs", {location: result, search: ''});
            }
        });
    });

    // Handling a POST request to the "/location" route for searching locations
    app.post("/location", function (req, res) {
        // Extracting the search keyword for the city or country from the request body
        let keyword = [req.body.keyword];

        // Constructing a SQL query to search for locations based on the city or country fields
        let sqlquery = "SELECT * FROM location WHERE city LIKE '%" + keyword + "%' OR country LIKE '%" + keyword + "%'";

        // Executing the SQL query using the "db" connection
        db.query(sqlquery, function (err, result, fields) {
            // Handling any errors that may occur during the database query
            if (err) throw err;
            else {
                // Rendering the "location.ejs" page with search results for locations
                res.render("location.ejs", {location: result, search: keyword});
            }
        });
    });

    // Handling a GET request to the "/category" route, rendering the "category.ejs" page with all category fields
    app.get("/category", function (req, res) {
        // Constructing a SQL query to retrieve all fields from the "category" table
        let sqlquery = "SELECT * FROM category";

        // Executing the SQL query using the "db" connection
        db.query(sqlquery, function (err, result, fields) {
            // Handling any errors that may occur during the database query
            if (err) throw err;
            else {
                // Rendering the "category.ejs" page with all category information
                res.render("category.ejs", {category: result, search: ''});
            }
        });
    });

    // Handling a POST request to the "/category" route for searching categories
    app.post("/category", function (req, res) {
        // Extracting the search keyword for the category from the request body
        let keyword = [req.body.keyword];

        // Constructing a SQL query to search for categories based on the category field
        let sqlquery = "SELECT * FROM category WHERE category LIKE '%" + keyword + "%'";

        // Executing the SQL query using the "db" connection
        db.query(sqlquery, function (err, result, fields) {
            // Handling any errors that may occur during the database query
            if (err) throw err;
            else {
                // Rendering the "category.ejs" page with search results for categories
                res.render("category.ejs", {category: result, search: keyword});
            }
        });
    });

    // Handling a GET request to the "/format" route, rendering the "format.ejs" page with all format fields
    app.get("/format", function (req, res) {
        // Constructing a SQL query to retrieve all fields from the "format" table
        let sqlquery = "SELECT * FROM format";

        // Executing the SQL query using the "db" connection
        db.query(sqlquery, function (err, result, fields) {
            // Handling any errors that may occur during the database query
            if (err) throw err;
            else {
                // Rendering the "format.ejs" page with all format information
                res.render("format.ejs", {format: result, search: ''});
            }
        });
    });

    // Handling a POST request to the "/format" route for searching formats
    app.post("/format", function (req, res) {
        // Extracting the search keyword for the format from the request body
        let keyword = [req.body.keyword];

        // Constructing a SQL query to search for formats based on the format field
        let sqlquery = "SELECT * FROM format WHERE format LIKE '%" + keyword + "%'";

        // Executing the SQL query using the "db" connection
        db.query(sqlquery, function (err, result, fields) {
            // Handling any errors that may occur during the database query
            if (err) throw err;
            else {
                // Rendering the "format.ejs" page with search results for formats
                res.render("format.ejs", {format: result, search: keyword});
            }
        });
    });

    // Handling a GET request to the "/cover" route, rendering the "cover.ejs" page with cover table field data and book titles
    app.get("/cover", function (req, res) {
        // Constructing a SQL query to retrieve cover table field data and book titles from the book table
        let sqlquery = "SELECT * FROM cover;" +
                        "SELECT book.title FROM book INNER JOIN cover ON book.id = book_id ORDER BY book.id;"

        // Executing the SQL query using the "db" connection
        db.query(sqlquery, function (err, result, fields) {
            // Handling any errors that may occur during the database query
            if (err) throw err;
            else {
                // Rendering the "cover.ejs" page with cover table field data, book titles, and an empty search
                res.render("cover.ejs", {cover: result[0], title: result[1], search: ''});
            }
        });
    });

    // Handling a POST request to the "/cover" route for searching covers based on book title
    app.post("/cover", function (req, res) {
        // Extracting the search keyword for the cover from the request body
        let keyword = [req.body.keyword];

        // Constructing a SQL query to search for covers based on the book title
        let sqlquery = "SELECT * FROM cover INNER JOIN book ON book_id = book.id WHERE book.title LIKE '%" + keyword + "%';" +
                    "SELECT book.title FROM book INNER JOIN cover ON book.id = book_id WHERE book.title LIKE '%" + keyword + "%';"

        // Executing the SQL query using the "db" connection
        db.query(sqlquery, function (err, result, fields) {
            // Handling any errors that may occur during the database query
            if (err) throw err;
            else {
                // Rendering the "cover.ejs" page with search results for covers, book titles, and the search keyword
                res.render("cover.ejs", {cover: result[0], title: result[1], search: keyword});
            }
        });
    });

    // Handling a GET request to the "/inventory" route, rendering the "inventory.ejs" page with inventory table field data and book titles
    app.get("/inventory", function (req, res) {
        // Constructing a SQL query to retrieve inventory table field data and book titles from the book table
        let sqlquery = "SELECT * FROM inventory;" +
                    "SELECT book.title FROM book INNER JOIN cover ON book.id = book_id ORDER BY book.id;"

        // Executing the SQL query using the "db" connection
        db.query(sqlquery, function (err, result, fields) {
            // Handling any errors that may occur during the database query
            if (err) throw err;
            else {
                // Rendering the "inventory.ejs" page with inventory table field data, book titles, and an empty search
                res.render("inventory.ejs", {inventory: result[0], title: result[1], search: ''});
            }
        });
    });

    // Handling a POST request to the "/inventory" route for searching inventory based on book title
    app.post("/inventory", function (req, res) {
        // Extracting the search keyword for the inventory from the request body
        let keyword = [req.body.keyword];

        // Constructing a SQL query to search for inventory based on the book title
        let sqlquery = "SELECT * FROM inventory INNER JOIN book ON book_id = book.id WHERE book.title LIKE '%" + keyword + "%';" +
                    "SELECT book.title FROM book INNER JOIN inventory ON book.id = book_id WHERE book.title LIKE '%" + keyword + "%';"

        // Executing the SQL query using the "db" connection
        db.query(sqlquery, function (err, result, fields) {
            // Handling any errors that may occur during the database query
            if (err) throw err;
            else {
                // Rendering the "inventory.ejs" page with search results for inventory, book titles, and the search keyword
                res.render("inventory.ejs", {inventory: result[0], title: result[1], search: keyword});
            }
        });
    });

};