import { Routes } from '@angular/router';
import { Authroutes } from './auth/auth-routing.module';
import { phonebookroutes } from './phonebook/phonebook-routing.module';
import { AuthGuard } from './auth.guard';
import { LoginGuard } from './login.guard';

export const routes: Routes = [
    {path:'', redirectTo:'/auth', pathMatch: 'full'},
    {path:'auth', children:Authroutes, canActivate: [LoginGuard]},
    {path:'phonebook', children: phonebookroutes, canActivate: [AuthGuard]}
];
