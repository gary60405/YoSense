import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog } from '@angular/material';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { EditService } from '../edit.service';
import { ShareService } from '../../../share/share.service';
@Component({
  selector: 'app-blockly',
  templateUrl: './blockly.component.html',
  styleUrls: ['./blockly.component.css']
})
export class BlocklyComponent implements OnInit {

  constructor(private dialog: MatDialog, private editService: EditService, private shareService: ShareService) { }
  @ViewChild('blocklyDialog') blocklyDialog;
  blocklyFormGroup: FormGroup;
  blocklys: any[];
  ngOnInit() {
    this.blocklys = this.editService.getBlocklyDataArray();
    this.blocklyFormGroup = new FormGroup({
      name: new FormControl('', [Validators.required, ]),
      blockDef: new FormControl('', [Validators.required, ]),
      blockGen: new FormControl('', [Validators.required, ])
    });
  }

  moveStep() {
    this.shareService.stepperSubject.next();
  }

  submitForm() {
    this.blocklyFormGroup.value['isDisabled'] = false;
    this.editService.blocklyDataArray.push(this.blocklyFormGroup.value);
    this.blocklyFormGroup.reset();
    this.blocklys = this.editService.getBlocklyDataArray();
  }

  deleteBlock(index) {
    this.blocklys.splice(index, 1);
    this.editService.blocklyDataArray = this.blocklys;
  }

  open() {
    this.dialog.open(this.blocklyDialog, {
      width: '350px',
    });
  }
}
