import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreatecontactComponent } from './createcontact/createcontact.component';

export const phonebookroutes: Routes = [
  {path: '', redirectTo:'/home', pathMatch:'full'},
  {path: 'home', component: HomeComponent}, 
  {path: 'createcontact', component: CreatecontactComponent}
];

@NgModule({
  imports: [RouterModule.forChild(phonebookroutes)],
  exports: [RouterModule]
})
export class PhonebookRoutingModule { }
