import { Injectable } from '@angular/core';
import { Http, Response, Headers,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {GLOBAL} from './global';
@Injectable()
export class TopicService{
	public url:string;

	constructor(private _http:Http){
		this.url=GLOBAL.url;
	}
	
	getInfoTopics(assignment){
		return this._http.get(this.url+'getInfoTopics/'+assignment).map(res=>res.json());
	}
}

