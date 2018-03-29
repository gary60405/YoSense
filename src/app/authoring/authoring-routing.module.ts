import { PassComponent } from './edit/pass/pass.component';
import { EditComponent } from './edit/edit.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthoringComponent } from './authoring.component';
import { ManagementComponent } from './management/management.component';
import { DiveComponent } from './edit/dive/dive.component';
import { BlocklyComponent } from './edit/blockly/blockly.component';
import { DiagnosisComponent } from './edit/diagnosis/diagnosis.component';

const routes: Routes = [
  {path: '', component: AuthoringComponent, children: [
    {path: '', redirectTo: 'management', pathMatch: 'full'},
    {path: 'management', component: ManagementComponent},
    {path: 'edit', component: EditComponent, children: [
      {path: '', redirectTo: 'dive', pathMatch: 'full'},
      {path: 'dive', component: DiveComponent},
      {path: 'blockly', component: BlocklyComponent},
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
