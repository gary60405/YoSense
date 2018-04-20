import { Component, OnInit } from '@angular/core';
import { ChooseService } from '../choose.service';

@Component({
  selector: 'app-select-stage',
  templateUrl: './select-stage.component.html',
  styleUrls: ['./select-stage.component.css']
})
export class SelectStageComponent implements OnInit {
  stageData = [];
  constructor(private chooseService: ChooseService) { }
  editProjectIndex = this.chooseService.editProjectIndex;
  ngOnInit() {
    this.chooseService.editMode = true;
    this.stageData = this.chooseService.projectDataArray[this.editProjectIndex].stage;
  }
  onShowSideInfo(index) {
    this.chooseService.sideInfo = this.chooseService.getProjectDataArray()[this.editProjectIndex].stage[index];
    this.chooseService.editStageIndex = index;
  }

}
