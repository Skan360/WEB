import { Component,OnInit } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { User } from'../../models/user';
import {GLOBAL} from '../../services/global';
import {UserService} from '../../services/user.service';
import {TemplateService} from '../../services/template.service';
import { Template } from'../../models/template';

@Component({
	selector:'login',
	templateUrl:'./login.component.html',
	providers: [UserService,TemplateService]
})

export class LoginComponent implements OnInit{
	public title:String;
	public user:User;
	public identity;
	public token;
	public status:string;
	public template;

	//public arr;

	constructor(
		private _route:ActivatedRoute,
		private _router:Router,
		private _userService:UserService,
		private _templateService:TemplateService
	){
		this.title='Login';
		this.user= new User('','','','','','','','','');

	}

	ngOnInit(){
		console.log('Login cargado');
	/*	//Obtener un atributo del localstorage
		this.arr = JSON.parse( localStorage.getItem('identity') );
		console.log(this.arr.assignment);
	*/	
		console.log(this._userService.getIdentity());
		console.log(this._userService.getToken());

	}

	onSubmit(){
		this._userService.Login(this.user).subscribe(
			//Datos del usuario
			response=>{
				this.identity=response.user;
				if(!this.identity || !this.identity._id){
					alert('usuario login no correctamente');
				}else{
					this.identity.password='';
					//this.identity.assignment
					this._templateService.getInfoTemplate(this.identity.assignment).subscribe(
	     				  response=>{
	           				 this.template=response.assignment;
	           				// console.log(this.template);
	           				localStorage.removeItem('template');
	            			localStorage.removeItem('assignment');
	            			//localstorage para la materia y el template
	            			localStorage.setItem('template',JSON.stringify(this.template));
	           				 localStorage.setItem('assignment',this.identity.assignment);
	         				 },
	          				error=>{
	           						 console.log(<any>error);
	         				 }
	     			 );
					localStorage.setItem('identity',JSON.stringify(this.identity));
					//Conseguir token
					this._userService.Login(this.user,'true').subscribe(
						response=>{
							this.token=response.token;
							if(this.token.length <= 0){
								alert('token no generado');
							}else{
								localStorage.setItem('token',this.token);
								this.status='success';
								//redireccinamiento cuando inicio sesion
								this._router.navigate(['/inicio']);
							}
						},
						error=>{
							console.log(<any>error);
						}
					);
				}
			},
			error=>{
				var errorMensaje=<any>error;
				if(errorMensaje != null){
					var body = JSON.parse(error._body);
					this.status='error';
				}
			}
		);
	}

}