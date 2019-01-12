import { HierarchyState, HierarchyDataState } from './../../../model/authoring/authoring.model';
import { DiveDataState } from './../../../model/authoring/management.model';
import { take } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { FormGroup, FormControl, AbstractControl, FormArray } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../model/app/app.model';
import * as EditActions from './../store/authoringStage.actions';
import { diveDataSelector } from '../store/authoringStage.selectors';
import { Observable } from 'rxjs';
import { hierarchyDataSelector } from '../store/authoringStage.selectors';

@Component({
  selector: 'app-hierarchy',
  templateUrl: './hierarchy.component.html',
  styleUrls: ['./hierarchy.component.css']
})
export class HierarchyComponent implements OnInit {
  @ViewChild('hierarchyDialog') hierarchyDialog;
  constructor(private dialog: MatDialog, private store: Store<AppState>) {
    this.diveData$ = store.select(diveDataSelector);
   }
  diveData$: Observable<DiveDataState>;
  hierarchyForm: FormGroup;
  createObjectForm: FormGroup;
  objectsArray: AbstractControl[];
  stateArray: AbstractControl[][];
  ngOnInit() {
    this.hierarchyForm = new FormGroup({objects: new FormArray([])});
    this.store.pipe(select(hierarchyDataSelector), take(1))
      .subscribe((hierarchyData: HierarchyState[]) => {
        if (hierarchyData.length !== 0) {
          const hierarchyDataArray = hierarchyData.map((data: HierarchyState) => {
            const hierarchyStateArray = data.states.map((state: HierarchyDataState) => {
              return  new FormGroup({
                class: new FormControl(state.class),
                stateName: new FormControl(state.stateName),
                diveData: new FormGroup({
                  diveName: new FormControl(state.diveData.diveName),
                  diveNumber: new FormControl(state.diveData.diveNumber),
                  diveValue: new FormControl(state.diveData.diveValue)
                }),
              });
            });
            return new FormGroup({
              name: new FormControl(data.name),
              states: new FormArray([...hierarchyStateArray])
            });
          });
          this.hierarchyForm = new FormGroup({objects: new FormArray([...hierarchyDataArray])});
        } else {
          this.hierarchyForm = new FormGroup({objects: new FormArray([])});
        }
      });
    this.createObjectForm = new FormGroup({name: new FormControl()});
    this.objectsArray = (<FormArray>this.hierarchyForm.controls.objects).controls;
    this.stateArray = [];
    this.pushStateToArray();

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
        (<FormControl>statesData.get('class')).value === 'setter' ?
          (<FormGroup>statesData.get('diveData')).controls.diveName.setValue(diveData.inValue.find(data => data.dataValue === value).viewValue)
          : (<FormGroup>statesData.get('diveData')).controls.diveName.setValue(diveData.outValue.find(data => data.dataValue === value).viewValue);
      });
  }
  onSubmitData() {
    this.store.dispatch(new EditActions.AddHierarchy(this.hierarchyForm.value));
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
    this.dialog.open(this.hierarchyDialog, {width: '350px'});
  }
  submitCreateObjectForm() {
    (<FormArray>this.hierarchyForm.get('objects')).push(this.initNameGroup());
    this.pushStateToArray();
    this.createObjectForm.reset();
  }
  pushStateToArray() {
    let i = 0;
    this.objectsArray.forEach(formGroup => {
      this.stateArray[i] = (<FormArray>formGroup.get('states')).controls;
      i++;
    });
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
    return classValue === 'setter' ? '請輸入物件動作名稱' : '請輸入物件狀態名稱';
  }
}
