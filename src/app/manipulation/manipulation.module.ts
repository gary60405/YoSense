import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManipulationRoutingModule } from './manipulation-routing.module';
import { ManipulationComponent } from './manipulation.component';
import { GameComponent } from './game/game.component';
import { ChooseComponent } from './choose/choose.component';
import { InputComponent } from './game/input/input.component';
import { PlaygroundComponent } from './game/playground/playground.component';
import { WizardComponent } from './game/wizard/wizard.component';

@NgModule({
  imports: [
    CommonModule,
    ManipulationRoutingModule
  ],
  declarations: [ManipulationComponent, GameComponent, ChooseComponent, InputComponent, PlaygroundComponent, WizardComponent]
})
export class ManipulationModule { }
