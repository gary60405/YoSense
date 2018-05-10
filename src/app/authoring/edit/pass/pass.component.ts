import { Subscription } from 'rxjs';
import { FormGroup, FormControl, FormArray, AbstractControl } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import { EditService } from '../edit.service';
import { ManagementService } from '../../management/management.service';
import { ShareService } from '../../../share/share.service';
@Component({
  selector: 'app-pass',
  templateUrl: './pass.component.html',
  styleUrls: ['./pass.component.css']
})
export class PassComponent implements OnInit, OnDestroy {
  constructor(private editService: EditService,
              private managementService: ManagementService,
              private shareService: ShareService) { }
  diveItems = [];
  operators = this.editService.getOperators();
  conditionArray: AbstractControl[];
  passForm: FormGroup;
  diveDataSubscription = new Subscription();
  ngOnInit() {
    this.diveDataSubscription = this.editService.diveDataSubject
      .subscribe(diveitem => {
        this.diveItems = diveitem['outValue'];
      });
    this.editService.getDiveDataArray();
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
    this.passForm = new FormGroup({
      passArray: passArray
    });
    this.conditionArray = (<FormArray>this.passForm.controls.passArray).controls;
  }

  submitForm() {
    this.editService.passConditionArray = this.passForm.value.passArray;
    this.managementService.editModeSubject.next(false);
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
  ngOnDestroy() {
    this.diveDataSubscription.unsubscribe();
  }
}

