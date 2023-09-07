// import express from "express";

const bodyParser=require("body-parser")
const express=require("express")
const axios=require("axios")
const mongoose = require('mongoose');
const path = require('path');





const app = express();

//cors policy
const cors = require('cors');
const corsOptions ={
  origin: '*', 
  credentials: true,
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

//PORT AND URL
const PORT = process.env.PORT || 3000;
const API_URL =  "https://api-74io.onrender.com" || "http://localhost:3000";

//SERVING STATIC FILES
app.use( express.static(path.join(__dirname, 'public')));

//CONFIG BODYPARSER
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//SETTING VIEWS ENGINE
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Route to render the main page
app.get("/", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/posts`);
    // console.log(response);
    res.render("index.ejs", { posts: response.data });
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts" });
  }
});

// Route to render the edit page
app.get("/new/:id", (req, res) => {
  console.log(req.params.id)
  // console.log(id)
  res.render("modify.ejs", { heading: "New Post", submit: "Create Task",id:req.params.id });
});

//DISPLAYING ROUTE FOR EDIT
app.get("/edit/:id", async (req, res) => {
  try {
    console.log(req.params.id)
    const response = await axios.get(`${API_URL}/posts/${req.params.id}`);
    
    console.log(response.data);
    res.render("modify.ejs", {
      heading: "Edit Post",
      submit: "Update Task",
      post: response.data,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching post" });
  }
});

// Create a new post
app.post("/api/posts", async (req, res) => {
  try {
    const response = await axios.post(`${API_URL}/posts`, req.body);
    // console.log(response.data);
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: "Error creating post" });
  }
});

// Partially update a post
app.post("/api/posts/:id", async (req, res) => {
  console.log("called");
  try {
    const response = await axios.patch(
      `${API_URL}/posts/${req.params.id}`,
      req.body
    );
    
    res.redirect("/")

  } catch (error) {
    res.status(500).json({ message: "Error updating post" });
  }
});

// Delete a post
app.get("/api/posts/delete/:id", async (req, res) => {
  try {
    await axios.delete(`${API_URL}/posts/${req.params.id}`);
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: "Error deleting post" });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});
