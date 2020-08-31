import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  // {path: '', redirectTo: 'authoring', pathMatch: 'full'},
  {path: '', component: HomeComponent},
  // Lazy loading
  {path: 'authoring', loadChildren: () => import('./authoring/authoring.module').then(m => m.AuthoringModule)},
  {path: 'manipulation', loadChildren: () => import('./manipulation/manipulation.module').then(m => m.ManipulationModule)},
  {path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
