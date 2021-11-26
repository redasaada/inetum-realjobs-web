import { RouterModule, Routes } from "@angular/router";
import { AddUserComponent as LoginComponent } from "./components/login/login.component";
import { UserDetailsComponent } from "./components/user-details/user-details.component";
import { AuthGuardService } from "./guard/authGuard.service";

const appRoutes: Routes = [
    { path: 'users/:username', component: UserDetailsComponent, canActivate: [AuthGuardService]},
    { path: 'login', component: LoginComponent}
];

export const routing = RouterModule.forRoot(appRoutes);