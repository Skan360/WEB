'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3789;

mongoose.Promise=global.Promise;
mongoose.connect('mongodb://localhost:27017/pagina', {useMongoClient:true})
	.then(()=>{
			console.log("Conexion a la BD correcta");
			app.listen(port,()=>{
				console.log("servidor local Node y Express conectado");
			})
	})
	.catch(err=>console.log(err));

