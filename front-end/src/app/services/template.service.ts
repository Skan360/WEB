import { Injectable } from '@angular/core';
import { Http, Response, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {GLOBAL} from './global';
@Injectable()
export class TemplateService{
	public url:string;

	constructor(private _http:Http){
		this.url=GLOBAL.url;
	}
	
	getInfoTemplate(assignment_id){
		return this._http.get(this.url+'getInfoTemplate/'+assignment_id).map(res=>res.json());
	}

	
	updateTemplate(template_id,newTemp,token) {
		console.log('Entrando a template.service update');
		let headers = new Headers({'Content-Type':'application/json', 'Authorization': token});
		//let params = JSON.stringify(newTemp);
		let par =  {
			'style_menu' : {
				'backgroundColor' : '',
				'color': '',
				'fontFamily': ''
			}
		}
		par.style_menu = newTemp;
		let params = JSON.stringify(par);
		console.log( 'Parametros a enviar: ' +params);
		return this._http.put(this.url + 'update_template/' + template_id,params,{headers:headers}).map(res => res.json());
	}
}

