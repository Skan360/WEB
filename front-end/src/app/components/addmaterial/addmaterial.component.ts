import { Component,OnInit,Input} from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { Assignment } from'../../models/assignment';
import {AssignmentService} from '../../services/assignment.service';
import { User } from'../../models/user';
import {UserService} from '../../services/user.service';
import {TopicService} from '../../services/topic.service';
import { Topic } from'../../models/topic';
import {SubtopicService} from '../../services/subtopic.service';
import { Subtopic } from'../../models/subtopic';
import {MaterialService} from '../../services/material.service';
import { Material } from'../../models/material';

@Component({
  selector: 'addmaterial',
  templateUrl: './addmaterial.component.html',
  providers: [AssignmentService,UserService,TopicService,SubtopicService,MaterialService]
})
export class AddMaterialComponent implements OnInit{
 
  public title:String;
  public material:Material;
  public assignment;
  public topics:Topic[];
  public subtopics:Subtopic[];
  public message;
  //public arr;

  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _assignmentService:AssignmentService,
    private _userService:UserService,
    private _topicService:TopicService,
    private _subtopicService:SubtopicService,
    private _materialService:MaterialService

  ){
    this.title='Asignaturas';
    this.material= new Material('','','','','','','');
  }
  ngOnInit(){
       var l = [];
      this.assignment=this._assignmentService.getAssignment();
      console.log(this.assignment);
      this._topicService.getInfoTopics(this.assignment).subscribe(
        response=>{
            this.topics=response.topics;
            console.log(this.topics);
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
    }
  onSubmit(materialForm){
    this.message='error';
    //console.log(this.material);
    
    this._materialService.AddMaterial(this.material).subscribe(
      response=>{
        if(response.material && response.material._id){
          this.material = response.material;
          this.message ='success';
          this.material= new Material('','','','','','','');
          materialForm.reset();
        }
        
      },
      error=>{
        console.log(<any>error);
      }
    );

  }
  

}
