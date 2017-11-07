'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
	name:String,
	//surname:String,
	email: String,
	password:String,
	assignment_name:String,
	role:String,
	//teorico
	template: {type:Schema.ObjectId,ref:'Template'},
	//para los videos,documentos
	file:String,
	assignment: {type:Schema.ObjectId,ref:'Assignment'}
});

module.exports=mongoose.model('User',UserSchema);