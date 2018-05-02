import { ShareService } from './../../../share/share.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import { EditService } from '../edit.service';
import { FormGroup, Validators, FormControl, FormArray, AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-diagnosis',
  templateUrl: './diagnosis.component.html',
  styleUrls: ['./diagnosis.component.css']
})
export class DiagnosisComponent implements OnInit, OnDestroy {

  constructor(private editService: EditService, private shareService: ShareService) {}
  diveItems = [];
  operators = this.editService.getOperators();
  conditionDataArray = this.editService.getConditionDataArray();
  conditionArray: AbstractControl[];
  // descriptionForm: FormGroup;
  // successForm: FormGroup;
  // failForm: FormGroup;
  conditionForm: FormGroup;
  editIndex = -1;
  panelOpenState = false;
  diveDataSubscription = new Subscription();
  ngOnInit() {
    this.diveDataSubscription = this.editService.diveDataSubject
      .subscribe(diveitem => {
        this.diveItems = diveitem['outValue'];
      });
    this.editService.getDiveDataArray();
    this.conditionForm = this.initForm();
    // this.descriptionForm = new FormGroup({
    //   description: new FormControl()
    // });
    // this.successForm = new FormGroup({
    //   successText: new FormControl()
    // });
    // this.failForm = new FormGroup({
    //   failText: new FormControl()
    // });
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
  onSubmit() {
    this.shareService.displayStepArray[4] = true;
    this.editService.conditionDataArray = this.conditionDataArray;
  }
  onAddDiagnos() {
    if (this.editIndex === -1) {
      this.conditionDataArray.push(this.conditionForm.value);
      this.editService.conditionDataArray = this.conditionDataArray;
    } else {
      this.conditionDataArray[this.editIndex] = this.conditionForm.value;
      this.editService.conditionDataArray = this.conditionDataArray;
      this.editIndex = -1;
    }
    let num = (<FormArray>this.conditionForm.get('conditions')).length;
    console.log(num);
    while (num - 1) {
      (<FormArray>this.conditionForm.get('conditions')).removeAt(1);
      num--;
    }
    this.conditionForm.reset();
  }
  onDeleteDiagnos(index) {
    this.conditionDataArray.splice(index, 1);
    this.editService.conditionDataArray = this.conditionDataArray;
  }
  onEditDiagnos(index) {
    const conditions = this.conditionDataArray[index];
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
  ngOnDestroy() {
    this.diveDataSubscription.unsubscribe();
  }
}

