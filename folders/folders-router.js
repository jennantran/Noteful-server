const path = require('path');
const express = require('express');
const xx = require('xx');


const foldersRouter = express.Router();
const jsonParser = express.json();

const serializeFolder = folder => ({
    id: folder.id,
    folder_name: xxs(folder.folder_name)
});




