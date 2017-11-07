'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SubtopicSchema = Schema({
	name: String,
	topic: {type:Schema.ObjectId,ref:'Topic'}
});

module.exports=mongoose.model('Subtopic',SubtopicSchema);