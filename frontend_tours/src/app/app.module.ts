import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './features/tours/components/home/home.component';
import { TourDetailComponent } from './features/tours/components/tour-detail/tour-detail.component';
import { TourListComponent } from './features/tours/components/tour-list/tour-list.component';
import { LoginComponent } from './features/users/components/login/login.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { NgChartsModule  } from 'ng2-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './features/admin/dashboard/dashboard.component';
import { AdministracionComponent } from './features/admin/administracion/administracion.component';
import { SidenavBarComponent } from './shared/components/sidenav-bar/sidenav-bar.component';
import {MatCardModule} from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AdminUsuarioComponent } from './features/admin/admin-usuario/admin-usuario.component';
import { AdminToursComponent } from './features/admin/admin-tours/admin-tours.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { AdminToursEditarComponent } from './features/admin/admin-tours-editar/admin-tours-editar.component';
import { AdminActividadComponent } from './features/admin/admin-actividad/admin-actividad.component';
import { AdminActividadEditarComponent } from './features/admin/admin-actividad-editar/admin-actividad-editar.component';
import {MatSelectModule} from '@angular/material/select';
import { SnackComponent } from './shared/components/snack/snack.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ConfirmComponent } from './shared/components/confirm/confirm.component';
import { AdminDepartamentoComponent } from './features/admin/admin-departamento/admin-departamento.component';
import { AdminDepartamentoEditarComponent } from './features/admin/admin-departamento-editar/admin-departamento-editar.component';
import { AdminLugarComponent } from './features/admin/admin-lugar/admin-lugar.component';
import { AdminLugarEditarComponent } from './features/admin/admin-lugar-editar/admin-lugar-editar.component';
import { AdminTipoTourComponent } from './features/admin/admin-tipo-tour/admin-tipo-tour.component';
import { AdminTipoTourEditarComponent } from './features/admin/admin-tipo-tour-editar/admin-tipo-tour-editar.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { AdminUsuarioEditarComponent } from './features/admin/admin-usuario-editar/admin-usuario-editar.component';
import  {  RecaptchaModule  }  from  "ng-recaptcha" ; 
import { RecaptchaFormsModule } from 'ng-recaptcha';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TourDetailComponent,
    TourListComponent,
    LoginComponent,
    FooterComponent,
    HeaderComponent,
    DashboardComponent,
    AdministracionComponent,
    SidenavBarComponent,
    AdminUsuarioComponent,
    AdminToursComponent,
    AdminToursEditarComponent,
    AdminActividadComponent,
    AdminActividadEditarComponent,
    SnackComponent,
    ConfirmComponent,
    AdminDepartamentoComponent,
    AdminDepartamentoEditarComponent,
    AdminLugarComponent,
    AdminLugarEditarComponent,
    AdminTipoTourComponent,
    AdminTipoTourEditarComponent,
    AdminUsuarioEditarComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,  
    AppRoutingModule,
    FormsModule,
    NgChartsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    MatSnackBarModule,
    GoogleMapsModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    MatProgressSpinnerModule,
    NgxSpinnerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {provide: APP_BASE_HREF, useValue: '/' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
