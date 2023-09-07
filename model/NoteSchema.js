const mongoose = require('mongoose')


//creating schema-->document structure
const NoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  columnId: {
    type:String,
  required: true
},
  date: {
    type: Date,
    default: Date.now
  },
})

//NOTE MODEL
const Note = mongoose.model("Note", NoteSchema)





module.exports = Note
