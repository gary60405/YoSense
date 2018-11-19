import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { MatDialog } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

import * as AuthoringStageActions from './../store/authoringStage.actions';
import { AppState } from '../../../model/app/app.model';
import { BlocklyDataState } from '../../../model/authoring/management.model';
import { blocklyDataSelector } from '../store/authoringStage.selectors';
@Component({
  selector: 'app-blockly',
  templateUrl: './blockly.component.html',
  styleUrls: ['./blockly.component.css']
})
export class BlocklyComponent implements OnInit {

  constructor(private dialog: MatDialog,
              private store: Store<AppState>) {
    this.blocklys$ = store.pipe(select(blocklyDataSelector));
  }

  @ViewChild('blocklyDialog') blocklyDialog;
  blocklyFormGroup: FormGroup;
  blocklys$: Observable<BlocklyDataState[]>;

  ngOnInit() {
    this.blocklyFormGroup = new FormGroup({
      name: new FormControl('', [Validators.required, ]),
      blockDef: new FormControl('', [Validators.required, ]),
      blockGen: new FormControl('', [Validators.required, ])
    });
  }

  submitForm() {
    this.blocklyFormGroup.value['isDisabled'] = false;
    this.store.dispatch(new AuthoringStageActions.AddBlocklyDataState(this.blocklyFormGroup.value));
    this.blocklyFormGroup.reset();
  }

  deleteBlock(index) {
    this.store.dispatch(new AuthoringStageActions.DeleteBlocklyDataState(index));
  }

  open() {
    this.dialog.open(this.blocklyDialog, {
      width: '350px',
    });
  }
}
