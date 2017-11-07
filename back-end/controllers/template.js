'use strict'
//modulos
var fs = require('fs');
var path = require('path');
var a;
//modelos
var Template = require('../models/template');

//acciones o funciones
//funcion de prueba

//Modificar datos usuario
function updateTemplate(req,res){
	//res.status(200).send({message:'Actualizar maestro-admin'});
	var templateId = req.params.id;
	var update = req.body;
	console.log(templateId);
	console.log(update);
	//if(templateId != req.template.sub){
		//return res.status(500).send({message:'Error no tienes permiso para actualizar datos'});
	//}else{
		Template.findByIdAndUpdate(templateId,update,{new:true},(err,templateUpdated)=>{
			if(err){
				res.status(500).send({message:'Error al actualizar datos'});
			}else{
				if(!templateUpdated){	
					res.status(500).send({message:'No se pudo actualizar datos'});
				}else{
					res.status(200).send({template: templateUpdated});
				}
			}
		});
	//} cierre else

}
//Obtener datos del template
function getInfoTemplate(req,res){
	var assignment_id = req.params.assignment_id;
	Template.findOne({assignment:assignment_id},(err,assignment)=>{
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
	updateTemplate,
	getInfoTemplate
};