import { StagesState } from './../../../model/authoring/management.model';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppState } from '../../../model/app/app.model';
import { Store, select } from '@ngrx/store';
import * as AppActions from './../../../store/app.actions';
import { stageDataStateSelector, projectLoadedStateSelector, projectUidStateSelector } from './../../../store/app.selectors';
import { take } from 'rxjs/operators';
import { stageDataSideInfoStateSelector } from '../../../store/app.selectors';
import { StagesSideInfoState } from '../../../model/authoring/management.model';

@Component({
  selector: 'app-select-stage',
  templateUrl: './select-stage.component.html',
  styleUrls: ['./select-stage.component.css']
})
export class SelectStageComponent implements OnInit {
  stageData$: Observable<StagesState[]>;
  isLoadedProject$: Observable<boolean>;
  constructor(private store: Store<AppState>) {
    this.stageData$ = store.select(stageDataStateSelector);
    this.isLoadedProject$ = store.select(projectLoadedStateSelector);
  }
  ngOnInit() {
    this.store
        .pipe(select(projectUidStateSelector), take(1))
        .subscribe((uid: string) => uid !== null ? this.store.dispatch(new AppActions.TryLoadStagesData(uid)) : '');
  }
  onShowSideInfo(index) {
    this.store
        .pipe(select(stageDataSideInfoStateSelector(index)), take(1))
        .subscribe((stagesData: StagesSideInfoState) => {
          this.store.dispatch(new AppActions.SetStageSideInfo(stagesData ));
        });
  }

}
