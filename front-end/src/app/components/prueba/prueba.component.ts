import { Component,OnInit,Input} from '@angular/core';
import {TopicService} from '../../services/topic.service';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { Topic } from'../../models/topic';
import {SubtopicService} from '../../services/subtopic.service';
import { Subtopic } from'../../models/subtopic';
import {AssignmentService} from '../../services/assignment.service';
import { Assignment } from'../../models/assignment';

@Component({
  selector: 'prueba',
  templateUrl: './prueba.component.html',
  providers: [TopicService,SubtopicService,AssignmentService]
})
export class PruebaComponent {
 
  public title:String;
  public topics:Topic[];
  public subtopics:Subtopic[];
  public assignment;
  //public arr;

  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _topicService:TopicService,
    private _subtopicService:SubtopicService,
    private _assignmentService:AssignmentService

  ){
    this.title='subtemas';
  }
  ngOnInit(){
    //Para que cada vez que se abra una nueva pestaña te envie directamente al index(asignaturas)
      //obtener el listado de asignaturas actuales y guardar en un arreglo
      var l = [];
      this.assignment=this._assignmentService.getAssignment();
      this._topicService.getInfoTopics(this.assignment).subscribe(
        response=>{
            this.topics=response.topics;
            //console.log(this.topics);
            for (let t in this.topics) {
                //console.log(this.topics[t]._id);
                this._subtopicService.getInfoSubtopics(this.topics[t]._id).subscribe(
                 response=>{
                      l=l.concat(response.subtopics);
                      //console.log(l);
                      this.subtopics=l;
                      //console.log(this.subtopics);
                   },
                    error=>{
                     console.log(<any>error);
                   }
                );
            }

          },
          error=>{
            console.log(<any>error);
          }
      );
      /*this._subtopicService.getInfoSubtopics().subscribe(
              response=>{
                  this.subtopics=response.subtopics;
                },
                error=>{
                 console.log(<any>error);
                }
            );*/
      //console.log(this._assignmentService.getTemplate());
     // console.log(this._assignmentService.getAssignment());
    }

  /*onSubmit(id: any){
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
*/
}
