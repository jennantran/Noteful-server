const path = require('path');
const express = require('express');
const xxs = require('xxs');
const foldersRouter = express.Router();
const jsonParser = express.json();
const FoldersService = require('./folders-service')

const serializeFolder = folder => ({
    id: folder.id,
    folder_name: xxs(folder.folder_name)
});

foldersRouter
    .route('/')
    .get((req, res, next) => {
        FoldersService.getAllFolders(
            req.app.get('db')
        )
        .then(folders => {
            res.json(folders.map(serializeFolders))
        })
        .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
        const { folder_name } = req.body
        const newFolder = { folder_name }

        for (const [key , value] of Object.entries(newFolder))
            if(value == null){
                return res.status(400).json({
                    error: { message: `Missing '${key}' in request body` }
                })
            
        }
        FoldersService.insertFolder(
            req.app.get('db'),
                newFolder
            )
            .then( folder => {
                res
                    .status(201)
                    .json(serializeFolder(folder))
            })
            .catch(next)
        });

    foldersRouter
        .route('/:folder_id')
        .all((req,res,next) => {
            FoldersService.getById('db', req.params.folder_id)
                .then(folder => {
                    if(!folder){
                        return res.status(404).json({
                            error: { message: `Folder doesn't exist` }
                        })
                    }
                    res.folder = folder
                    next()
                })
                .catch(next)
        })
        .get((req,res,next) => {
            res.json(serializeFolder(res.folder))
        })
        .delete((req,res,next) => {
            FoldersService.deleteService(
                req.app.get('db'),
                req.params.folder_id
            )
            .then(numRowsAffected => {
                res.status(204).end()
            })
            .catch(next)
        })
        
module.exports(artilesRouter)
   


