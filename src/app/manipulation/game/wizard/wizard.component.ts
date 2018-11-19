import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar, MAT_SNACK_BAR_DATA } from '@angular/material';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.css']
})
export class WizardComponent implements OnInit {

  constructor(public snackBar: MatSnackBar,  @Inject(MAT_SNACK_BAR_DATA) private snackBarData: any) { }
  data = '';
  ngOnInit() {
    this.data = this.snackBarData.content;
  }
  close() {
    this.snackBar.dismiss();
  }
}
