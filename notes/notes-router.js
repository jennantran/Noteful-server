const path = require('path');
const express = require('express');
const xss = require('xss');
const notesRouter = express.Router();
const jsonParser = express.json();
const NotesService = require('./notes-service')

const serializeNote = note => ({
    id: note.id,
    note_name: xss(note.notes_name),
    modified: note.modified,
    folder_id: note.folder_id,
    content: xss(note.content),
});

notesRouter
    .route('/')
    .get((req, res, next) => {
        NotesService.getAllNotes(
            req.app.get('db')
        )
        .then(notes => {
            res.json(notes.map(serializeNote))
        })
        .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
        const { notes_name, folder_id, content} = req.body
        const newNote = { note_names, folder_id, content }

        for (const [key , value] of Object.entries(newNote))
            if(value == null)
                return res.status(400).json({
                    error: { message: `Missing '${key}' in request body` }
                })
      
        NotesService.insertNote(
            req.app.get('db'),
                newNote
            )
            .then( note => {
                res
                    .status(201)
                    .location(path.posix.join(req.originalUrl, `/${note.id}`))
                    .json(serializeNote(note))
            })
            .catch(next)
        });

 notesRouter
        .route('/:note_id')
        .all((req,res,next) => {
            NotesService.getById(req.app.get('db'), req.params.note_id)
                .then(note => {
                    if(!note){
                        return res.status(404).json({
                            error: { message: `Note doesn't exist` }
                        })
                    }
                    res.note = note
                    next()
                })
                .catch(next)
        })
        .get((req,res,next) => {
            res.json(serializeNote(res.note))
        })
        .delete((req,res,next) => {
            FoldersService.deleteNote(
                req.app.get('db'),
                req.params.note_id
            )
            .then( () => {
                res.status(204).end()
            })
            .catch(next)
        })
        .patch(jsonParser, (req,res, next) => {
            const { notes_name, folder_id, content } =req.body
            const noteToUpdate = { notes_name, folder_id, content }

            const numberOfValues = Object.values(noteToUpdate).filter(Boolean).length
            if(numberOfValues === 0)
                return res.status(400).json({
                    error: {
                        message: 'Request body must content name, folder_id, or content'
                    }
                })
            NotesService.updateNote(
                req.app.get('db'),
                req.params.note_id,
                noteToUpdate
                )
            .then(numRowsAffected => {
                res.status(204).end()
            })
            .catch(next)
        })

module.exports = notesRouter
<<<<<<< HEAD
   
=======
   


>>>>>>> master
