'use strict'
//modulos
var bcrypt = require('bcrypt-nodejs');
var fs = require('fs');
var path = require('path');
var a;
//modelos
var User = require('../models/user');
var Template = require('../models/template');
var Assignment = require('../models/assignment');
//servicio jwt
var jwt = require('..//services/jwt');



//acciones o funciones
//funcion de prueba
function pruebas(req,res){
	res.status(200).send({
		message:'Probando controller user',
		user: req.user
	});

}
//funcion de envio de datos de nuevo usuario (registro)
function saveUser(req,res){
	//Crear objeto usuario
	var user = new User();
	var user2 = new User();
	var template = new Template();
	var assignment = new Assignment();
	//Recibir los parametros
	var params = req.body;
	//valor del objeto
	//admin-maestro y maestro
	if (params.password && params.name && params.email && params.assignment_name) {
		//admin-maestro valores
		user.name= "admin-maestro-"+params.name;
		user.email=params.email;
		user.role="ROLE_ADMIN_MAESTRO";
		user.assignment_name=params.assignment_name;
		//maestro valores
		user2.name= params.name;
		user2.role="ROLE_MAESTRO";
		user2.assignment_name=params.assignment_name;
		//template valores por default
		template.style_menu.backgroundColor ="red";
		template.style_menu.color = "black";
		template.style_menu.fontFamily = "Helvetica";
		template.assignment_name=params.assignment_name;
		//assignment
		assignment.assignment_name=params.assignment_name;
		User.findOne({assignment_name:user.assignment_name},(err,issetUser)=>{
			if(err){
				res.status(500).send({message:'Error al comprobar asignatura'});
			}else{
				if(!issetUser){
					//guardar template
					assignment.save((err4,userStored4)=>{
						if (err) {

						} else{
							if(!userStored4){

							}else{
								template.assignment=userStored4.id;
								template.save((err3,userStored3)=>{
								if(err){
									//res.status(500).send({message:'Error al guardar usuario'});
								}else{
									if(!userStored3){
										//res.status(404).send({message:'No se ha registrado el usuario'});
									}else{
										//res.status(200).send({user:userStored3.id});
										//a= userStored3.id;
										//res.status(200).send({user3:a});
										user.template=userStored3.id;
										user.assignment=userStored4.id;
										user2.assignment=userStored4.id;
										user2.template=userStored3.id;

										//admin-maestro
										//cifrar password
										bcrypt.hash(params.password,null,null,function(err,hash){
											user.password=hash;
											//guardar user en bd
											user.save((err,userStored)=>{
												if(err){
													//res.status(500).send({message:'Error al guardar usuario'});
												}else{
													if(!userStored){
														//res.status(404).send({message:'No se ha registrado el usuario'});
													}else{
														res.status(200).send({user:userStored});
													}
												}
											});
										});
										//maestro
										//cifrar password
										bcrypt.hash(params.password,null,null,function(err,hash){
											user2.password=hash;
											//guardar user en bd
											user2.save((err2,userStored2)=>{
												if(err){
													//res.status(500).send({message:'Error al guardar usuario'});
												}else{
													if(!userStored2){
														//res.status(404).send({message:'No se ha registrado el usuario'});
													}else{
														//res.status(200).send({user2:userStored2});
													}
												}
											});
										});
										//agregar assignment a table assignment
										/*assignment.save((err4,userStored4)=>{
											if (err) {

											} else{
												if(!userStored4){

												}else{

												}
											}
										});*/

									}
								}
							});
							}
						}
					});


				}
				else{
					res.status(404).send({message:'Asignatura ya existente'});
				}
			}
		});
	}else{
		res.status(200).send({
			message:'Introduce todos los datos para registrarse'
		});
	}
}

//funcion de login
function login (req,res) {
	var params = req.body;
	var name = params.name;
	var password = params.password;
	
	User.findOne({name:name},(err,user)=>{
			if(err){
				res.status(500).send({message:'Error al comprobar usuario'});
			}else{
				if(user){
					bcrypt.compare(password,user.password,(err,check)=>{
						if(check){
							//comprobar y generar token
							if(params.gettoken){
								//devolver token
								res.status(200).send({
									token:jwt.createToken(user)
								});
							}else{
								res.status(200).send({user});
							}
						}else{
							res.status(404).send({message:'Usuario password incorrecta'});
						}
					});
					
				}
				else{
					res.status(404).send({message:'Usuario no existe'});
				}
			}
		});

}

