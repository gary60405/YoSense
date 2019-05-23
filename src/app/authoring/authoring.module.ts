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
import { SafePipe } from './../core/safe.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditProjectComponent } from './management/edit-project/edit-project.component';
import { ManageProjectComponent } from './management/manage-project/manage-project.component';
import { SideInfoComponent } from './management/side-info/side-info.component';
import { HierarchyComponent } from './edit/hierarchy/hierarchy.component';
import { PreviewModeComponent } from './edit/blockly/preview-mode/preview-mode.component';
import { CustomModeComponent } from './edit/blockly/custom-mode/custom-mode.component';
import { PrimitiveModeComponent } from './edit/blockly/primitive-mode/primitive-mode.component';

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
    SafePipe,
    EditProjectComponent,
    ManageProjectComponent,
    SideInfoComponent,
    HierarchyComponent,
    PreviewModeComponent,
    CustomModeComponent,
    PrimitiveModeComponent
  ]
})
export class AuthoringModule { }
