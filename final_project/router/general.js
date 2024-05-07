const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req, res) => {
  //Write your code here
  const username = req.query.username;
  const password = req.body.password;
  if (isValid(username)) {
    return res.status(300).json({ message: `User ${username} Registered!` });
  }

});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
  //Write your code here
  let myPromise = new Promise((resolve, reject) => { setTimeout(() => { resolve(books) }, 100) })
  myPromise.then((successMessage) => {
    return res.status(300).json({ message: (successMessage) });
  }).catch((err) => {
    res.status(500).json({ error: "Error:" + err });
  });
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  //Write your code here

  new Promise((resolve, reject) => { setTimeout(() => { resolve(Object.values(books).filter((b) => b.isbn == req.params.isbn)) }, 100) }).then((successMessage) => {
    return res.status(300).json({ message: (successMessage) });
  }).catch((err) => {
    return res.status(500).json({ error: "Error:" + err });
  });

});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
  //Write your code here
  console.log(Object.keys(books))

  // console.log(Object.values(books).filter((b)=>b.author==req.params.author))
  new Promise((resolve, reject) => { setTimeout(() => { resolve(Object.values(books).filter((b) => b.author == req.params.author)) }, 100) }).then((successMessage) => {
    return res.status(300).json({ message: (successMessage) });
  }).catch((err) => {
    return res.status(500).json({ error: "Error:" + err });
  });

  // return res.status(300).json({ message: Object.values(books).filter((b) => b.author == req.params.author) });
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
  //Write your code here
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(
        Object.values(books).filter((b) => b.title == req.params.title)
      )
    }, 100)
  }).then((successMessage) => {
    return res.status(300).json({ message: (successMessage) });
  }).catch((err) => {
    return res.status(500).json({ error: "Error:" + err });
  });
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  const bb = Object.values(books).filter((b) => b.isbn == req.params.isbn)
  if (bb.isem)
    return res.status(300).json(bb.reviews);
});

module.exports.general = public_users;
