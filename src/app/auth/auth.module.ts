import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { DataserviceService } from './dataservice.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthRoutingModule,
  ],
  providers: [
    DataserviceService
  ]

})
export class AuthModule { }
