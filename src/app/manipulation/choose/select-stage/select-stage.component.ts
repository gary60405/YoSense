import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChooseService } from '../choose.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-select-stage',
  templateUrl: './select-stage.component.html',
  styleUrls: ['./select-stage.component.css']
})
export class SelectStageComponent implements OnInit, OnDestroy {
  stageData = [];
  isLoadedProject = false;
  constructor(private chooseService: ChooseService) { }
  editProjectIndex = this.chooseService.editProjectIndex;
  stageDataSubscription = new Subscription();
  ngOnInit() {
    this.chooseService.editMode = true;
    this.chooseService.stageDataSubject
      .subscribe(stage => {
        this.stageData = stage;
        this.isLoadedProject = true;
      });
    this.chooseService.getSatageData();
  }
  onShowSideInfo(index) {
    this.chooseService.sideInfo = this.stageData[index];
    this.chooseService.editStageIndex = index;
  }

  ngOnDestroy() {
    this.stageDataSubscription.unsubscribe();
  }

}
