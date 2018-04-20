import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { WizardComponent } from '../wizard/wizard.component';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.css']
})
export class PlaygroundComponent implements OnInit {
  constructor(private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  involke() {
    this.snackBar.openFromComponent(WizardComponent, {
      horizontalPosition: 'left',
      verticalPosition: 'top',
      panelClass: 'bar-position'
    });
  }
}
