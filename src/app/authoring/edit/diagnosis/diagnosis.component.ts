import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormArray, AbstractControl } from '@angular/forms';

import * as AuthoringStageActions from './../store/authoringStage.actions';
import { AppState } from '../../../model/app/app.model';
import { DiveDataState, ConditionDataState } from '../../../model/authoring/management.model';
import { operatersSelector, conditionDataSelector, diveDataSelector } from '../store/authoringStage.selectors';

@Component({
  selector: 'app-diagnosis',
  templateUrl: './diagnosis.component.html',
  styleUrls: ['./diagnosis.component.css']
})
export class DiagnosisComponent implements OnInit {

  diveItems$: Observable<DiveDataState>;
  operators$: Observable<string[]>;
  conditionDataArray$: Observable<ConditionDataState[]>;
  conditionArray: AbstractControl[];
  conditionForm: FormGroup;
  editIndex = -1;
  panelOpenState = false;

  constructor(private store: Store<AppState>) {
    this.diveItems$ = store.pipe(select(diveDataSelector));
    this.operators$ = store.pipe(select(operatersSelector));
    this.conditionDataArray$ = store.pipe(select(conditionDataSelector));
  }

  ngOnInit() {
    this.conditionForm = this.initForm();
    this.conditionArray = (<FormArray>this.conditionForm.controls.conditions).controls;
  }

  initForm() {
    return new FormGroup({
      name: new FormControl('', [Validators.required, ]),
      conditions: new FormArray([
        new FormGroup({
          condition: new FormGroup({
            diveAttribute: new FormControl('', [Validators.required, ]),
            operator: new FormControl('', [Validators.required, ]),
            value: new FormControl('', [Validators.required, ]),
          }),
          logical: new FormControl('', [Validators.required, ])
        })
      ]),
      content: new FormControl('', [Validators.required, ]),
    });
  }

  onAddDiagnos() {
    if (this.editIndex === -1) {
      this.store.dispatch(new AuthoringStageActions.AddDiagnosisData(this.conditionForm.value));
    } else {
      this.conditionDataArray$
          .pipe(take(1))
          .subscribe((conditionDataArray: ConditionDataState[]) => {
            conditionDataArray[this.editIndex] = this.conditionForm.value;
            this.store.dispatch(new AuthoringStageActions.UpdateDiagnosisData(conditionDataArray));
          });
      this.editIndex = -1;
    }
    let num = (<FormArray>this.conditionForm.get('conditions')).length;
    while (num - 1) {
      (<FormArray>this.conditionForm.get('conditions')).removeAt(1);
      num--;
    }
    this.conditionForm.reset();
  }
  onDeleteDiagnos(index) {
    this.store.dispatch(new AuthoringStageActions.DeleteDiagnosisData(index));
  }

  onEditDiagnos(index) {
    this.conditionDataArray$
        .pipe(take(1))
        .subscribe((conditionDataArray: ConditionDataState[]) => {
          const conditions = conditionDataArray[index];
          const conditonArray = new FormArray([]);
          for (const condition of conditions.conditions) {
            conditonArray.push(new FormGroup({
              condition: new FormGroup({
                diveAttribute: new FormControl(condition.condition['diveAttribute'], [Validators.required, ]),
                operator: new FormControl(condition.condition['operator'], [Validators.required, ]),
                value: new FormControl(condition.condition['value'], [Validators.required, ])
              }),
              logical: new FormControl(condition['logical'], [Validators.required, ])
            }));
          }
          this.conditionForm = new FormGroup({
            name: new FormControl(conditions.name, [Validators.required, ]),
            conditions: conditonArray,
            content: new FormControl(conditions.content, [Validators.required, ])
          });
          this.editIndex = index;
          this.conditionArray = (<FormArray>this.conditionForm.controls.conditions).controls;
        });
  }

  onAddCondition() {
    const conditionGroup = new FormGroup({
      condition: new FormGroup({
        diveAttribute: new FormControl('', [Validators.required, ]),
        operator: new FormControl('', [Validators.required, ]),
        value: new FormControl('', [Validators.required, ]),
      }),
      logical: new FormControl('', [Validators.required, ])
    });
    (<FormArray>this.conditionForm.get('conditions')).push(conditionGroup);
  }

  ondeleteCondition(index) {
    (<FormArray>this.conditionForm.get('conditions')).removeAt(index);
  }
}

