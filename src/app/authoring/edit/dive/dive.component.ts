import { Subscription } from 'rxjs/Subscription';
import { EditService } from './../edit.service';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import {MatDialog } from '@angular/material';
import { ShareService } from '../../../share/share.service';
import { Subject } from 'rxjs/Subject';
import * as intro from 'intro.js/minified/intro.min.js';
import { ManagementService } from '../../management/management.service';

@Component({
  selector: 'app-dive',
  templateUrl: './dive.component.html',
  styleUrls: ['./dive.component.css']
})
export class DiveComponent implements OnInit, OnDestroy {
  url = 'http://dive.nutn.edu.tw:8080/Experiment/';
  @ViewChild('diveDialog') diveDialog;
  @ViewChild('code') code;
  isDiveLoaded = true;
  isChecked = false;
  diveLoadedSubject = new Subject<boolean>();
  diveLoadedSubscription = new Subscription();
  constructor(public dialog: MatDialog,
              private editService: EditService,
              private shareService: ShareService,
              private managementService: ManagementService) { }


  ngOnInit() {
    const stageData = this.managementService.stageDataArray;
    const index = this.managementService.editStageIndex;
    if (stageData[index]['lastModify'].toString() !== stageData[index]['createDate'].toString()) {
      this.shareService.displayStepArray = [true, true, true, true, true];
    }
    this.diveLoadedSubject.subscribe(res => this.isDiveLoaded = res);
  }
  open() {
    this.dialog.open(this.diveDialog);
  }
  confirm() {
    this.diveLoadedSubject.next(false);
    this.shareService.displayStepArray[1] = true;
    const code = this.code.nativeElement.value;
    this.editService.diveId = code;
    this.url = `http://120.114.170.2:8080/Experiment/kaleTestExperiment5.jsp?eid=${code}`;
    const solvePromise = (text, timer) => {
      return new Promise((resolve, reject) =>　{
        setTimeout(() => {
          // tslint:disable-next-line:no-eval
          resolve(eval(text));
        }, timer);
      });
    };
    solvePromise('diveLinker.Hello()', 3000)
      .then((res) => {
      return solvePromise('diveLinker.IOArray', 100);
    }).then((res: {}) => {
      this.isChecked = true;
      this.diveLoadedSubject.next(true);
      this.editService.transDataFormat(res);
    });
  }
  ngOnDestroy() {
    this.diveLoadedSubscription.unsubscribe();
  }
}
