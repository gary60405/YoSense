import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  // {path: '', redirectTo: 'authoring', pathMatch: 'full'},
  {path: '', component: HomeComponent},
  {path: 'authoring', loadChildren: 'app/authoring/authoring.module#AuthoringModule'},
  {path: 'manipulation', loadChildren: 'app/manipulation/manipulation.module#ManipulationModule'},
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
