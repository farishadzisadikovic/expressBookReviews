const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req, res) => {
  //Write your code here
  // Extract user data from the request body
  const { username, email, password } = req.body;

  //Check if required fields are present
  if (!username || !email || !password) {
    return res.status(400).json({ message: "Username, email, and password are required" });
  }

  //Validate user data (example: check if email is valid, password strength, etc.)
  if (!validateEmail(email)) {
    return res.status(400).json({ message: "Invalid email address" });
  }

  //Check if the username is already taken
  if (users.some(user => user.username === username)) {
    return res.status(400).json({ message: "Username already exists" });
  }

  //Hash the password before storing it (you can use libraries like bcrypt)
  const hashedPassword = hashPassword(password);

  //Save the user data to the database
  const newUser = { username, email, password: hashedPassword };
  users.push(newUser);

  return res.status(200).json({ message: "User registered successfully" });
});

function isValidEmail(email) {
  // Regular expression to validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Function to hash the password
function hashPassword(password) {
  // Implement password hashing logic (using bcrypt or any other suitable library)
  return password; // For demonstration purposes, returning the password as is
}

// Get the book list available in the shop
public_users.get('/', function (req, res) {
  //Retrieve the book list from the database or any data source
  const availableBooks = books.filter(book => book.available);

  //Check if there are any available books
  if (availableBooks.length === 0) {
    return res.status(404).json({ message: "No books available" });
  }

  // If books are availble, send them as a response
  return res.status(200).json({ books: availableBooks });
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  //Extract the ISBN from the request parameters
  const isbn = req.params.isbn;

  //Implement logic to get the book details based on ISBN
  const book = books.getBookByISBN(isbn);

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  } else {
    return res.status(200).json({ book });
  }
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
  //Extract the author from the request parameters
  const author = req.params.author;

  //Implement logic to get the book details based on author
  const booksByAuthor = books.getBooksByAuthor(author);

  if (booksByAuthor.length === 0) {
    return res.status(404).json({ message: "No books found by this author" });
  } else {
    return res.status(200).json({ books: booksByAuthor });
  }
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
  //Extract the title from the request parameters
  const title = req.params.title;

  //Implement logic to get the book details based on title
  const booksByTitle = books.getBooksByTitle(title);

  if (booksByTitle.length === 0) {
    return res.status(404).json({ message: "No books found with this title" });
  } else {
    return res.status(200).json({ books: booksByTitle });
  }
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
  //Extract the ISBN from the request parameters
  const isbn = req.params.isbn;

  //Implement logic to get the book review based on ISBN
  const book = books.getBookByISBN(isbn);

  if (!book) {
    return res.status(404).json({ message: "Review for this book has not been found" });
  } else {
    return res.status(200).json({ reviews: book.reviews });
  }
});

module.exports.general = public_users;
