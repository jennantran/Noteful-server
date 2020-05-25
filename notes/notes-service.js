const NotesService = {
    getAllNotes(knex) {
      return knex.select('*').from('noteful-notes')
    },
    insertNote(knex, newNote) {
      return knex
        .insert(newNote)
        .into('noteful_notes')
        .returning('*')
        .then(rows => {
          return rows[0]
        })
    },
    getById(knex, id) {
      return knex.from('noteful_notes').select('*').where('id', id).first()
    },
    deleteNote(knex, id) {
      return knex('noteful-notes')
        .where({ id })
        .delete()
    },
    updateArticle(knex, id, newNoteFields) {
      return knex('noteful_notes')
        .where({ id })
        .update(newNoteFields)
    },
  }
  
  module.exports = NotesService