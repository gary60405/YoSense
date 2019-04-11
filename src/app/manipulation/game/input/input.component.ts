import { HierarchyDataState } from './../../../model/authoring/authoring.model';
import { take, map } from 'rxjs/operators';
import { forkJoin, Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { MatDialog } from '@angular/material';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';

import * as AppActions from './../../../store/app.actions';
import * as ManipulationActions from './../../store/manipulation.actions';
import { AppState } from '../../../model/app/app.model';
import { editStageIndexSelector } from '../../../store/app.selectors';
import { selectedStageSelector, stageLengthSelector, passConditionSelector, diagnosisSelector, diveStateSelector } from '../../store/manipulation.selectors';
import { StagesState, PassConditionState, ConditionDataState } from '../../../model/authoring/management.model';
import { BlocklyService } from '../../../authoring/edit/blockly/blockly.service';
import { hierarchyDataSelector } from '../../../authoring/edit/store/authoringStage.selectors';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit, OnDestroy {
  @ViewChild('passDialog') passDialog;
  @ViewChild('failDialog') failDialog;
  constructor(private dialog: MatDialog,
              private store: Store<AppState>,
              private blocklyService: BlocklyService) { }
  intervalID = [];
  isEnd$: Observable<boolean>;
  ngOnInit() {
    this.store
        .pipe(select(selectedStageSelector), take(1))
        .subscribe((stage: StagesState) => this.store.dispatch(new ManipulationActions.TryInitialWorkspace(stage)));
    this.checkEndedState();
  }
  restart() {
    eval('resetBlocklyWorkSpace()');
    this.store
        .pipe(select(selectedStageSelector), take(1))
        .subscribe((stage: StagesState) => this.store.dispatch(new ManipulationActions.TryInitialWorkspace(stage)));
  }
  nextStage() {
    const stageLength$ = this.store.pipe(select(stageLengthSelector));
    const editIndex$ = this.store.pipe(select(editStageIndexSelector));
    forkJoin(stageLength$, editIndex$)
      .pipe(take(1), map(([stageLength, editIndex]) => {
        return {stageLength: stageLength, editIndex: editIndex};
      }))
      .subscribe((data: {stageLength: number, editIndex: number}) => {
        if (data.stageLength !== data.editIndex + 1) {
          this.store.dispatch(new AppActions.SetEditStageIndex(data.editIndex + 1));
        }
      });
      this.restart();
  }
  checkEndedState() {
    const stageLength$ = this.store.pipe(select(stageLengthSelector));
    const editStageIndex$ = this.store.pipe(select(editStageIndexSelector));
    this.isEnd$ = forkJoin(stageLength$, editStageIndex$).pipe(map(([stageLength, editStageIndex]) => stageLength - 1 !== editStageIndex));
  }
  backToMenu() {
    this.store.dispatch(new AppActions.SetEditStageIndex(-1));
  }
  diagnosisMonitor() {
    this.store
        .pipe(select(diagnosisSelector), take(1))
        .subscribe((diagnosis: ConditionDataState[]) => {
          const diveAttribute = new Set();
          const diveValue = {};
          diagnosis
            .map(item => {
              return {conditions: item['conditions'], content: item['content']};
            })
            .map(items => {
              items['conditions'].forEach(item => diveAttribute.add(item['condition']['diveAttribute']));
              return items;
            })
            .forEach(items => {
              this.intervalID.push(
                setInterval(() => {
                  diveAttribute.forEach(attr => diveValue[`'${attr}'`] = eval(`diveLinker.Get(${attr})`));
                  let isTrigger = true;
                  items['conditions'].forEach(item => {
                    item.condition['operator'] = item.condition['operator'] === '=' ? '==' : '==';
                    // console.log(`${diveValue[item['condition']['diveAttribute']]}${item.condition['operator']}${Number(item.condition['value'])}`);
                    const compareValue = eval(`${diveValue[item['condition']['diveAttribute']]}${item.condition['operator']}${Number(item.condition['value'])}`);
                    isTrigger = eval(`${isTrigger} && ${compareValue}`);
                  });
                  if (isTrigger) {
                    this.store.dispatch(new ManipulationActions.SetSnackbarContent(items['content']));
                    this.intervalID.forEach(id => clearInterval(id));
                  }
                }, 100)
              );
            });
        });
  }
  passMonitor() {
    this.checkEndedState();
    this.clearIntervalArray();
    const data = {diveAttribute: [], operator: [], value: [], logical: []};
    this.store
        .pipe(select(passConditionSelector), take(1))
        .subscribe((passCondition: PassConditionState[]) => {
          passCondition.forEach(item => {
            data['diveAttribute'].push(item['condition']['diveAttribute']);
            data['operator'].push(item['condition']['operator'].replace(/^=$/, '=='));
            data['value'].push (item['condition']['value']);
            data['logical'].push(item['logical']);
          });
          const condition = [];
          for ( const index in data['diveAttribute']) {
            if (data['diveAttribute'].hasOwnProperty(index)) {
              const temp = eval(`diveLinker.Get(${data['diveAttribute'][index]})`);
              condition.push(temp === Number(data['value'][index]));
            }
          }
          let isPass = true;
          for (const index in condition) {
            if (condition.hasOwnProperty(index)) {
              const element = condition[index];
              isPass = index !== '0' ? eval(`${isPass} ${data['logical'][index]} ${element}`) : isPass = isPass && element;
            }
          }
          condition.forEach(item => isPass = isPass && item);
          isPass ? this.dialog.open(this.passDialog) : this.dialog.open(this.failDialog);
        });
  }

 getCode() {
  //  this.diagnosisMonitor();
   this.store.pipe(select(diveStateSelector), take(1))
       .subscribe((diveState) => {
        //  console.log(`
        //  const a = Blockly.JavaScript.workspaceToCode(workspace);
        //  ${diveState}
        //  console.log(a);
        //  eval(a);
        //  `);
         eval(`
          const a = Blockly.JavaScript.workspaceToCode(workspace);
          ${diveState}
          console.log(a);
          eval(a);
          `);
       });
}

clearIntervalArray() {
  this.intervalID.forEach(id => clearInterval(id));
  this.intervalID = [];
}

ngOnDestroy() {
  this.store.dispatch(new ManipulationActions.SetSnackbarOpenState(false));
  this.clearIntervalArray();
}

}

