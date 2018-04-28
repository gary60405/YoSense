import { ShareService } from './../share/share.service';
import { Subscription } from 'rxjs/Subscription';
import { MatDialog } from '@angular/material';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';

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
              private dialog: MatDialog) { }
  signUpMsg = '';
  signInMsg = '';
  signUpForm: FormGroup;
  signUpSubscription = new Subscription();
  signInSubscription = new Subscription();
  progressBarSubscription = new Subscription();
  displayProgressBar = false;
  ngOnInit() {
    // this.authService.signIn('gary60405@gmail.com', 'zxc221345');
    this.signUpForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
      displayName: new FormControl(),
      identification: new FormControl()
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
  checkSignIn() {
    this.authService.isLoginSubject.next(true);
    console.log(this.authService.getUserInfo());
  }
  onSignUp() {
    this.shareService.progressBarSubject.next(true);
    this.authService.signUp(this.signUpForm.value);
  }
  ngOnDestroy() {
    this.signInSubscription.unsubscribe();
    this.signUpSubscription.unsubscribe();
    this.progressBarSubscription.unsubscribe();
  }
}
