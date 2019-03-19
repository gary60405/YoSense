import { SelectStageComponent } from './choose/select-stage/select-stage.component';
import { DashboardComponent } from './choose/dashboard/dashboard.component';
import { GameComponent } from './game/game.component';
import { ManipulationComponent } from './manipulation.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChooseComponent } from './choose/choose.component';
import { PorfolioComponent } from './choose/porfolio/porfolio.component';

const routes: Routes = [
  {path: '', component: ManipulationComponent, children: [
    {path: '', redirectTo: 'choose', pathMatch: 'full'},
    {path: 'choose', component: ChooseComponent, children: [
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      {path: 'dashboard', component: DashboardComponent},
      {path: 'select-stage', component: SelectStageComponent},
      {path: 'porfolio', component: PorfolioComponent}
    ]},
    {path: 'game', component: GameComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManipulationRoutingModule { }
