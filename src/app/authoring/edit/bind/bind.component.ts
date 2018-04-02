import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-bind',
  templateUrl: './bind.component.html',
  styleUrls: ['./bind.component.css']
})
export class BindComponent implements OnInit {
  displayedColumns = ['item', 'attribute', 'code'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  diveItems = [
    {value: '11', viewValue: '11'},
    {value: '11', viewValue: '11'},
    {value: '11', viewValue: '11'},
    {value: '11', viewValue: '11'}];
  blocklyItems = [
      {value: '11', viewValue: '11'},
      {value: '12', viewValue: '12'},
      {value: '13', viewValue: '13'},
      {value: '14', viewValue: '14'},
      {value: '15', viewValue: '15'},
      {value: '16', viewValue: '16'}];
  constructor() { }
  ngOnInit() {
  }

}

export interface Element {
  item: string;
  attribute: string;
  code: string;
}

const ELEMENT_DATA: Element[] = [
  {item: '小鳥', attribute: 'Y軸的值', code: 'ax5121' },
  {item: '小鳥', attribute: '碰地板', code: 'ax5122' },
  {item: '小鳥', attribute: '碰障礙物', code: 'bx5121'},
  {item: '小鳥', attribute: '開始', code: 'ax6121' },
  {item: '背景', attribute: '移動', code: 'ax5521' },
  {item: '背景', attribute: '結束', code: 'cx5121' },
];
