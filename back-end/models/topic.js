'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TopicSchema = Schema({
	name: String,
	assignment: {type:Schema.ObjectId,ref:'Assignment'}
});

module.exports=mongoose.model('Topic',TopicSchema);