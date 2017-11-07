import { Injectable } from '@angular/core';
import { Http, Response, Headers,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {GLOBAL} from './global';
@Injectable()
export class AssignmentService{
	public url:string;
	public template;
	public assignment;

	constructor(private _http:Http){
		this.url=GLOBAL.url;
	}
	
	getInfoAssignments(){
		return this._http.get(this.url+'getInfoAssignments').map(res=>res.json());
	}
	getTemplate(){
			let template=JSON.parse(localStorage.getItem('template'));
			if(template!="undefined"){
				this.template = template;
			}else{
				this.template = null;
			}
			return this.template;
		}

	getAssignment(){
		let assignment=localStorage.getItem('assignment');
		if(assignment!="undefined"){
			this.assignment = assignment;
		}else{
			this.assignment = null;
		}
		return this.assignment;
	}
}

