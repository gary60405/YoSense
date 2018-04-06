import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import { EditService } from '../edit.service';
@Component({
  selector: 'app-bind',
  templateUrl: './bind.component.html',
  styleUrls: ['./bind.component.css']
})
export class BindComponent implements OnInit {
  displayedColumns = ['item', 'code'];
  dataSource = new MatTableDataSource(this.editService.getDiveDataArray());
  constructor(private editService: EditService) { }
  diveItems: any[];
  blocklyItems: any[];
  ngOnInit() {
    this.diveItems = this.editService.getDiveDataArray();
    this.blocklyItems = this.editService.getBlocklyDataArray();
  }

  toggleBindingRow(index) {
    this.blocklyItems[index].isDisabled = !this.blocklyItems[index].isDisabled;
    this.editService.blocklyDataArray = this.blocklyItems;
  }

}
