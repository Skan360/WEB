'use strict'
//modulos
var fs = require('fs');
var path = require('path');
//modelos
var User = require('../models/user');
var Material = require('../models/material');
var Assignment = require('../models/assignment');
var Subtopic = require('../models/subtopic');
//servicio jwt
var jwt = require('..//services/jwt');



//funciones
function saveMaterial(req,res){
	//Crear objeto usuario
	var material = new Material();
	//Recibir los parametros
	var params = req.body;

	if (/*params.name && params.tipoET && params.tipoVD && params.subtopic_id*/params.profesor) {

		material.name= params.name;
		//material.assignment_name=req.user.assignment_name;
		//material.assignment=req.user.assignment;
		material.tipoVD=params.tipoVD;
		material.tipoET=params.tipoET;
		material.file=null;
		material.profesor=params.profesor;
		material.subtopic_id=params.subtopic_id;

		//var assignmentId = req.user.assignment;
		var subtopicId = material.subtopic_id;

		Subtopic.findById(subtopicId,(err,issetSubtopic)=>{
			if(err){
				//res.status(500).send({message:'Error al comprobar subtema'});
			}else{
				if(issetSubtopic){
					//material.assignment_name=issetAssignment.assignment_name;
					Material.findOne({name:material.name,subtopic_id:material.subtopic_id},(err,issetMaterial)=>{
						if(err){
							res.status(500).send({message:'Error al comprobar material'});
						}else{
							if(!issetMaterial){
								//guardar material
								material.save((err,materialStored)=>{
									if(err){
										res.status(500).send({message:'Error en el servidor'});
									}else{
										if(!materialStored){
											res.status(500).send({message:'No se guardo el material'});
										}else{
											res.status(200).send({material:materialStored});
										}
									}
								});
							}
							else{
								res.status(404).send({message:'Nombre para el material ya existente'});
							}
						}
					});
				}else{
					//res.status(500).send({message:'Error'});
				}
			}
		});
	}else{
		res.status(200).send({
			message:'Introduce todos los datos para agregar el material'
		});
	}
}

function uploadFile(req,res){
	var materialId=req.params.id;
	var file_name = 'No subir';
	//console.log(req.files);
	if(req.files){
		var file_path = req.files.file.path;
		var file_split = file_path.split('\\');
		var file_name = file_split[2];
		var ext_split = file_name.split('\.');
		var file_ext = ext_split[1];
		if(file_ext =='pdf' || file_ext =='docx' || file_ext =='pptx' || file_ext =='MP4' || file_ext=='png' || file_ext=='jpg'){
			//if(materialId != req.user.sub){
			//	return res.status(500).send({message:'Error no tienes permiso para subir material'});
			//}else{
				Material.findByIdAndUpdate(materialId,{file:file_name},{new:true},(err,materialUpdated)=>{
					if(err){
						res.status(500).send({message:'Error al cargar documento'});
					}else{
						if(!materialUpdated){	
							res.status(500).send({message:'No se pudo guardar el material'});
						}else{
							res.status(200).send({material: materialUpdated,file:file_name});
						}
					}
				});
			//}
		}else{
			fs.unlink(file_path,(err)=>{
				if(err){
					res.status(200).send({message:'Extension no valida y fichero borrado'});
				}else{
					res.status(200).send({message:'Extension no valida'});
				}
			});

		}

	}else{
		res.status(200).send({message:'No se han subido archivos'});
	}

}

function getFile(req,res){
	var file = req.params.file;
	var path_file = './uploads/materials/'+file;
	fs.exists(path_file,(exists)=>{
		if(exists){
			res.sendFile(path.resolve(path_file));
		}else{
			res.status(404).send({message:'No hay documento con esta URL'});
		}
	});

}

function deleteMaterial(req,res){
	var materialId=req.params.id;
	var body=req.body;
	Material.findByIdAndRemove(materialId,(err,materialRemoved)=>{
			if(err){
				res.status(500).send({message:'Error en la peticion'});
			}else{
				if(!materialRemoved){	
					res.status(500).send({message:'No se pudo borrar'});
				}else{
				res.status(200).send({material:materialRemoved});
				}
			}	
		});
}
//exportar funciones
module.exports = {
	saveMaterial,
	uploadFile,
	getFile,
	deleteMaterial
};