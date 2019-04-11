import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManipulationRoutingModule } from './manipulation-routing.module';
import { ManipulationComponent } from './manipulation.component';
import { GameComponent } from './game/game.component';
import { ChooseComponent } from './choose/choose.component';
import { InputComponent } from './game/input/input.component';
import { PlaygroundComponent } from './game/playground/playground.component';
import { WizardComponent } from './game/wizard/wizard.component';
import { DashboardComponent } from './choose/dashboard/dashboard.component';
import { SelectStageComponent } from './choose/select-stage/select-stage.component';
import { PorfolioComponent } from './choose/porfolio/porfolio.component';

import { SidePanelComponent } from './choose/side-panel/side-panel.component';
import { FrameworkModule } from '../core/framework/framework.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SafePipe } from '../core/safe2.pipe';

@NgModule({
  imports: [
    CommonModule,
    ManipulationRoutingModule,
    FrameworkModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    ManipulationComponent,
    GameComponent,
    ChooseComponent,
    InputComponent,
    PlaygroundComponent,
    WizardComponent,
    DashboardComponent,
    SelectStageComponent,
    PorfolioComponent,
    SidePanelComponent,
    SafePipe
  ],
  entryComponents: [
    WizardComponent,
  ],
  providers: [
  ]
})
export class ManipulationModule { }
