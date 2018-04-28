import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { WizardComponent } from '../wizard/wizard.component';
import { GameService } from '../game.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.css']
})
export class PlaygroundComponent implements OnInit, OnDestroy {
  constructor(private snackBar: MatSnackBar, private gameService: GameService) { }
  snackBarSubscription: Subscription;
  ngOnInit() {
  this.snackBarSubscription = this.gameService.snackBarSubject.subscribe(content => {
    this.involke(content);
  });

  }

  involke(content) {
    console.log(content);
    this.snackBar.openFromComponent(WizardComponent, {
      data: {content: content},
      horizontalPosition: 'left',
      verticalPosition: 'top',
      panelClass: 'bar-position'
    });
  }
  ngOnDestroy() {
    this.snackBarSubscription.unsubscribe();
  }
}
