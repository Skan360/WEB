import { Injectable } from '@angular/core';
import { Http, Response, Headers,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {GLOBAL} from './global';
@Injectable()
export class SubtopicService{
	public url:string;

	constructor(private _http:Http){
		this.url=GLOBAL.url;
	}
	
	getInfoSubtopics(topic){
		return this._http.get(this.url+'getInfoSubtopics/'+topic).map(res=>res.json());
	}
}

