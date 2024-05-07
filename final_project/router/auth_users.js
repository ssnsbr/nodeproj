const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username) => { //returns boolean
  //write code to check is the username is valid
  if (username == "username") {
    return true;
  }
  return false;
}

const authenticatedUser = (username, password) => { //returns boolean
  //write code to check if username and password match the one we have in records.
  if (isValid(username)) {
    if (password == "password") {
      return true;
    }
  }
  return false;

}

//only registered users can login
regd_users.post("/login", (req, res) => {
  //Write your code here
  const user=req.body.user;
  const username = user.username;
  const password = user.password;
  if (!username) {
    return res.status(404).json({ message: "Body Empty" });
  }
  if (!isValid(username)) {
    return res.status(404).json({ message: "User not found! :" + username });
  }
  if (!authenticatedUser(username, password)) {
    return res.status(404).json({ message: "Wrong pass!" });
  }
  let accessToken = jwt.sign({
    data: user
  }, 'access', { expiresIn: 60 * 600 });
  req.session.authorization = {
    accessToken
  }
  return res.status(200).send("User successfully logged in");
  // return res.status(300).json({ message: "Yet to be implemented" });
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  let isbn = req.params.isbn;
  return res.status(201).json({message:`Review saved for ${isbn}`})

});


// Add a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
  //Write your code here
  let isbn = req.params.isbn;
  return res.status(201).json({message:`Review deleted for ${isbn}`})

});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
