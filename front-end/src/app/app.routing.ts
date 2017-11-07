import { ModuleWithProviders } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';

//componentes
import { InicioComponent } from './components/inicio/inicio.component';
import { IndexComponent } from './components/index/index.component';
import { Dudas_ComentariosComponent } from './components/dudas_comentarios/dudas_comentarios.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { PruebaComponent} from './components/prueba/prueba.component';
import { AddMaterialComponent} from './components/addmaterial/addmaterial.component';
import { UpdateTempComponent } from './components/updateTemp/updateTemp.component';


const appRoutes: Routes = [
	{path:'',component:IndexComponent},
	{path:'inicio', component: InicioComponent},
	{path: 'index', component:IndexComponent},
	{path: 'dudas_comentarios', component:Dudas_ComentariosComponent},
	{path: 'contacto', component:ContactoComponent},
	{path: 'registro', component:RegisterComponent},
	{path: 'login', component:LoginComponent},
	{path: 'prueba', component:PruebaComponent},
	{path: 'addmaterial', component:AddMaterialComponent},
	{path: 'updateTemp', component:UpdateTempComponent}

];

export const appRoutingProviders:any[]=[];
export const routing:ModuleWithProviders=RouterModule.forRoot(appRoutes);