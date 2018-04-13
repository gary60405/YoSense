import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import { EditService } from '../edit.service';
@Component({
  selector: 'app-pass',
  templateUrl: './pass.component.html',
  styleUrls: ['./pass.component.css']
})
export class PassComponent implements OnInit {
  constructor(private editService: EditService) { }
  diveItems = this.editService.getDiveDataArray();
  operators = this.editService.getOperators();
  passForm: FormGroup;
  ngOnInit() {
    const passArray = new FormArray([]);
    const passCondition = this.editService.getPassConditionArray();
    for (const condition of passCondition) {
      console.log(condition);
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
    console.log(passArray);
    this.passForm = new FormGroup({
      passArray: passArray
    });
  }

  submitForm() {
    this.editService.passConditionArray = this.passForm.value.passArray;
    this.editService.submitData();
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

  getConditionArrayForm(form: FormGroup) {
    return form.controls;
  }
}

