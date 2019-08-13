import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {NavbarComponent} from './navbar/navbar.component';
import {MenuModule} from 'primeng/menu';
import {ButtonModule} from 'primeng/button';
import {RouterModule, Routes} from '@angular/router';
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {PasswordModule} from 'primeng/password';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {PanelModule} from 'primeng/panel';
import {KeyFilterModule} from 'primeng/keyfilter';
import {ToastModule} from 'primeng/toast';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {DropdownModule} from 'primeng/dropdown';
import {CalendarModule} from 'primeng/calendar';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {CardModule} from 'primeng/card';
import {RegisterServicesComponent} from './services/register-services/register-services.component';
import {DeleteServicesComponent} from './services/delete-services/delete-services.component';
import {GetServicesComponent} from './services/get-services/get-services.component';
import {GetUsersComponent} from './users/get-users/get-users.component';
import {RequestsOfReservationsComponent} from './reservation/requests-of-reservations/requests-of-reservations.component';
import {GetReservationsComponent} from './reservation/get-reservations/get-reservations.component';
import {UpdloadUserComponent} from './users/updload-user/updload-user.component';
import {UploadServicesComponent} from './services/upload-services/upload-services.component';
import {MegaMenuModule, ProgressBarModule} from "primeng/primeng";
import {AutenticateService} from "./servicesrequests/autenticate.service";
import {ReservationsService} from "./servicesrequests/reservations.service";
import {ServicesService} from "./servicesrequests/services.service";
import {GetSubServicesComponent} from './services/get-sub-services/get-sub-services.component';
import {RegisterSubServicesComponent} from './services/register-sub-services/register-sub-services.component';
import {UpdateSubServicesComponent} from './services/update-sub-services/update-sub-services.component';

const appRoutes: Routes = [
  {path: 'services/registerServices', component: RegisterServicesComponent},
  {path: 'login', component: LoginComponent},
  {path: 'user/register', component: RegisterComponent},
  {path: 'user/getUser', component: GetUsersComponent},
  {path: 'user/upload', component: UpdloadUserComponent},
  {path: 'services/getServices', component: GetServicesComponent},
  {path: 'services/getSubServices', component: GetSubServicesComponent},
  {path: 'services/registerSubServices', component: RegisterSubServicesComponent},
  {path: 'services/requesteOfReservations', component: RequestsOfReservationsComponent},
  {path: 'services/getReservations', component: GetReservationsComponent},
  {path: 'services/uploadServices', component: UploadServicesComponent},


];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    RegisterServicesComponent,
    DeleteServicesComponent,
    GetServicesComponent,
    GetUsersComponent,
    RequestsOfReservationsComponent,
    GetReservationsComponent,
    UpdloadUserComponent,
    UploadServicesComponent,
    GetSubServicesComponent,
    RegisterSubServicesComponent,
    UpdateSubServicesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ButtonModule,
    MenuModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    PasswordModule,
    MessagesModule,
    MessageModule,
    PanelModule,
    KeyFilterModule,
    ToastModule,
    NoopAnimationsModule,
    DropdownModule,
    CalendarModule,
    ProgressSpinnerModule,
    CardModule,
    ProgressSpinnerModule,
    PanelModule,
    KeyFilterModule,
    PasswordModule,
    RouterModule.forRoot(
      appRoutes, {enableTracing: true}
    ),
    MegaMenuModule,
    ProgressBarModule


  ],
  providers: [AutenticateService, ReservationsService, ServicesService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
