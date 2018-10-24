import { ShareService } from './../share/share.service';
import { AppRoutingModule } from './../app-routing.module';
import { FrameworkModule } from './framework/framework.module';
import { HomeComponent } from './../home/home.component';
import { HeaderComponent } from './../header/header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth/auth.service';

@NgModule({
  imports: [
    CommonModule,
    FrameworkModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    AppRoutingModule,
    HeaderComponent,
    HomeComponent,

  ],
  declarations: [
    HeaderComponent,
    HomeComponent,
  ],
  providers: [
    AuthService,
    ShareService
  ]
})
export class CoreModule { }
