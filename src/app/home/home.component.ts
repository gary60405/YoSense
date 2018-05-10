import { ShareService } from './../share/share.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  @ViewChild('signUpDialog') signUpDialog;
  @ViewChild('signInDialog') signInDialog;
  constructor(public authService: AuthService,
              private shareService: ShareService,
              private dialog: MatDialog,
              private router: Router) { }
  signUpMsg = '';
  signInMsg = '';
  signUpForm: FormGroup;
  signUpSubscription = new Subscription();
  signInSubscription = new Subscription();
  userInfoSubscription = new Subscription();
  progressBarSubscription = new Subscription();
  displayProgressBar = false;
  ngOnInit() {
    this.signUpForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
      displayName: new FormControl(),
      identification: new FormControl()
    });
    this.userInfoSubscription = this.authService.userInfoSubject
      .subscribe(userInfo => {
        if (this.signInMsg === '登入成功！' ) {
          setTimeout(() => {
            this.dialog.closeAll();
            setTimeout(() => {
              this.authService.isLoginSubject.next(true);
              const identification = this.authService.getUserInfo()['identification'];
              const address = identification === 'teacher' ? '/authoring' : '/manipulation';
              this.router.navigateByUrl(address);
            }, 100);
            setTimeout(() => { this.signInMsg = ''; }, 1000);
          }, 500);
        }
      });
    this.signInSubscription = this.authService.singnInSubject
      .subscribe(msg => {
        this.signInMsg = msg;
        this.dialog.open(this.signInDialog);
        this.shareService.progressBarSubject.next(false);
    });
    this.signUpSubscription = this.authService.singnUpSubject
      .subscribe(msg => {
        this.signUpMsg = msg;
        this.dialog.open(this.signUpDialog);
        this.shareService.progressBarSubject.next(false);
        if (msg === '註冊成功！請由右上方登入') {
          this.signUpForm.reset();
        }
    });
    this.shareService.progressBarSubject
      .subscribe(res => {
        this.displayProgressBar = res;
      });
  }
  onSignUp() {
    this.shareService.progressBarSubject.next(true);
    this.authService.signUp(this.signUpForm.value);
  }
  ngOnDestroy() {
    this.signInSubscription.unsubscribe();
    this.signUpSubscription.unsubscribe();
    this.userInfoSubscription.unsubscribe();
    this.progressBarSubscription.unsubscribe();
  }
}
