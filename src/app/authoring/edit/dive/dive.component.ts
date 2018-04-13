import { EditService } from './../edit.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog } from '@angular/material';

@Component({
  selector: 'app-dive',
  templateUrl: './dive.component.html',
  styleUrls: ['./dive.component.css']
})
export class DiveComponent implements OnInit {
  url = 'http://dive.nutn.edu.tw:8080/Experiment/';
  constructor(public dialog: MatDialog, private editService: EditService) { }
  @ViewChild('diveDialog') diveDialog;
  @ViewChild('code') code;

  ngOnInit() {}
  open() {
    this.dialog.open(this.diveDialog);
  }
  confirm() {
    const code = this.code.nativeElement.value;
    this.editService.diveId = code;
    this.url = 'http://120.114.170.2:8080/Experiment/kaleTestExperiment5.jsp?eid=' + '3149';
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
      return solvePromise('diveLinker.IOArray.inValue', 100);
    }).then((res: any[]) => {
      this.editService.transDataFormat(res);
    });

  }

}
