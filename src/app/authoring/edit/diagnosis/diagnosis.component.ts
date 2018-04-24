import { ShareService } from './../../../share/share.service';
import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import { EditService } from '../edit.service';
import { FormGroup, Validators, FormControl, FormArray, AbstractControl } from '@angular/forms';
@Component({
  selector: 'app-diagnosis',
  templateUrl: './diagnosis.component.html',
  styleUrls: ['./diagnosis.component.css']
})
export class DiagnosisComponent implements OnInit {

  constructor(private editService: EditService, private shareService: ShareService) {}
  diveItems = this.editService.getDiveDataArray();
  operators = this.editService.getOperators();
  conditionDataArray = this.editService.getConditionDataArray();
  conditionArray: AbstractControl[];
  conditionForm: FormGroup;
  editIndex = -1;
  ngOnInit() {
    this.conditionForm = this.initForm();
    this.conditionArray = (<FormArray>this.conditionForm.controls.conditions).controls;
    console.log(this.conditionArray);
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
      content: new FormControl('', [Validators.required, ])
    });
  }
  onSubmit() {
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
    this.conditionForm = this.initForm();
  }
  onDeleteDiagnos(index) {
    this.conditionDataArray.splice(index, 1);
    this.editService.conditionDataArray = this.conditionDataArray;
  }
  onEditDiagnos(index) {
    const conditions = this.conditionDataArray[index];
    const conditonArray = new FormArray([]);
    console.log(conditions);
    for (const condition of conditions.conditions) {
      conditonArray.push(new FormGroup({
        condition: new FormGroup({
          diveAttribute: new FormControl(condition.condition['diveAttribute']),
          operator: new FormControl(condition.condition['operator']),
          value: new FormControl(condition.condition['value'])
        }),
        logical: new FormControl(condition['logical'])
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
}

