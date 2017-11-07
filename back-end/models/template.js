'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TemplateSchema = Schema({
	style_menu:{ backgroundColor:String, color:String, fontFamily:String },
	/*
	background_color:String,
	color:String,*/
	assignment_name:String,
	assignment:{type:Schema.ObjectId,ref:'Assignment'}//,
	//user:{type:Schema.ObjectId,ref:'User'}
});

module.exports=mongoose.model('Template',TemplateSchema);