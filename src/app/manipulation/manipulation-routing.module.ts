import { GameComponent } from './game/game.component';
import { ManipulationComponent } from './manipulation.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChooseComponent } from './choose/choose.component';

const routes: Routes = [
  {path: '', component: ManipulationComponent, children: [
    {path: '', redirectTo: 'choose', pathMatch: 'full'},
    {path: 'choose', component: ChooseComponent},
    {path: 'game', component: GameComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManipulationRoutingModule { }
