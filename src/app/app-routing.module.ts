import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthoringComponent } from './authoring/authoring.component';

const routes: Routes = [
  {path: '', redirectTo: 'authoring', pathMatch: 'full'},
  // {path: '', component: HomeComponent},
  {path: 'authoring', loadChildren: 'app/authoring/authoring.module#AuthoringModule'},
  {path: 'manipulation', loadChildren: 'app/manipulation/manipulation.module#ManipulationModule'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
