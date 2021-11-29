import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppComponent } from './app.component';
import { FilterFormComponent } from './components/filter-form/filter-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routing } from './app.routing';
import { LoginComponent } from './components/login/login.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { UniversalAppInterceptor } from 'src/app/interceptor/universalAppInterceptor';
import { AuthGuardService } from './guard/authGuard.service';
import{AccordionModule} from 'primeng/accordion';
import {TableModule} from 'primeng/table';
import {KeyFilterModule} from 'primeng/keyfilter';
import {DropdownModule} from 'primeng/dropdown';
import {ButtonModule} from 'primeng/button';



@NgModule({
  declarations: [
    AppComponent,
    FilterFormComponent,
    LoginComponent,
    UserDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AccordionModule,
    TableModule,
    KeyFilterModule,
    DropdownModule,
    ButtonModule,
    routing
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: UniversalAppInterceptor, multi: true },
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
