// import express from "express";
// import bodyParser from "body-parser";
// import axios from "axios";
const bodyParser=require("body-parser")
const express=require("express")
const axios=require("axios")
const mongoose = require('mongoose');
const path = require('path');



const app = express();
const PORT = process.env.PORT || 3000;
const API_URL =  "https://api-74io.onrender.com";

// const dotenv= require("dotenv")   //requiring dotenv


//including or using dotenv to secure our necessary or important data
// dotenv.config({path:"./config.env"})

// require("./db/connection")

// app.use(express.static("public"));
// Use path.join to construct the correct file path
app.use('/public', express.static(path.join(__dirname, 'public')));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
  res.render("modify.ejs", { heading: "New Post", submit: "Create Post",id:req.params.id });
});

app.get("/edit/:id", async (req, res) => {
  try {
    console.log(req.params.id)
    const response = await axios.get(`${API_URL}/posts/${req.params.id}`);
    
    console.log(response.data);
    res.render("modify.ejs", {
      heading: "Edit Post",
      submit: "Update Post",
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
    // console.log(response.data)
    // console.log(response.data.columnId)
    // console.log("helloies")
    // console.log(response.data);
    // console.log("helloies")
    // res.redirect("/");F
    // const uppost=
    // res.render("index.ejs", { posts: response.data });
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
