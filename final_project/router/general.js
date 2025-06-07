const express = require("express");
const axios = require("axios");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!isValid(username)) {
      users.push({ username: username, password: password });
      return res
        .status(200)
        .json({ message: "User successfully registered. Now you can login" });
    } else {
      return res.status(404).json({ message: "User already exists!" });
    }
  }
  return res
    .status(400)
    .json({ message: "Username and password are required." });
});

public_users.get("/", async function (req, res) {
  try {
    const response = await axios.get("http://localhost:5000/");
    return res.json(response.data);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching books" });
  }
});

public_users.get("/isbn/:isbn", async function (req, res) {
  const isbn = req.params.isbn;
  try {
    const response = await axios.get("http://localhost:5000/");
    const book = response.data[isbn];
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ message: "Books not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error fetching books" });
  }
});

public_users.get("/author/:author", async function (req, res) {
  const author = req.params.author.toLowerCase();
  const matchingBooks = [];

  try {
    const response = await axios.get("http://localhost:5000/");
    const books = response.data;
    for (let isbn in books) {
      if (books[isbn].author.toLowerCase() === author) {
        matchingBooks.push(books[isbn]);
      }
    }
  } catch (error) {
    return res.status(500).json({ message: "Error fetching books" });
  }

  if (matchingBooks.length > 0) {
    res.status(200).json(matchingBooks);
  } else {
    res.status(404).json({ message: "Books not found" });
  }
});

public_users.get("/title/:title", async function (req, res) {
  const title = req.params.title.toLowerCase();
  const matchingBooks = [];

  try {
    const response = await axios.get("http://localhost:5000/");
    const books = response.data;
    for (let isbn in books) {
      if (books[isbn].title.toLowerCase() === title) {
        matchingBooks.push(books[isbn]);
      }
    }
  } catch (error) {
    return res.status(500).json({ message: "Error fetching books" });
  }

  if (matchingBooks.length > 0) {
    res.status(200).json(matchingBooks);
  } else {
    res.status(404).json({ message: "Books not found" });
  }
});

public_users.get("/review/:isbn", function (req, res) {
  const book = books[req.params.isbn];

  if (book) {
    res.status(200).json(book["reviews"]);
  } else {
    res.status(404).json({ message: "Books not found" });
  }
});

module.exports.general = public_users;
