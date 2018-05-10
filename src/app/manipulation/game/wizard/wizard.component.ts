import { GameService } from './../game.service';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatSnackBar, MAT_SNACK_BAR_DATA } from '@angular/material';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.css']
})
export class WizardComponent implements OnInit, OnDestroy {

  constructor(public snackBar: MatSnackBar,  @Inject(MAT_SNACK_BAR_DATA) private snackBarData: any, public gameService: GameService) { }
  data = '';
  snackBarOffSubscription = new Subscription();
  ngOnInit() {
    this.data = this.snackBarData.content;
    this.gameService.snackBarOffSubject.subscribe(() => {
      this.close();
    });
  }
  close() {
    this.snackBar.dismiss();
  }
  ngOnDestroy() {
    this.snackBarOffSubscription.unsubscribe();
  }
}
