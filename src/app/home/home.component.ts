import { Appstate } from './../store/app.reducers';
import { Subscription, Observable, from } from 'rxjs';
import { MatDialog } from '@angular/material';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';

import * as AuthActions from '../auth/store/auth.actions';
import { stateTextSelector, progressbarStateSelector, dialogueStateSelector } from '../auth/store/auth.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  @ViewChild('signUpDialog') signUpDialog;
  @ViewChild('signInDialog') signInDialog;
  constructor(public authService: AuthService,
              private dialog: MatDialog,
              private router: Router,
              private store: Store<Appstate>) {
  this.stateText$ = store.pipe(select(stateTextSelector));
  this.progressbarState$ = store.pipe(select(progressbarStateSelector));
  }
  signUpForm: FormGroup;
  stateText$: Observable<string>;
  progressbarState$: Observable<string>;
  dialogueSubscription = new Subscription();
  stateTextSubscription = new Subscription();
  identificationSubscription = new Subscription();

  ngOnInit() {
    this.signUpForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
      displayName: new FormControl(),
      identification: new FormControl()
    });

    this.dialogueSubscription = this.store.select(dialogueStateSelector)
      .subscribe(data => {
        let stateText = '';
        this.stateText$.subscribe(res => stateText = res);
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
                  this.identificationSubscription = this.store.select('auth')
                    .subscribe(res => {
                      const address = res.userData.identification === 'teacher' ? '/authoring' : '/manipulation';
                      this.router.navigateByUrl(address);
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
  ngOnDestroy() {
    this.dialogueSubscription.unsubscribe();
    this.stateTextSubscription.unsubscribe();
    this.identificationSubscription.unsubscribe();
  }
}
