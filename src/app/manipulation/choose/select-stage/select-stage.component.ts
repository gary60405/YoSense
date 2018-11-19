import { StagesState } from './../../../model/authoring/management.model';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppState } from '../../../model/app/app.model';
import { Store, select } from '@ngrx/store';
import * as AppActions from './../../../store/app.actions';
import { stageDataStateSelector, projectLoadedStateSelector, projectUidStateSelector } from './../../../store/app.selectors';
import { take } from 'rxjs/operators';

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
        .pipe(select(stageDataStateSelector), take(1))
        .subscribe((stagesData: StagesState[]) => {
          const data = {index: index, stages: stagesData[index]};
          this.store.dispatch(new AppActions.SetStageSideInfo(data));
        });
  }

}
