import {Component,OnInit} from '@angular/core';
import {Router,ActivatedRoute,Params} from '@angular/router';
import { User } from'../../models/user';
import {GLOBAL} from '../../services/global';
import {UserService} from '../../services/user.service';


@Component({
	selector:'register',
	templateUrl:'./register.component.html',
	providers: [UserService]
})

export class RegisterComponent implements OnInit{
	public title:String;
	public user:User;
	public message:string;


	constructor(
		private _route:ActivatedRoute,
		private _router:Router,
		private _userService:UserService
	){
		this.title='Registro';
		this.user= new User('','','','','','','','','');
	}

	ngOnInit(){
		console.log('Registro cargado');
	}
	onSubmit(registerForm){
		this.message='error';
		this._userService.Register(this.user).subscribe(
			response=>{
				if(response.user && response.user._id){
					//this.user = response.user;
					this.message ='success';
					this.user= new User('','','','','','','','','');
					registerForm.reset();
				}
				
			},
			error=>{
				console.log(<any>error);
			}
		);
	}
}