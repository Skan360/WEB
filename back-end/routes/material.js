'use strict'

var express = require('express');
var MaterialController = require('../controllers/material');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');
var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/materials'});

api.post('/saveMaterial',md_upload,MaterialController.saveMaterial);//Falta autenticar
api.post('/uploadFile/:id',[md_auth.ensureAuth,md_upload],MaterialController.uploadFile);
//api.get('/getFiles/:file',MaterialController.getFiles);
api.get('/getFile/:file',MaterialController.getFile);
api.delete('/deleteMaterial/:id',md_auth.ensureAuth,MaterialController.deleteMaterial);



module.exports = api;