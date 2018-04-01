import { Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog } from '@angular/material';

@Component({
  selector: 'app-blockly',
  templateUrl: './blockly.component.html',
  styleUrls: ['./blockly.component.css']
})
export class BlocklyComponent implements OnInit {

  constructor(private dialog: MatDialog) { }
  @ViewChild('blocklyDialog') blocklyDialog;
  ngOnInit() {
  }
  open() {
    this.dialog.open(this.blocklyDialog, {
      width: '350px',
    });
  }
}
