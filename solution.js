// import express from "express";
// import bodyParser from "body-parser";
const bodyParser = require("body-parser")
const express = require("express")
// import 
const mongoose = require('mongoose')

const app = express();
const port = 4000;

const dotenv = require("dotenv")   //requiring dotenv
dotenv.config({ path: "./config.env" })


require("./db/connection")
// require('../db/connection')
const Note = require('./model/NoteSchema')

// In-memory data store
let posts = [
  {
    id: 1,
    title: "The Rise of Decentralized Finance",
    content:
      "Decentralized Finance (DeFi) is an emerging and rapidly evolving field in the blockchain industry. It refers to the shift from traditional, centralized financial systems to peer-to-peer finance enabled by decentralized technologies built on Ethereum and other blockchains. With the promise of reduced dependency on the traditional banking sector, DeFi platforms offer a wide range of services, from lending and borrowing to insurance and trading.",
    author: "Alex Thompson",
    date: "2023-08-01T10:00:00Z",
  },
  {
    id: 2,
    title: "The Impact of Artificial Intelligence on Modern Businesses",
    content:
      "Artificial Intelligence (AI) is no longer a concept of the future. It's very much a part of our present, reshaping industries and enhancing the capabilities of existing systems. From automating routine tasks to offering intelligent insights, AI is proving to be a boon for businesses. With advancements in machine learning and deep learning, businesses can now address previously insurmountable problems and tap into new opportunities.",
    author: "Mia Williams",
    date: "2023-08-05T14:30:00Z",
  },
  {
    id: 3,
    title: "Sustainable Living: Tips for an Eco-Friendly Lifestyle",
    content:
      "Sustainability is more than just a buzzword; it's a way of life. As the effects of climate change become more pronounced, there's a growing realization about the need to live sustainably. From reducing waste and conserving energy to supporting eco-friendly products, there are numerous ways we can make our daily lives more environmentally friendly. This post will explore practical tips and habits that can make a significant difference.",
    author: "Samuel Green",
    date: "2023-08-10T09:15:00Z",
  },
  {
    id: 3,
    title: "Sustainable Living: Tips for an Eco-Friendly Lifestyle",
    content:
      "Sustainability is more than just a buzzword; it's a way of life. As the effects of climate change become more pronounced, there's a growing realization about the need to live sustainably. From reducing waste and conserving energy to supporting eco-friendly products, there are numerous ways we can make our daily lives more environmentally friendly. This post will explore practical tips and habits that can make a significant difference.",
    author: "Samuel Green",
    date: "2023-08-10T09:15:00Z",
  },
  {
    id: 3,
    title: "Sustainable Living: Tips for an Eco-Friendly Lifestyle",
    content:
      "Sustainability is more than just a buzzword; it's a way of life. As the effects of climate change become more pronounced, there's a growing realization about the need to live sustainably. From reducing waste and conserving energy to supporting eco-friendly products, there are numerous ways we can make our daily lives more environmentally friendly. This post will explore practical tips and habits that can make a significant difference.",
    author: "Samuel Green",
    date: "2023-08-10T09:15:00Z",
  },
  {
    id: 3,
    title: "Sustainable Living: Tips for an Eco-Friendly Lifestyle",
    content:
      "Sustainability is more than just a buzzword; it's a way of life. As the effects of climate change become more pronounced, there's a growing realization about the need to live sustainably. From reducing waste and conserving energy to supporting eco-friendly products, there are numerous ways we can make our daily lives more environmentally friendly. This post will explore practical tips and habits that can make a significant difference.",
    author: "Samuel Green",
    date: "2023-08-10T09:15:00Z",
  },
  {
    id: 3,
    title: "Sustainable Living: Tips for an Eco-Friendly Lifestyle",
    content:
      "Sustainability is more than just a buzzword; it's a way of life. As the effects of climate change become more pronounced, there's a growing realization about the need to live sustainably. From reducing waste and conserving energy to supporting eco-friendly products, there are numerous ways we can make our daily lives more environmentally friendly. This post will explore practical tips and habits that can make a significant difference.",
    author: "Samuel Green",
    date: "2023-08-10T09:15:00Z",
  },
  {
    id: 3,
    title: "Sustainable Living: Tips for an Eco-Friendly Lifestyle",
    content:
      "Sustainability is more than just a buzzword; it's a way of life. As the effects of climate change become more pronounced, there's a growing realization about the need to live sustainably. From reducing waste and conserving energy to supporting eco-friendly products, there are numerous ways we can make our daily lives more environmentally friendly. This post will explore practical tips and habits that can make a significant difference.",
    author: "Samuel Green",
    date: "2023-08-10T09:15:00Z",
  },
  {
    id: 3,
    title: "Sustainable Living: Tips for an Eco-Friendly Lifestyle",
    content:
      "Sustainability is more than just a buzzword; it's a way of life. As the effects of climate change become more pronounced, there's a growing realization about the need to live sustainably. From reducing waste and conserving energy to supporting eco-friendly products, there are numerous ways we can make our daily lives more environmentally friendly. This post will explore practical tips and habits that can make a significant difference.",
    author: "Samuel Green",
    date: "2023-08-10T09:15:00Z",
  },
];

