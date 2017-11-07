'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AssignmentSchema = Schema({
	assignment_name: String
});

module.exports=mongoose.model('Assignment',AssignmentSchema);