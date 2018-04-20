import { ChooseService } from './../../choose/choose.service';
import { WizardComponent } from './../wizard/wizard.component';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { GameService } from '../game.service';
import { forEach } from '@angular/router/src/utils/collection';
// import * as astEval from 'ast-eval';
// import * as staticEval from 'static-eval';
// import * as esprima from 'esprima';
// import * as escodegen from 'escodegen';
// import * as Interpreter from 'js-interpreter';
// import { parse } from 'esprima';
// import { generate } from 'escodegen';


@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {
  @ViewChild('passDialog') passDialog;
  constructor(private gameService: GameService,
              private chooseService: ChooseService,
              private snackBar: MatSnackBar,
              private dialog: MatDialog) { }
  myInterpreter: any;
  ngOnInit() {
    // this.myInterpreter = new Interpreter('alert();');
    // let ast = esprima.parse('alert()');
    // console.log(this.myInterpreter);
    // // staticEval(ast)
    // ast = astEval(ast);
    // console.log(generate(ast));
    // const code = 'let a = 1; if(a==3) {console.log(a)}; setTimeout(() => {a=3;},2000);';
    // eval(code);

    // tslint:disable-next-line:no-eval
    eval(`init(\`${this.gameService.transformBlockDef()}\`)`);
  }
  nextStage() {
    this.gameService.moveEditStageIndex();
    // tslint:disable-next-line:no-eval
    eval(`init(\`${this.gameService.transformBlockDef()}\`, 2)`);
  }

  backToMenu() {
  }

  passMonitor() {
    const data = {diveAttribute: [], operator: [], value: [], logical: []};
    this.gameService.getPassCondition().forEach(item => {
      data['diveAttribute'].push(item['condition']['diveAttribute']);
      data['operator'].push(item['condition']['operator'].replace(/^=$/, '=='));
      data['value'].push(item['condition']['value']);
      data['logical'].push(item['logical']);
    });
    // tslint:disable-next-line:no-eval
    // const condition = [];
    // for ( const index in data['diveAttribute']) {
    //   if (data['diveAttribute'].hasOwnProperty(index)) {
    //     console.log(`diveLinker.Send(${data['diveAttribute'][index]}, '${data['value'][index]}')`);
    //     // tslint:disable-next-line:no-eval
    //     const temp = eval(`diveLinker.Get(${data['diveAttribute'][index]})`);
    //     condition.push(temp === data['value'][index]);
    //   }
    // }
    const condition = [true, true, true];
    let isPass = true;
    condition.forEach(item => {
      isPass = isPass && item;
    });
    if (isPass) {
      this.dialog.open(this.passDialog);
    }
  }

  async getCode() {
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
            console.log('timer:', timer);
            setTimeout(() => this.passMonitor(), timer);
          } else if (commandIndex === 0) {
            code = `solvePromise('${commands[i]}', 100).then(res => {return solvePromise('${commands[i + 2]}', ${timer})})`;
          } else if (i === commands.length - 1) {
            code += ';';
            console.log('timer:', timer  + tempTimer);
            setTimeout(() => this.passMonitor(), timer + tempTimer);
          } else {
            code += `.then(res => {return solvePromise('${commands[i + 2]}', ${timer})})`;
            // if (i === commands.length - 3) {
            //   tempTimer = timer;
            //   console.log(tempTimer);
            // }
          }
          tempTimer += timer;
          commandIndex++;
        }
      }
    }
    // tslint:disable-next-line:no-eval
    eval(code);
    console.log(code);

    // // tslint:disable-next-line:no-eval
    // eval(`solvePromise('console.log("gary")').then(res => {return solvePromise('console.log("100")')}).then(res => console.log(res));`);
  }


}

