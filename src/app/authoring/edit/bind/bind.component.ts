import { ShareService } from './../../../share/share.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import { EditService } from '../edit.service';
import { FormGroup, Validators, FormControl, FormArray, AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs';
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
        this.diveItems = diveitem['inValue'];
      });
    this.editService.getDiveDataArray();
    this.blocklyItems = this.editService.getBlocklyDataArray();
    const bindingArray = new FormArray([]);
    const bindingArrayData = this.editService.getBindingDataArray();
    if (bindingArrayData.length === 0) {
      this.blocklyItems.forEach(blockly => {
        bindingArray.push(
          new FormGroup({
            diveIndex: new FormControl(''),
            blocklyIndex: new FormControl(blockly.name)
          })
        );
      });
    } else {
      bindingArrayData.forEach(bindingData => {
        const d_index = bindingData.diveIndex;
        const b_index = bindingData.blocklyIndex;
        bindingArray.push(
          new FormGroup({
            diveIndex: new FormControl(parseInt(d_index, 10)),
            blocklyIndex: new FormControl(parseInt(b_index, 10))
          })
        );
      });
      if (this.blocklyItems.length > bindingArrayData.length) {
        let startIndex = this.blocklyItems.length - bindingArrayData.length;
        console.log(this.blocklyItems.length, bindingArrayData.length);
        while (startIndex) {
          const currentIndex = this.blocklyItems.length - bindingArrayData.length - startIndex;
          bindingArray.push(
            new FormGroup({
              diveIndex: new FormControl(''),
              blocklyIndex: new FormControl(this.blocklyItems[currentIndex].name)
            })
          );
          startIndex--;
        }
      }
    }
    this.bindingForm = new FormGroup({
      bindingArray: bindingArray
    });
    this.bindingArray = (<FormArray>this.bindingForm.controls.bindingArray).controls;
  }
  onSubmit() {
    this.shareService.displayStepArray[3] = true;
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
