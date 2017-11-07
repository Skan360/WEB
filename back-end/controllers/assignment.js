'use strict'
//modulos
var fs = require('fs');
var path = require('path');
//modelos
var Assignment = require('../models/assignment');

//acciones o funciones

//Obtener datos de todas las asignaturas

function getInfoAssignments(req,res){
	Assignment.find({}).exec((err,assignments)=>{
		if(err){
			res.status(500).send({message:'Error de asignaturas'});
		}else{
			if(!assignments){
				res.status(500).send({message:'No hay asignaturas'});
			}else{
				res.status(200).send({assignments});
			}
		}
	});
}

//Obtener datos de una asignatura
function getInfoAssignment(req,res){

	var assignment_name = req.params.assignment_name;
	Assignment.findOne({assignment_name:assignment_name},(err,assignment)=>{
			if(err){
				res.status(500).send({message:'Error al comprobar usuario'});
			}else{
				if(assignment){
					res.status(200).send({assignment});	
				}
				else{
					res.status(404).send({message:'asignatura no existente'});
				}
			}
		});
}

//exportar funciones
module.exports = {
	getInfoAssignments,
	getInfoAssignment
};