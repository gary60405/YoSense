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
    this.passForm = this.initForm();
  }

  initForm() {
    return new FormGroup({
      passArray: new FormArray([
        new FormGroup({
          condition: new FormGroup({
            diveAttribute: new FormControl(''),
            operator: new FormControl(''),
            value: new FormControl('')
          }),
          logical: new FormControl('')
        })
      ])
    });
  }
  submitForm() {
    this.editService.passConditionArray = this.passForm.value;
    console.log(this.editService.passConditionArray);
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

