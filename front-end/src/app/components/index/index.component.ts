import { Component,OnInit,Input} from '@angular/core';
import {TemplateService} from '../../services/template.service';
import {AssignmentService} from '../../services/assignment.service';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { Template } from'../../models/template';
import { Assignment } from'../../models/assignment';


@Component({
  selector: 'index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  providers: [AssignmentService,TemplateService]
})
export class IndexComponent {
 
  public title:String;
  public assignment;
  public template;
  public assignments:Assignment[];
  //public arr;

  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _assignmentService:AssignmentService,
    private _templateService:TemplateService
  ){
    this.title='Asignaturas';
  }
  ngOnInit(){
    //Para que cada vez que se abra una nueva pestaña te envie directamente al index(asignaturas)
     localStorage.removeItem('template');
      localStorage.removeItem('assignment');
      localStorage.removeItem('identity');
      localStorage.removeItem('token');
      //obtener el listado de asignaturas actuales y guardar en un arreglo
      this._assignmentService.getInfoAssignments().subscribe(
        response=>{
            this.assignments=response.assignments;
          },
          error=>{
            console.log(<any>error);
          }
      );
      //console.log(this._assignmentService.getTemplate());
     // console.log(this._assignmentService.getAssignment());
    }

  onSubmit(id: any){
    //this.assignment= (<HTMLInputElement>document.getElementById('materia')).value;
    this.assignment=id;
    console.log(this.assignment);
    this._templateService.getInfoTemplate(this.assignment).subscribe(
       response=>{
            this.template=response.assignment;
           // console.log(this.template);
            localStorage.removeItem('template');
            localStorage.removeItem('assignment');
            //localstorage para la materia y el template
            localStorage.setItem('template',JSON.stringify(this.template));
            localStorage.setItem('assignment',this.assignment);
          },
          error=>{
            console.log(<any>error);
          }
      );
    this._router.navigate(['/inicio']);
    }

}
