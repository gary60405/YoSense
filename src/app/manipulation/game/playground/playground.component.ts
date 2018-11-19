import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { WizardComponent } from '../wizard/wizard.component';
import { Subscription, Observable } from 'rxjs';
import { AppState } from '../../../model/app/app.model';
import { Store, select } from '@ngrx/store';
import { diveIdSelector, snackBarStateSelector, studentDiveLoadedStateSelector } from '../../store/manipulation.selectors';
import * as ManipulationActions from './../../store/manipulation.actions';
import { SnackBarState } from '../../../model/manipulation/manipulation.model';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.css']
})
export class PlaygroundComponent implements OnInit, OnDestroy {

  snackBarSubscription: Subscription;
  diveId$: Observable<string>;
  isDiveLoaded$: Observable<boolean>;

  constructor(private snackBar: MatSnackBar,
              private store: Store<AppState>) {
    this.diveId$ = store.pipe(select(diveIdSelector));
    this.isDiveLoaded$ = store.pipe(select(studentDiveLoadedStateSelector));
  }
  ngOnInit() {
    this.snackBarSubscription = this.store.pipe(select(snackBarStateSelector))
      .subscribe((snackBarState: SnackBarState) => {
        if (snackBarState.isOpen) {
          this.snackBar.openFromComponent(WizardComponent, {
            data: {content: snackBarState.content},
            horizontalPosition: 'left',
            verticalPosition: 'top',
            panelClass: 'bar-position'
          });
        }
      });
  setTimeout(() => this.store.dispatch(new ManipulationActions.TryLoadDive), 3000);
  }

  ngOnDestroy() {
    this.snackBarSubscription.unsubscribe();
  }
}
