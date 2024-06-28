import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TourListComponent } from './features/tours/components/tour-list/tour-list.component';
import { TourDetailComponent } from './features/tours/components/tour-detail/tour-detail.component';
import { HomeComponent } from './features/tours/components/home/home.component';
import { LoginComponent } from './features/users/components/login/login.component';
import { DashboardComponent } from './features/admin/dashboard/dashboard.component';
import { AdministracionComponent } from './features/admin/administracion/administracion.component';
import { AdminUsuarioComponent } from './features/admin/admin-usuario/admin-usuario.component';
import { AdminToursComponent } from './features/admin/admin-tours/admin-tours.component';
import { AdminActividadComponent } from './features/admin/admin-actividad/admin-actividad.component';
import { AdminDepartamentoComponent } from './features/admin/admin-departamento/admin-departamento.component';
import { AdminLugarComponent } from './features/admin/admin-lugar/admin-lugar.component';
import { AdminTipoTourComponent } from './features/admin/admin-tipo-tour/admin-tipo-tour.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'tours', component: TourListComponent }, 
  { path: 'toursd', component: TourDetailComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },  
  { path: 'administracion', 
    component: AdministracionComponent, 
    children: [
      { path: '', component: DashboardComponent },
      { path: 'usuario', component: AdminUsuarioComponent },
      { path: 'tours', component: AdminToursComponent },
      { path: 'actividades', component: AdminActividadComponent },
      { path: 'departamento', component: AdminDepartamentoComponent },
      { path: 'lugar', component: AdminLugarComponent },  
      { path: 'tipo_tour', component: AdminTipoTourComponent },  
      
    ]
  },
  {path:'toursdetalle/:n_id_tours',component:TourDetailComponent},
  { path: '**', redirectTo: '/tours' }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
