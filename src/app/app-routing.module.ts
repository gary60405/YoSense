import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthoringComponent } from './authoring/authoring.component';
import { BlocklyComponent } from './authoring/edit/blockly/blockly.component';

const routes: Routes = [
  // {path: '', redirectTo: 'manipulation', pathMatch: 'full'},
  {path: '', component: BlocklyComponent},
  // {path: '', component: HomeComponent},
  // {path: 'authoring', loadChildren: 'app/authoring/authoring.module#AuthoringModule'},
  {path: 'manipulation', loadChildren: 'app/manipulation/manipulation.module#ManipulationModule'},
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
