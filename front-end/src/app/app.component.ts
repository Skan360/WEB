import { Component,DoCheck, OnInit } from '@angular/core';
import {UserService} from './services/user.service';
import {TemplateService} from './services/template.service';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { Template } from'./models/template';
import {AssignmentService} from './services/assignment.service';
import { Assignment } from'./models/assignment';
//adicional

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[UserService,TemplateService,AssignmentService]
})
export class AppComponent implements OnInit {
  public title;
  public identity;
  public template;
  public assignment;
  
  constructor(
  	private _userService:UserService,
    private _route:ActivatedRoute,
    private _router:Router,
    private _templateService:TemplateService,
    private _assignmentService:AssignmentService
  ){
  	this.title= "app"
  }
  ngOnInit(){
  	this.identity=this._userService.getIdentity();
    this.assignment=this._assignmentService.getAssignment();
    this.template=this._assignmentService.getTemplate();
    //console.log(this.assignment);
  }
  ngDoCheck(){
    this.identity= this._userService.getIdentity();
    this.assignment=this._assignmentService.getAssignment();
    this.template=this._assignmentService.getTemplate();
  }

  logout(){
    //localStorage.clear();
   localStorage.removeItem('identity');
   localStorage.removeItem('token');
    this.identity=null;
    this._router.navigate(['/inicio']);
  }

}