let lastId = 3;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Separate posts into columns
const column1 = [
];
const column2 = [
];
const column3 = [
];

// GET all posts
// app.get("/posts", (req, res) => {
//   // console.log(posts);


// Note.find()
//   .then(notes => {
//     // console.log(notes);
//     notes.forEach((note, index) => {
//       if (index % 3 === 0) {
//         column1.push(note);
//       } else if (index % 3 === 1) {
//         column2.push(note);
//       } else {
//         column3.push(note);
//       }
//     });
//   })
//   .catch(err => {
//     console.log(err);
//   });
//     console.log(column1)
//   res.json(posts);
// });

app.get("/posts", (req, res) => {

  // Clear existing data in columns
  column1.length = 0; 
  column2.length = 0;
  column3.length = 0;

  // posts.forEach((note, index) => {
  //   if (index % 3 === 0) {
  //     column1.push(note);
  //   } else if (index % 3 === 1) {
  //     column2.push(note);
  //   } else {
  //     column3.push(note);
  //   }   
  // });
  //   console.log(column1)
  // console.log(column2)
  // console.log(column3)

  Note.find()
  .then(notes => {
    notes.forEach(async(note, index) => {
      // console.log(note)
      if (note.columnId === "1") {
       await column1.push(note);
      } else if (note.columnId === "2") {
       await column2.push(note);
      } else {
       await column3.push(note);
      }
    });
    // console.log('column1')
    // console.log(column1);
    res.json({ column1, column2, column3 });
  })

  //   // console.log(column2);
  //   // console.log(column3);

  })
  // res.json({ column1, column2, column3 });

  // .catch(err => {
  //   console.log(err);
  //   res.status(500).json({ message: "Error fetching posts" });
  // });

// app.get("/posts", (req, res) => {
//   // Clear existing data in columns
//   column1.length = 0;
//   column2.length = 0;
//   column3.length = 0;

// Note.find()
//   .then(notes => {
//     notes.forEach((note, index) => {
//       if (index % 3 === 0) {
//         column1.push(note);
//       } else if (index % 3 === 1) {
//         column2.push(note);
//       } else {
//         column3.push(note);
//       }
//     });

//     console.log(column1);
//     console.log(column2);
//     console.log(column3);

//     res.json({ column1, column2, column3 });
//   })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({ message: "Error fetching posts" });
//     });
// });



