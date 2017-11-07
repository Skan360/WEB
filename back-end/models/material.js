'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MaterialSchema = Schema({
	name:String,
	tipoET:String,
	tipoVD:String,
	//assignment: {type:Schema.ObjectId,ref:'User'},
	file:String,
	profesor:String,
	//assignment_name:String,
	subtopic_id: String
});

module.exports=mongoose.model('Material',MaterialSchema);