import { ChooseService } from './../../choose/choose.service';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { WizardComponent } from '../wizard/wizard.component';
import { GameService } from '../game.service';
import { Subscription ,  Subject } from 'rxjs';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.css']
})
export class PlaygroundComponent implements OnInit, OnDestroy {
  constructor(private snackBar: MatSnackBar, private gameService: GameService, private chooseService: ChooseService) { }
  isDiveLoaded = false;
  snackBarSubscription: Subscription;
  diveUrlSubscription: Subscription;
  url = '';
  ngOnInit() {
  this.snackBarSubscription = this.gameService.snackBarSubject.subscribe(content => {
    this.involke(content);
  });
  this.diveUrlSubscription = this.gameService.diveUrlSubject
    .subscribe(diveId => {
      this.isDiveLoaded = false;
      this.url = `http://120.114.170.2:8080/Experiment/kaleTestExperiment5.jsp?eid=${diveId}`;
      setTimeout(() => {
        while (!this.isDiveLoaded) {
          const temp = eval('diveLinker.Hello()');
          temp !== [] ? this.isDiveLoaded = true : this.isDiveLoaded = false;
        }
      }, 3000);
    });
    const code = this.chooseService.getStageDataArray()['diveId'];
    this.gameService.diveUrlSubject.next(code);
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
    this.diveUrlSubscription.unsubscribe();
  }
}
