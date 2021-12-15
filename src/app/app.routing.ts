import {RouterModule, Routes} from "@angular/router";
import {LoginComponent as LoginComponent} from "./components/login/login.component";
import {UserDetailsComponent} from "./components/user-details/user-details.component";
import {FilterFormComponent} from "./components/filter-form/filter-form.component";
import {AuthGuardService} from "./guard/authGuard.service";
import {NotFoundComponent} from "./components/not-found/not-found.component";
import {RecruiterOverviewComponent} from "./components/recruiter-overview/recruiter-overview.component";

const appRoutes: Routes = [
  {path: "", redirectTo: "/vacancy/search", pathMatch: "full"},
  {path: 'users/:username', component: UserDetailsComponent, canActivate: [AuthGuardService]},
  {path: 'login', component: LoginComponent},
  {path: 'vacancy/search', component: FilterFormComponent},
  {path: 'recruiter/overview', component: RecruiterOverviewComponent},
  {path: "**", component: NotFoundComponent},
];

export const routing = RouterModule.forRoot(appRoutes);