//Modificar datos usuario
function updateUser(req,res){
	//res.status(200).send({message:'Actualizar maestro-admin'});
	var userId = req.params.id;
	var update = req.body;
	if(userId != req.user.sub){
		return res.status(500).send({message:'Error no tienes permiso para actualizar datos'});
	}else{
		User.findByIdAndUpdate(userId,update,{new:true},(err,userUpdated)=>{
			if(err){
				res.status(500).send({message:'Error al actualizar datos'});
			}else{
				if(!userUpdated){	
					res.status(500).send({message:'No se pudo actualizar datos'});
				}else{
					res.status(200).send({user: userUpdated});
				}
			}
		});
	}

}

function deleteUser(req,res){
	//al eliminar la asignatura el primer id a borrar sera el del administrador de la materia
	var userId=req.params.id;
	var body=req.body;
	var assignment;
	//buscar del admin-maestro la materia
	User.findById(userId,body,{new:true},(err,user)=>{
			if(err){
				//res.status(500).send({message:'Error al actualizar datos'});
			}else{
				if(!user){	
				//	res.status(500).send({message:'No se pudo actualizar datos'});
				}else{
					//res.status(200).send({user: user.assignment});
					//console.log(user.assignment);
					User.find({role:'ROLE_MAESTRO',assignment:user.assignment}).select('id').exec((err,user1)=>{
						if(err){
							res.status(500).send({message:'Error peticion'});
						}else{
							if(!user1){
								res.status(500).send({mesagge:'No hay registros'});
							}else{
								User.findByIdAndRemove(user.id,(err,UserRemoved)=>{
										if(err){
											res.status(500).send({message:'Error al borrar user'});
										}else{
											if(!UserRemoved){
												res.status(500).send({message:'No se ha borrado el user'});
											}else{
												res.status(200).send({user:UserRemoved});
											}
										}
								});
								User.findByIdAndRemove(user1,(err,User1Removed)=>{
										if(err){
											//res.status(500).send({message:'Error al borrar user'});
										}else{
											if(!User1Removed){
												//res.status(500).send({message:'No se ha borrado el user'});
											}else{
												//res.status(200).send({user:User2Removed});
											}
										}
								});
							//	res.status(200).send({user1});
							}
						}
					});
				}
			}
		});
}
//Funciones para material

function uploadDocument(req,res){
	var userId=req.params.id;
	var file_name = 'No subir';
	console.log(req.files);
	if(req.files){
		var file_path = req.files.file.path;
		var file_split = file_path.split('\\');
		var file_name = file_split[2];
		var ext_split = file_name.split('\.');
		var file_ext = ext_split[1];
		if(file_ext =='pdf' || file_ext =='docx' || file_ext =='pptx'){
			if(userId != req.user.sub){
				return res.status(500).send({message:'Error no tienes permiso para actualizar datos'});
			}else{
				User.findByIdAndUpdate(userId,{file:file_name},{new:true},(err,userUpdated)=>{
					if(err){
						res.status(500).send({message:'Error al cargar documento'});
					}else{
						if(!userUpdated){	
							res.status(500).send({message:'No se pudo actualizar datos'});
						}else{
							res.status(200).send({user: userUpdated,file:file_name});
						}
					}
				});
			}
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
function uploadVideo(req,res){
	var userId=req.params.id;
	var file_name = 'No subir';
	console.log(req.files);
	if(req.files){
		var file_path = req.files.file.path;
		var file_split = file_path.split('\\');
		var file_name = file_split[2];
		var ext_split = file_name.split('\.');
		var file_ext = ext_split[1];
		if(file_ext =='MP4' ){
			if(userId != req.user.sub){
				return res.status(500).send({message:'Error no tienes permiso para actualizar datos'});
			}else{
				User.findByIdAndUpdate(userId,{file:file_name},{new:true},(err,userUpdated)=>{
					if(err){
						res.status(500).send({message:'Error al cargar video'});
					}else{
						if(!userUpdated){	
							res.status(500).send({message:'No se pudo actualizar datos'});
						}else{
							res.status(200).send({user: userUpdated,file:file_name});
						}
					}
				});
			}
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
	var path_file = './uploads/prueba/'+file;
	fs.exists(path_file,(exists)=>{
		if(exists){
			res.sendFile(path.resolve(path_file));
		}else{
			res.status(404).send({message:'No hay documento con esta URL'});
		}
	});

}

function getInfo(req,res){
	User.find({role:'ROLE_MAESTRO'}).populate({path:'template'}).exec((err,users)=>{
		if(err){
			res.status(500).send({message:'Error peticion'});
		}else{
			if(!users){
				res.status(500).send({mesagge:'No hay registros'});
			}else{
				res.status(200).send({users});
			}
		}
	});
}


//exportar funciones
module.exports = {
	pruebas,
	saveUser,
	login,
	updateUser,
	uploadDocument,
	uploadVideo,
	getFile,
	getInfo,
	deleteUser
};