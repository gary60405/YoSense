import { ShareService } from './../../../share/share.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import { EditService } from '../edit.service';
import { FormGroup, Validators, FormControl, FormArray, AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-bind',
  templateUrl: './bind.component.html',
  styleUrls: ['./bind.component.css']
})
export class BindComponent implements OnInit, OnDestroy {
  constructor(private editService: EditService, private shareService: ShareService) { }
  diveItems = [];
  blocklyItems: any[];
  bindingArray: AbstractControl[];
  bindingForm: FormGroup;
  diveDataSubscription = new Subscription();
  ngOnInit() {
    this.diveDataSubscription = this.editService.diveDataSubject
      .subscribe(diveitem => {
        this.diveItems = diveitem;
      });
    this.editService.getDiveDataArray();
    this.blocklyItems = this.editService.getBlocklyDataArray();
    const bindingArray = new FormArray([]);
    const bindingArrayData = this.editService.getBindingDataArray();
    if (bindingArrayData.length === 0) {
      for (const blockly of this.blocklyItems) {
        bindingArray.push(
          new FormGroup({
            diveIndex: new FormControl(''),
            blocklyIndex: new FormControl(blockly.name)
          })
        );
      }
    } else {
      for (const bindingData of bindingArrayData) {
        const d_index = bindingData.diveIndex;
        const b_index = bindingData.blocklyIndex;
        bindingArray.push(
          new FormGroup({
            diveIndex: new FormControl(parseInt(d_index, 10)),
            blocklyIndex: new FormControl(parseInt(b_index, 10))
          })
        );
      }
    }
    this.bindingForm = new FormGroup({
      bindingArray: bindingArray
    });
    this.bindingArray = (<FormArray>this.bindingForm.controls.bindingArray).controls;
  }
  onSubmit() {
    this.shareService.stepperSubject.next();
    this.editService.bindingDataArray = this.bindingForm.value.bindingArray.map(row => {
      // const compare = (row['diveIndex']).toString();
      // let i = 0;
      // this.diveItems.forEach(item => {
      //   if ((item['dataValue']).toString() === compare) {
      //     row['diveIndex'] = i;
      //   }
      //   i++;
      // });
      return row;
    });
  }
  transformIndex(index) {
    return this.blocklyItems[index].name;
  }

  toggleBindingRow(index) {

  }
  ngOnDestroy() {
    this.diveDataSubscription.unsubscribe();
  }
}
