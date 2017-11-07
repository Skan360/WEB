import { Injectable } from '@angular/core';
import { Http, Response, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {GLOBAL} from './global';

@Injectable()
export class MaterialService{
	public url:string;

	constructor(private _http:Http){
		this.url=GLOBAL.url;
	}

	AddMaterial(material_to_add){
		let params = JSON.stringify(material_to_add);
		//console.log(params);
		let headers = new Headers({'Content-Type':'application/json'});
		return this._http.post(this.url+'saveMaterial',params,{headers:headers})
						 .map(res=>res.json());
	}

}