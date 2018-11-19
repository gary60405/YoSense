import { take, map } from 'rxjs/operators';
import { forkJoin, Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { MatDialog } from '@angular/material';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';

import * as AppActions from './../../../store/app.actions';
import * as ManipulationActions from './../../store/manipulation.actions';
import { AppState } from '../../../model/app/app.model';
import { editStageIndexSelector } from '../../../store/app.selectors';
import { selectedStageSelector, stageLengthSelector, passConditionSelector, diagnosisSelector } from '../../store/manipulation.selectors';
import { StagesState, PassConditionState, ConditionDataState } from '../../../model/authoring/management.model';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit, OnDestroy {
  @ViewChild('passDialog') passDialog;
  @ViewChild('failDialog') failDialog;
  constructor(private dialog: MatDialog,
              private store: Store<AppState>) { }
  intervalID = [];
  isEnd$: Observable<boolean>;
  ngOnInit() {
    this.store
        .pipe(select(selectedStageSelector), take(1))
        .subscribe((stage: StagesState) => this.store.dispatch(new ManipulationActions.BuildBlocklyWorkSpace(stage)));
    this.checkEndedState();
  }
  restart() {
    eval('resetBlocklyWorkSpace()');
    this.store
        .pipe(select(selectedStageSelector), take(1))
        .subscribe((stage: StagesState) => this.store.dispatch(new ManipulationActions.BuildBlocklyWorkSpace(stage)));
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
                  diveAttribute.forEach(attr => diveValue[`${attr}`] = eval(`diveLinker.Get(${attr})`));
                  let isTrigger = true;
                  items['conditions'].forEach(item => {
                    item.condition['operator'] = item.condition['operator'] === '=' ? '==' : '==';
                    console.log(`${diveValue[item['condition']['diveAttribute']]}${item.condition['operator']}${Number(item.condition['value'])}`);
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
   this.diagnosisMonitor();
    const commands = eval('getCode()').split(';').map(item => item + ';').slice(0, -1);
    console.log(commands);
    const solvePromise = (command, time) => new Promise(resolve => setTimeout(() => resolve(eval(command)), time));
    let code = '';
    let commandIndex = 0;
    let timer = 0;
    let tempTimer = 0;
    for (const index in commands) {
      if (commands.hasOwnProperty(index)) {
        const baseTime = 350;
        const i = Number(index);
        if (commands[i].indexOf('number') !== -1 && commands[i].indexOf('diveLinker') === -1) {
          timer = baseTime * Number(commands[i + 1].split(',')[1].split(')')[0]);
        } else if (commands[i].indexOf('angle') !== -1 && commands[i].indexOf('diveLinker') === -1) {
          timer = baseTime;
        }
        if (commands[i].indexOf('diveLinker') !== -1) {
          if (commands.length === 2) {
            code = `solvePromise('${commands[i]}', 100).then(res => res)`;
            code += ';';
            setTimeout(() => this.passMonitor(), timer);
          } else if (commandIndex === 0) {
            code = `solvePromise('${commands[i]}', 100).then(res => {return solvePromise('${commands[i + 2]}', ${timer})})`;
          } else if (i === commands.length - 1) {
            code += ';';
            setTimeout(() => this.passMonitor(), timer + tempTimer);
          } else {
            code += `.then(res => {return solvePromise('${commands[i + 2]}', ${timer})})`;
          }
          tempTimer += timer;
          commandIndex++;
        }
      }
    }
    eval(code);
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

