const mongoose = require('mongoose')
// Define a schema
const Schema = mongoose.Schema

const NoteSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  title: {
    type: String,
    unique: true,
    required: true
  },
  note: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

const Note = mongoose.model('Note', NoteSchema)
module.exports = Note
