# NovelNest Bookstore Database

This repository contains a CRUD (Create, Read, Update, Delete) bookstore web application implemented using JavaScript and Node.js. 
The application allows users to query bookstore data, including books, authors, publishers, etc. 

## How to Run the Application

Follow these steps to set up and run the CRUD bookstore web application:

1. **Create the Database**
   - Execute the following command to create the database:
     ```bash
     node create_db.js
     ```

2. **Connect to the Database, Create Tables, and Populate with CSV Data**
   - Execute the following command to connect to the database, create tables, and populate them with CSV data:
     ```bash
     node populate_db.js
     ```

3. **Run the Web Application**
   - Execute the following command to start the web application:
     ```bash
     node index.js
     ```

4. **Access the Web Application**
   - Open a web browser and visit [http://127.0.0.1:8088/](http://127.0.0.1:8088/) to interact with the web application.

## Additional Notes

- Ensure that you have Node.js installed on your machine before running the application.
- The web application provides CRUD functionality for bookstore data, enabling users to manage books, authors, publishers, and more.

Happy querying!
