import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormArray, AbstractControl } from '@angular/forms';

import * as AuthoringStageActions from './../store/authoringStage.actions';
import { AppState } from '../../../model/app/app.model';
import { diveDataSelector } from '../store/authoringStage.selectors';
import { blocklyDataSelector, bindingDataSelector } from '../store/authoringStage.selectors';
import { DiveDataState, BlocklyDataState, BindingDataState } from '../../../model/authoring/management.model';
@Component({
  selector: 'app-bind',
  templateUrl: './bind.component.html',
  styleUrls: ['./bind.component.css']
})
export class BindComponent implements OnInit {

  bindingForm: FormGroup;
  bindingArray: AbstractControl[];
  diveItems$: Observable<DiveDataState>;
  blocklyItems$: Observable<BlocklyDataState[]>;

  constructor(private store: Store<AppState>) {
    this.diveItems$ = store.pipe(select(diveDataSelector));
    this.blocklyItems$ = store.pipe(select(blocklyDataSelector));
  }

  ngOnInit() {
    const bindingArray = new FormArray([]);
    this.store
        .pipe(select(bindingDataSelector), take(1))
        .subscribe((bindingDataArray: BindingDataState[]) => {
          this.blocklyItems$.pipe(take(1))
              .subscribe((blocklyItems: BlocklyDataState[]) => {
                if (bindingDataArray.length === 0) {
                  blocklyItems.forEach(blockly => {
                    bindingArray.push(
                      new FormGroup({
                        diveIndex: new FormControl(''),
                        blocklyIndex: new FormControl(blockly.name)
                      })
                    );
                  });
                } else {
                  bindingDataArray.forEach(bindingData => {
                    const d_index = bindingData.diveIndex;
                    const b_index = bindingData.blocklyIndex;
                    bindingArray.push(
                      new FormGroup({
                        diveIndex: new FormControl(d_index),
                        blocklyIndex: new FormControl(b_index)
                      })
                    );
                  });
                  if (blocklyItems.length > bindingDataArray.length) {
                    let startIndex = blocklyItems.length - bindingDataArray.length;
                    while (startIndex) {
                      const currentIndex = blocklyItems.length - bindingDataArray.length - startIndex;
                      bindingArray.push(
                        new FormGroup({
                          diveIndex: new FormControl(''),
                          blocklyIndex: new FormControl(blocklyItems[currentIndex].name)
                        })
                      );
                      startIndex--;
                    }
                  }
                }
              });
      });
    this.bindingForm = new FormGroup({bindingArray: bindingArray});
    this.bindingArray = (<FormArray>this.bindingForm.controls.bindingArray).controls;
  }

  onSubmit() {
    this.store.dispatch(new AuthoringStageActions.AddBindingData(this.bindingForm.value.bindingArray));
  }

}
