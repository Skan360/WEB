import { Assignment } from './../../models/assignment';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import {GLOBAL} from '../../services/global';
import {UserService} from '../../services/user.service';
import {TemplateService} from '../../services/template.service';
import { Template } from '../../models/template';

@Component({
  selector: 'updateTemp',
  templateUrl: './updateTemp.component.html',
  styleUrls: ['./updateTemp.component.css'],
  providers: [UserService,TemplateService]
})

export class UpdateTempComponent implements OnInit{
   
    title: string;
    public user: User;
    public identity;
    public token;
    public template;
    public message:string;
    public newTemplate: Template;
    bgCurrent = { 'backgroundColor' : '' }; 
    auxTemp = { 'backgroundColor': '', 'color': '','fontFamily': ''  }

    hover;

    pac = {
        'fontSize' : '1.3em',
        'fontFamily' : 'Pacifico'
    };

    nos = {
        'fontSize' : '1.3em',
        'fontFamily' : 'Nosifer'
    };

    indi = {
        'fontSize' : '1.3em',
        'fontFamily' : 'Indie Flower'
    };

    constructor(
      private _route:ActivatedRoute,
      private _router:Router,
      private _userService: UserService,
      private _templateService:TemplateService
    ) {
      this.title = 'Update';
      this.newTemplate = new Template('',this.auxTemp);
      
    }

    ngOnInit(){
        this.token = this._userService.getToken();
        this.identity = this._userService.getIdentity();
        console.log('Token: ' + this.token);
        console.log('Assignment: '+ this.identity.assignment);
        console.log('Template: ' + this.identity.template);

        this._templateService.getInfoTemplate(this.identity.assignment).subscribe(
            response=>{
                //Cargar valores actuales
                this.bgCurrent.backgroundColor=response.assignment.style_menu.backgroundColor;
                },
                error=>{
                            console.log(<any>error);
                }
        );
    }

   
    onSubmit(updateForm){
        console.log( 'Entrando a onSubmit');
        console.log(this.newTemplate.style_menu);
        
        this.message='error';
        this._templateService.updateTemplate(this.identity.template,this.newTemplate.style_menu,this.token).subscribe(
            response => {
                console.log( 'Response de update: ');
                console.log(response);
                updateForm.reset();
                //********************Recargar local storage******************************************
                this._templateService.getInfoTemplate(this.identity.assignment).subscribe(
                    response=>{
                        this.message ='success';
                        this.template=response.assignment;
                        localStorage.removeItem('template');
                        localStorage.setItem('template',JSON.stringify(this.template));
                        this.bgCurrent.backgroundColor=response.assignment.style_menu.backgroundColor;
                        },
                        error=>{
                            console.log(<any>error);
                        }
                );
                this._router.navigate(['/inicio']);
                }, //Fin de response UpdateTemplate
                error => {
                    console.log(<any>error);
                }
        );

	}
      

   
      
  
}

