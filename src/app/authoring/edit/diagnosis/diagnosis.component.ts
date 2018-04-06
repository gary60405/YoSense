import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import { EditService } from '../edit.service';
import { FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
@Component({
  selector: 'app-diagnosis',
  templateUrl: './diagnosis.component.html',
  styleUrls: ['./diagnosis.component.css']
})
export class DiagnosisComponent implements OnInit {

  constructor(private editService: EditService, ) {}
  diveItems = this.editService.getDiveDataArray();
  operators = this.editService.getOperators();
  conditionDataArray = this.editService.getConditionDataArray();
  conditionForm: FormGroup;
  editIndex = -1;
  ngOnInit() {
    this.conditionForm = this.initForm();
  }
  initForm() {
    return new FormGroup({
      name: new FormControl('', [Validators.required, ]),
      condition: new FormArray([
        new FormGroup({
          diveAttribute: new FormControl('', [Validators.required, ]),
          operator: new FormControl('', [Validators.required, ]),
          value: new FormControl('', [Validators.required, ]),
        })
      ]),
      content: new FormControl('', [Validators.required, ])
    });
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
    for (const condition of conditions.condition) {
      conditonArray.push(new FormGroup({
        diveAttribute: new FormControl(condition.diveAttribute, [Validators.required, ]),
        operator: new FormControl(condition.operator, [Validators.required, ]),
        value: new FormControl(condition.value, [Validators.required, ]),
      }));
    }
    this.conditionForm = new FormGroup({
      name: new FormControl(conditions.name, [Validators.required, ]),
      condition: conditonArray,
      content: new FormControl(conditions.content, [Validators.required, ])
    });
    this.editIndex = index;
  }

  onAddCondition() {
    const conditionGroup = new FormGroup({
      diveAttribute: new FormControl('', [Validators.required, ]),
      operator: new FormControl('', [Validators.required, ]),
      value: new FormControl('', [Validators.required, ]),
    });
    (<FormArray>this.conditionForm.get('condition')).push(conditionGroup);
  }

  ondeleteCondition(index) {
    (<FormArray>this.conditionForm.get('condition')).removeAt(index);
  }

  getconditionArrayForm(form: FormGroup) {
    return form.controls;
  }
}

