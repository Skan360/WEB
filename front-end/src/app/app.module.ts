import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {routing,appRoutingProviders} from './app.routing';

//componentes
import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { IndexComponent } from './components/index/index.component';
import { Dudas_ComentariosComponent } from './components/dudas_comentarios/dudas_comentarios.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { PruebaComponent} from './components/prueba/prueba.component';
import { AddMaterialComponent} from './components/addmaterial/addmaterial.component';
import { UpdateTempComponent } from './components/updateTemp/updateTemp.component';


//Servicios
import {UserService} from './services/user.service';
import {TemplateService} from './services/template.service';
import {AssignmentService} from './services/assignment.service';
import {TopicService} from './services/topic.service';
import {SubtopicService} from './services/subtopic.service';
import {MaterialService} from './services/material.service';



@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    IndexComponent,
    Dudas_ComentariosComponent,
    ContactoComponent,
    RegisterComponent,
    LoginComponent,
    PruebaComponent,
    AddMaterialComponent,
    UpdateTempComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
