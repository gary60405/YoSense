import { Component, OnInit } from '@angular/core';
import { ChooseService } from '../choose.service';
import { GameService } from '../../game/game.service';

@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.css']
})
export class SidePanelComponent implements OnInit {

  constructor(public chooseService: ChooseService, public gameService: GameService) { }

  ngOnInit() {
  }


}