// GET a specific post by id
app.get("/posts/:id", (req, res) => {
  // const post = posts.find((p) => p.id === parseInt(req.params.id));
  
  // Note.find() .then(notes => {
  //   notes.forEach(async(note, index) => {
  //     if(JSON.stringify(note._id) === req.params.id){
  //       res.json(note);
  //     }
  //     else if (!note){ 
  //       return res.status(404).json({ message: "Post not found" })};
  //   });
  // })
  
  
Note.findOne({ _id: mongoose.Types.ObjectId.createFromHexString(req.params.id) })
.then(foundNote => {
  if (foundNote) {
    res.json(foundNote);
  } else {
    res.status(404).json({ message: "Post not found" });
  }
})
.catch(error => {
  console.log(error)
});

  
  // if (!post) return res.status(404).json({ message: "Post not found" });
  // res.json(post);
});

// const firstContainer=document.getElementById("fcont");

// POST a new post
app.post("/posts", (req, res) => {
  const newId = lastId += 1;
  const post = {
    id: newId,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    date: new Date(),
    // columnId: req.body.columnId
  };
  const note = new Note(
    {
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
      columnId: req.body.columnId
    }
  );
  note.save()

  // lastId = newId;


  // Get the column ID from the request body
  // const columnId = req.body.columnId;
  // console.log( columnId)
  // Add the post to the specific column based on its ID
  // if (columnId === "1") {
    // Add post to column1
    // column1.push(post);
  // } else if (columnId === "2") {
    // Add post to column2
    // column2.push(post);
  // } else if (columnId === "3") {
    // Add post to column3
    // column3.push(post);
  // }
  // posts.push(post);

  res.status(201).json(post);
});

// PATCH a post when you just want to update one parameter
// app.patch("/posts/:id",async (req, res) => {
//   const post =await posts.find((p) => p.id === parseInt(req.params.id));
//   if (!post) return res.status(404).json({ message: "Post not found" });

// Note.findOne({ _id: mongoose.Types.ObjectId.createFromHexString(req.params.id) })
// .then(foundNote => {
//   if (foundNote) {
//     if (req.body.title) foundNote.title = req.body.title;
//   if (req.body.content) foundNote.content = req.body.content;
//   if (req.body.author) foundNote.author = req.body.author;
//     res.json(foundNote);
//   } else {
//     res.status(404).json({ message: "Post not found" });
//   }
// })
// .catch(error => {
//   console.log(error)
// });

  // if (req.body.title) post.title = req.body.title;
  // if (req.body.content) post.content = req.body.content;
  // if (req.body.author) post.author = req.body.author;
//  post.title = req.body.title;
//  post.content = req.body.content;
//  post.author = req.body.author;
// console.log(post.title)
  // res.json(post);
// });
app.patch("/posts/:id", async (req, res) => {
  try {
    const foundNote = await Note.findOne({ _id: mongoose.Types.ObjectId.createFromHexString(req.params.id) });

    if (!foundNote) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (req.body.title) {
      foundNote.title = req.body.title;
    }
    if (req.body.content) {
      foundNote.content = req.body.content;
    }
    if (req.body.author) {
      foundNote.author = req.body.author;
    }
    console.log(foundNote.columnId)
    if (foundNote.columnId === "1") {
       column1.push(foundNote);
     } else if (foundNote.columnId === "2") {
       column2.push(foundNote);
     } else {
       column3.push(foundNote);
     }
    const updatedNote = await foundNote.save();

    res.json(updatedNote);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating post" });
  }
});
// DELETE a specific post by providing the post id
app.delete("/posts/:id", (req, res) => {
  // const index = posts.findIndex((p) => p.id === parseInt(req.params.id));
  // if (index === -1) return res.status(404).json({ message: "Post not found" });

  Note.deleteOne({ _id: mongoose.Types.ObjectId.createFromHexString(req.params.id) })
.then(res.json("successfully deleted"))
.catch(error => {
  // console.log(error)
  res.status(500).json({ message: "Error deleting post" });
  
});

  // posts.splice(index, 1);
  // res.json({ message: "Post deleted" });
});

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
