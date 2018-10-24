import { DiveDataState } from './../../../model/authoring/management.model';
import { take } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { FormGroup, FormControl, AbstractControl, FormArray } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Appstate } from '../../../store/app.reducers';
import * as AuthoringActions from './../../store/authoring.actions';
import { hierarchyDataSelector, diveDataSelector } from '../../store/authoring.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-hierarchy',
  templateUrl: './hierarchy.component.html',
  styleUrls: ['./hierarchy.component.css']
})
export class HierarchyComponent implements OnInit {
  @ViewChild('hierarchyDialog') hierarchyDialog;
  constructor(private dialog: MatDialog, private store: Store<Appstate>) {
    this.diveData$ = store.select(diveDataSelector);
   }
  diveData$: Observable<DiveDataState>;
  hierarchyForm: FormGroup;
  createObjectForm: FormGroup;
  objectsArray: AbstractControl[];
  stateArray: AbstractControl[][];
  ngOnInit() {
    this.hierarchyForm = new FormGroup({objects: new FormArray([])});
    this.createObjectForm = new FormGroup({name: new FormControl()});
    this.objectsArray = (<FormArray>this.hierarchyForm.controls.objects).controls;
    this.stateArray = [];
  }
  onDeleteItem(i: number, j?: number) {
    if (j === undefined) {
      (<FormArray>this.hierarchyForm.get('objects')).removeAt(i);
    } else {
      const objectArray = (<FormArray>this.hierarchyForm.get('objects'));
      (<FormArray>objectArray.controls[i].get('states')).removeAt(j);
    }
  }
  onSelectValue(value: string, index: number, index2: number) {
    this.store.select(diveDataSelector)
      .pipe(take(1))
      .subscribe((diveData: DiveDataState) => {
        const stateArray = (<FormArray>this.hierarchyForm.get('objects')).controls[index].get('states');
        const statesData = (<FormArray>stateArray).controls[index2];
        const classState = (<FormControl>statesData.get('class')).value;
        switch (classState) {
          case 'setter':
            const setterRow = diveData.inValue.find(data => data.id === parseInt(value, 10));
            return (<FormGroup>statesData.get('diveData')).controls.diveName.setValue(setterRow.name);
          case 'getter':
            const getterRow = diveData.outValue.find(data => data.id === parseInt(value, 10));
            return (<FormGroup>statesData.get('diveData')).controls.diveName.setValue(getterRow.name);
        }
      });
  }
  onSubmitData() {
    this.store.dispatch(new AuthoringActions.BuildHierarchy(this.hierarchyForm.value));
  }
  onCreateGetter(index: number) {
    const stateArray = (<FormArray>this.hierarchyForm.get('objects')).controls[index].get('states');
    (<FormArray>stateArray).push(this.initStateGroup('getter'));
  }
  onCreateSetter(index: number) {
    const stateArray = (<FormArray>this.hierarchyForm.get('objects')).controls[index].get('states');
    (<FormArray>stateArray).push(this.initStateGroup('setter'));
  }
  onCreateObject() {
    this.dialog.open(this.hierarchyDialog, {
      width: '350px',
    });
  }
  submitCreateObjectForm() {
    (<FormArray>this.hierarchyForm.get('objects')).push(this.initNameGroup());
    let i = 0;
    for (const formGroup of this.objectsArray) {
      this.stateArray[i] = (<FormArray>formGroup.get('states')).controls;
      i++;
    }
    this.createObjectForm.reset();
  }
  initStateGroup(classState: string) {
    return new FormGroup({
      stateName: new FormControl(),
      diveData: new FormGroup({
        diveName: new FormControl(''),
        diveNumber: new FormControl('--請選擇dive屬性--'),
        diveValue: new FormControl('')
      }),
      class: new FormControl(classState)
    });
  }
  initNameGroup() {
    return new FormGroup({
      name: new FormControl(this.createObjectForm.value.name),
      states: new FormArray([])
    });
  }
  switchPlaceholder(index: number, index2: number) {
    const classValue = this.hierarchyForm.value.objects[index].states[index2].class;
    if (classValue === 'setter') {
      return '請輸入物件動作名稱';
    } else {
      return '請輸入物件狀態名稱';
    }
  }
}
