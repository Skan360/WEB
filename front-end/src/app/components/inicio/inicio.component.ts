import { Assignment } from './../../models/assignment';
import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import {GLOBAL} from '../../services/global';
import {UserService} from '../../services/user.service';
import {TemplateService} from '../../services/template.service';
import { Template } from '../../models/template';
import {AssignmentService} from '../../services/assignment.service';


@Component({
  selector: 'inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  providers: [UserService,TemplateService,AssignmentService]
})

export class InicioComponent implements OnInit {
  title: string;
  public identity;
  public assignment;
  public template;

  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _userService: UserService,
    private _templateService:TemplateService,
    private _assignmentService:AssignmentService
  ) {
    this.title = "Inicio"
  }

  ngOnInit() {
    this.identity = this._userService.getIdentity();
    this.assignment=this._assignmentService.getAssignment();
    this.template=this._assignmentService.getTemplate();
  }

}
