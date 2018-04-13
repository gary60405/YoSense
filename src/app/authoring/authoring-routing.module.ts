import { ManageProjectComponent } from './management/manage-project/manage-project.component';
import { BindComponent } from './edit/bind/bind.component';
import { PassComponent } from './edit/pass/pass.component';
import { EditComponent } from './edit/edit.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthoringComponent } from './authoring.component';
import { ManagementComponent } from './management/management.component';
import { DiveComponent } from './edit/dive/dive.component';
import { BlocklyComponent } from './edit/blockly/blockly.component';
import { DiagnosisComponent } from './edit/diagnosis/diagnosis.component';
import { EditProjectComponent } from './management/edit-project/edit-project.component';

const routes: Routes = [
  {path: '', component: AuthoringComponent, children: [
    {path: '', redirectTo: 'management', pathMatch: 'full'},
    {path: 'management', component: ManagementComponent, children: [
      {path: '', redirectTo: 'manageProject', pathMatch: 'full'},
      {path: 'manageProject', component: ManageProjectComponent},
      {path: 'editProject', component: EditProjectComponent}
    ]},
    {path: 'edit', component: EditComponent, children: [
      {path: '', redirectTo: 'bind', pathMatch: 'full'},
      {path: 'dive', component: DiveComponent},
      {path: 'blockly', component: BlocklyComponent},
      {path: 'bind', component: BindComponent},
      {path: 'diagnosis', component: DiagnosisComponent},
      {path: 'pass', component: PassComponent}
    ]}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthoringRoutingModule { }
