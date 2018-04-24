import { ShareService } from './../../../share/share.service';
import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import { EditService } from '../edit.service';
import { FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
@Component({
  selector: 'app-bind',
  templateUrl: './bind.component.html',
  styleUrls: ['./bind.component.css']
})
export class BindComponent implements OnInit {
  constructor(private editService: EditService, private shareService: ShareService) { }
  diveItems: any[];
  blocklyItems: any[];
  bindingForm: FormGroup;
  ngOnInit() {
    this.diveItems = this.editService.getDiveDataArray();
    this.blocklyItems = this.editService.getBlocklyDataArray();
    const bindingArray = new FormArray([]);
    const bindingArrayData = this.editService.getBindingDataArray();
    // console.log(this.diveItems);
    if (bindingArrayData.length === 0) {
      for (const blockly of this.blocklyItems) {
        // console.log(blockly.name);
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
        // console.log(d_index, this.diveItems[d_index]['dataValue'], b_index, this.blocklyItems[b_index]['name']);
        bindingArray.push(
          new FormGroup({
            diveIndex: new FormControl(parseInt(d_index, 10)),
            blocklyIndex: new FormControl(parseInt(b_index, 10))
          })
        );
      }
    }
    console.log(bindingArray);
    this.bindingForm = new FormGroup({
      bindingArray: bindingArray
    });
    console.log(this.bindingForm);
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
  getBindingArrayForm(form) {
    return form.controls;
  }
}
