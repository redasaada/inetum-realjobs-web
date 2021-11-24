import { RouterModule, Routes } from "@angular/router";
import { AddUserComponent } from "./components/add-user/add-user.component";
import { UserDetailsComponent } from "./components/user-details/user-details.component";

const appRoutes: Routes = [
    { path: '', redirectTo: 'users', pathMatch: 'full' },
    { path: 'users/:id', component: UserDetailsComponent},
    { path: 'add', component:AddUserComponent}
];

export const routing = RouterModule.forRoot(appRoutes);