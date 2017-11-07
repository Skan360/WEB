'use strict'

var express = require('express');
var AssignmentController = require('../controllers/assignment');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');



api.get('/getInfoAssignments',AssignmentController.getInfoAssignments);
api.get('/getInfoAssignment/:assignment_name',AssignmentController.getInfoAssignment);




module.exports = api;
