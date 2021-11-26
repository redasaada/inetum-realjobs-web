import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppComponent } from './app.component';
import { FilterFormComponent } from './filter-form/filter-form.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { routing } from './app.routing';
import { AddUserComponent } from './components/login/login.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { FormControlComponent } from './form-control/form-control.component';
import { UniversalAppInterceptor } from 'src/universalAppInterceptor';
import { AuthGuardService } from './guard/authGuard.service';

@NgModule({
  declarations: [
    AppComponent,
    FilterFormComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AddUserComponent,
    UserDetailsComponent,
    FormControlComponent,
    routing
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: UniversalAppInterceptor, multi: true },
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
