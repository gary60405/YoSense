import { SubmitDataState } from './../../../model/authoring/authoring.model';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, AbstractControl } from '@angular/forms';

import * as AuthoringStageActions from './../store/authoringStage.actions';
import { AppState } from '../../../model/app/app.model';
import { DiveDataState } from '../../../model/authoring/management.model';
import { PassConditionState } from './../../../model/authoring/management.model';
import { operatersSelector, diveDataSelector, passConditionSelector } from '../store/authoringStage.selectors';
import { submitDataSelector } from '../store/authoringStage.selectors';

@Component({
  selector: 'app-pass',
  templateUrl: './pass.component.html',
  styleUrls: ['./pass.component.css']
})

export class PassComponent implements OnInit {
  constructor(private store: Store<AppState>) {
    this.diveItems$ = store.pipe(select(diveDataSelector));
    this.operators$ = store.pipe(select(operatersSelector));
  }

  operators$: Observable<string[]>;
  diveItems$: Observable<DiveDataState>;
  conditionArray: AbstractControl[];
  passForm: FormGroup;

  ngOnInit() {
    const passArray = new FormArray([]);
    this.store
        .pipe(select(passConditionSelector), take(1))
        .subscribe((passCondition: PassConditionState[]) => {
          for (const condition of passCondition) {
            passArray.push(
              new FormGroup({
                condition: new FormGroup({
                  diveAttribute: new FormControl(condition.condition['diveAttribute']),
                  operator: new FormControl(condition.condition['operator']),
                  value: new FormControl(condition.condition['value'])
                }),
                logical: new FormControl(condition['logical'])
              })
            );
          }
          this.passForm = new FormGroup({passArray: passArray});
          this.conditionArray = (<FormArray>this.passForm.controls.passArray).controls;
        });
  }

  submitForm() {
    this.store.dispatch(new AuthoringStageActions.AddPassConditionData(this.passForm.value.passArray));
    this.store
        .pipe(select(submitDataSelector), take(1))
        .subscribe((submitData: SubmitDataState) => this.store.dispatch(new AuthoringStageActions.SubmitAllData(submitData)));
  }

  onAddCondition() {
    const controls = new FormGroup({
      condition: new FormGroup({
        diveAttribute: new FormControl(''),
        operator: new FormControl(''),
        value: new FormControl('')
      }),
      logical: new FormControl('')
    });
    (<FormArray>this.passForm.get('passArray')).push(controls);
  }

  onDeleteCondition(index) {
    (<FormArray>this.passForm.get('passArray')).removeAt(index);
  }
}

