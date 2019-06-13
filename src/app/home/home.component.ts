import { AppState } from './../model/app/app.model';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';

import * as AuthActions from '../auth/store/auth.actions';
import { stateTextSelector, progressbarStateSelector, dialogueStateSelector } from '../auth/store/auth.selectors';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('signUpDialog', { static: true }) signUpDialog;
  @ViewChild('signInDialog', { static: true }) signInDialog;
  @ViewChild('img', { static: false }) img;
  constructor(private dialog: MatDialog,
              private router: Router,
              private store: Store<AppState>) {
  this.stateText$ = store.pipe(select(stateTextSelector));
  this.progressbarState$ = store.pipe(select(progressbarStateSelector));
  }
  signUpForm: FormGroup;
  stateText$: Observable<string>;
  progressbarState$: Observable<string>;
  text = '';
  ngOnInit() {
    this.signUpForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
      displayName: new FormControl(),
      identification: new FormControl()
    });
    const dialogueSubscription = this.store.select(dialogueStateSelector)
        .subscribe(data => {
          let stateText = '';
          this.stateText$.pipe(take(1))
              .subscribe(res => stateText = res);
          switch (data) {
            case 'SIGN_UP_OPEN':
              if (stateText === '註冊成功！請由右上方登入') {
                this.signUpForm.reset();
              }
              return this.dialog.open(this.signUpDialog);
            case 'SIGN_IN_OPEN':
              this.dialog.open(this.signInDialog);
              if (stateText === '登入成功！') {
                setTimeout(() => {
                  this.dialog.closeAll();
                  setTimeout(() => {
                    this.store.dispatch(new AuthActions.SetAuthenticated);
                    this.store.select('auth').pipe(take(1))
                        .subscribe(res => {
                          const address = res.userData.identification === 'teacher' ? '/authoring' : '/manipulation';
                          this.router.navigateByUrl(address);
                          dialogueSubscription.unsubscribe();
                        });
                  }, 100);
                }, 500);
              }
              break;
            case 'CLOSE_DIALOGUE':
              return this.dialog.closeAll();
          }
        });
  }
  onSignUp() {
    this.store.dispatch(new AuthActions.TrySignup(this.signUpForm.value));
  }

}
