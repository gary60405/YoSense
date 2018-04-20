import { Component, OnInit } from '@angular/core';
import { ChooseService } from '../choose.service';

@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.css']
})
export class SidePanelComponent implements OnInit {

  constructor(public chooseService: ChooseService) { }

  ngOnInit() {
  }
  onEditProject(index) {

  }

}
