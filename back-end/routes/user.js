'use strict'

var express = require('express');
var UserController = require('../controllers/user');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');
var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/prueba'});


api.get('/pruebas-controller',md_auth.ensureAuth,UserController.pruebas);
api.post('/register',UserController.saveUser);
api.post('/login',UserController.login);
api.put('/update_user/:id',md_auth.ensureAuth,UserController.updateUser);
api.post('/uploadDocument/:id',[md_auth.ensureAuth,md_upload],UserController.uploadDocument);
api.post('/uploadVideo/:id',[md_auth.ensureAuth,md_upload],UserController.uploadVideo);
//api.get('/getFile/:file',md_auth.ensureAuth,UserController.getFile);
api.get('/getInfo',UserController.getInfo);
api.get('/deleteUser/:id',UserController.deleteUser);




module.exports = api;
