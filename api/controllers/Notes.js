const Joi = require('joi')
const Note = require('../models/Notes')

/**
 * Sign up the user
 * @param {*} req data gotten from the form
 * @param {*} res data gotten after user signed up
 */
const createNote = (req, res) => {
  const title = req.body.title
  const note = req.body.note
  const schema = {
    title: Joi.string().required(),
    note: Joi.string().required()
  }

  const { error } = Joi.validate({ note: note, title: title }, schema)
  if (error) {
    switch (error.details[0].context.key) {
      case 'title':
        if (error.details[0].type === 'any.empty') {
          res.status(400).send({
            error: `${error.details[0].context.key} field is required`
          })
        }
        break
      case 'note':
        if (error.details[0].type === 'any.empty') {
          res.status(400).send({
            error: `${error.details[0].context.key} field is required`
          })
        }
        break
      default:
        res.status(400).send(error)
        break
    }
  } else {
    Note.find({ title: title }, (error, notes) => {
      if (error) {
        return res.status(400).json({error})
      } else {
        if (!notes.title) {
          const createNote = new Note({
            title: title,
            note: note,
            userId: req.decoded.id
          })
          createNote.save((error) => {
            if (error) {
              return res.status(400).json({ error: 'You can not have duplicate note title' })
            }
            return res.status(200).json({ message: 'Note created successfully' })
          })
        }
      }
    })
  }
}

const getNotes = (req, res) => {
  Note.find({}).sort({ date: 'desc' }).exec((error, notes) => {
    if (error) return res.status(400).json({ error: 'There was an error' })
    if (notes.length > 0) {
      return res.status(200).json({notes})
    } else {
      return res.status(200).json({ message: 'There are no notes available' })
    }
  })
}

const getNote = (req, res) => {
  const id = req.params.id
  Note.find({_id: id}, (error, note) => {
    if (error) {
      res.status(400).json({ error: 'There was an error trying to get note' })
    } else {
      if (note.length > 0) {
        res.status(200).json({note})
      } else {
        res.status(404).json({ error: 'Sorry no note available' })
      }
    }
  })
}

module.exports = {
  createNote,
  getNotes,
  getNote
}
