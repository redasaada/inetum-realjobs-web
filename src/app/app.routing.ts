import { RouterModule, Routes } from "@angular/router";
import { LoginComponent as LoginComponent } from "./components/login/login.component";
import { UserDetailsComponent } from "./components/user-details/user-details.component";
import { FilterFormComponent } from "./components/filter-form/filter-form.component";
import { AuthGuardService } from "./guard/authGuard.service";
import { RegisterComponent } from "./components/register/register.component";

const appRoutes: Routes = [
    { path: 'users/:username', component: UserDetailsComponent, canActivate: [AuthGuardService]},
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'vacancy/search', component: FilterFormComponent}
];

export const routing = RouterModule.forRoot(appRoutes);