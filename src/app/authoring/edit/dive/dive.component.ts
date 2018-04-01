import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog } from '@angular/material';
@Component({
  selector: 'app-dive',
  templateUrl: './dive.component.html',
  styleUrls: ['./dive.component.css']
})
export class DiveComponent implements OnInit {

  constructor(public dialog: MatDialog) { }
  @ViewChild('diveDialog') diveDialog;
  ngOnInit() {
  }
  open() {
    this.dialog.open(this.diveDialog);
  }

}
