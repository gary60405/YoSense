import { ChooseService } from './../../choose/choose.service';
import { WizardComponent } from './../wizard/wizard.component';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { GameService } from '../game.service';
// import * as astEval from 'ast-eval';
// import * as staticEval from 'static-eval';
// import * as esprima from 'esprima';
// import * as escodegen from 'escodegen';
// import * as Interpreter from 'js-interpreter';
// import { parse } from 'esprima';
// import { generate } from 'escodegen';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit, OnDestroy {
  @ViewChild('passDialog') passDialog;
  @ViewChild('failDialog') failDialog;
  constructor(public gameService: GameService,
              private chooseService: ChooseService,
              private snackBar: MatSnackBar,
              private dialog: MatDialog) { }
  intervalID = [];
  isEnd: Boolean;
  ngOnInit() {
    this.gameService.getStageData();
    // tslint:disable-next-line:no-eval
    eval(`init(\`${this.gameService.transformBlockDef()}\`)`);
    this.updateStageInfo();
  }
  restart() {
    // tslint:disable-next-line:no-eval
    eval(`init(\`${this.gameService.transformBlockDef()}\`, 2)`);
  }
  nextStage() {
    this.gameService.moveEditStageIndex();
    // tslint:disable-next-line:no-eval
    eval(`init(\`${this.gameService.transformBlockDef()}\`, 2)`);
  }
  updateStageInfo() {
    const editStageIndex = this.chooseService.editStageIndex;
    const sumOfStage = this.chooseService.getAllStageDataArray().length;
    this.isEnd = sumOfStage - 1 !== editStageIndex;
    // console.log(editStageIndex, sumOfStage, this.isEnd);
  }
  backToMenu() {
    this.chooseService.editStageIndex = -1;
  }
  diagnosisMonitor() {
    const diagnosis = this.gameService.getDiagnosis().map(item => {
      return {conditions: item['conditions'], content: item['content']};
    });
    const diveAttribute = new Set();
    diagnosis.forEach(items => {
      items['conditions'].forEach(item => {
        diveAttribute.add(item['condition']['diveAttribute']);
      });
    });
    const diveValue = {};
    diveAttribute.forEach(attr => {
      // tslint:disable-next-line:no-eval
      diveValue[`${attr}`] = eval(`diveLinker.Get(${attr})`);
    });
    let i = 0;
    diagnosis.forEach(items => {
      this.intervalID.push(
        setInterval(() => {
          let isTrigger = true;
          items['conditions'].forEach(item => {
            // tslint:disable-next-line:no-eval
            const compareValue = eval(`${diveValue[item['diveAttribute']]}
                                        ${item.condition['operator']}
                                        ${Number(item.condition['value'])}`);
            // tslint:disable-next-line:no-eval
            isTrigger = eval(`${isTrigger} && ${compareValue}`);
          });
          // isTrigger = true;
          if (isTrigger) {
            this.gameService.snackBarSubject.next(items['content']);
            clearInterval(this.intervalID[i]);
          }
        i++;
        }, 100)
      );
  });
  }
  passMonitor() {
    this.updateStageInfo();
    this.intervalID.forEach(id => {
      clearInterval(id);
    });
    this.intervalID = [];
    const data = {diveAttribute: [], operator: [], value: [], logical: []};
    this.gameService.getPassCondition().forEach(item => {
      data['diveAttribute'].push(item['condition']['diveAttribute']);
      data['operator'].push(item['condition']['operator'].replace(/^=$/, '=='));
      data['value'].push(item['condition']['value']);
      data['logical'].push(item['logical']);
    });
    const condition = [];
    for ( const index in data['diveAttribute']) {
      if (data['diveAttribute'].hasOwnProperty(index)) {
        // tslint:disable-next-line:no-eval
        const temp = eval(`diveLinker.Get(${data['diveAttribute'][index]})`);
        condition.push(temp === data['value'][index]);
      }
    }
    let isPass = true;
    for (const index in condition) {
      if (condition.hasOwnProperty(index)) {
        const element = condition[index];
        if (index !== '0') {
          // tslint:disable-next-line:no-eval
          isPass = eval(`${isPass} ${data['logical'][index]} ${element}`);
        } else {
          isPass = isPass && element;
        }
      }
    }
    condition.forEach(item => {
      isPass = isPass && item;
    });
    // isPass = true;
    if (isPass) {
      this.dialog.open(this.passDialog);
    } else {
      this.dialog.open(this.failDialog);
    }
  }

 getCode() {
   this.diagnosisMonitor();
    // tslint:disable-next-line:no-eval
    const commands = eval('getCode()').split(';').map(item => {
      return item + ';';
    }).slice(0, -1);
    const solvePromise = (command, time) => {
      return new Promise((resolve, reject) =>　{
        setTimeout(() => {
          // tslint:disable-next-line:no-eval
          resolve(eval(command));
        }, time);
      });
    };
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
    // tslint:disable-next-line:no-eval
    eval(code);
  }
ngOnDestroy() {
  this.gameService.snackBarOffSubject.next();
  this.intervalID.forEach(id => {
    clearInterval(id);
  });
  this.intervalID = [];
}

}

