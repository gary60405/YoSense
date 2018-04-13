import { EditService } from './edit/edit.service';
import { AuthoringComponent } from './authoring.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrameworkModule } from './../core/framework/framework.module';
import { AuthoringRoutingModule } from './authoring-routing.module';
import { ManagementComponent } from './management/management.component';
import { EditComponent } from './edit/edit.component';
import { DiveComponent } from './edit/dive/dive.component';
import { BlocklyComponent } from './edit/blockly/blockly.component';
import { DiagnosisComponent } from './edit/diagnosis/diagnosis.component';
import { PassComponent } from './edit/pass/pass.component';
import { BindComponent } from './edit/bind/bind.component';
import { SafePipe } from './../core/safe.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManagementService } from './management/management.service';
import { EditProjectComponent } from './management/edit-project/edit-project.component';
import { ManageProjectComponent } from './management/manage-project/manage-project.component';
import { SideInfoComponent } from './management/side-info/side-info.component';

@NgModule({
  imports: [
    CommonModule,
    AuthoringRoutingModule,
    FrameworkModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    AuthoringComponent,
    ManagementComponent,
    EditComponent,
    DiveComponent,
    BlocklyComponent,
    DiagnosisComponent,
    PassComponent,
    BindComponent,
    SafePipe,
    EditProjectComponent,
    ManageProjectComponent,
    SideInfoComponent
  ],
  providers: [
    EditService,
    ManagementService
  ]
})
export class AuthoringModule { }
