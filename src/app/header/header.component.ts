import { StepDisplayState } from './../model/header/header.model';
import { authenticateStateSelector, userDataStateSelector } from './../auth/store/auth.selectors';
import { AppState } from './../model/app/app.model';
import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import * as AuthActions from '../auth/store/auth.actions';
import * as HeaderActions from './store/header.actions';
import * as AppActions from './../store/app.actions';
import { Observable } from 'rxjs';
import { stepDisplayStateSelector } from './store/header.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @ViewChild('toolbar') toolbar;
  @ViewChild('menuTmpl') menuTmpl;

  isLogin$: Observable<boolean>;
  stepDisplayState$: Observable<StepDisplayState>;
  userName = '';
  identification = '';
  signInForm: FormGroup;
  overlayRef: OverlayRef;

  constructor(private route: Router,
              private overlay: Overlay,
              private viewContainerRef: ViewContainerRef,
              private store: Store<AppState>) {
    this.isLogin$ = store.pipe(select(authenticateStateSelector));
    this.stepDisplayState$ = store.pipe(select(stepDisplayStateSelector));
  }
  ngOnInit() {
    const strategy = this.overlay.position().connectedTo(this.toolbar._elementRef, { originX: 'end', originY: 'bottom' }, { overlayX: 'end', overlayY: 'top' });
    this.overlayRef = this.overlay.create({positionStrategy: strategy});
    this.signInForm = new FormGroup({
      mail: new FormControl(),
      password: new FormControl()
    });
    this.store
        .pipe(select(userDataStateSelector))
        .subscribe(userData => {
          if (userData.displayName !== '' &&
              userData.identification !== '' &&
              this.userName === userData.displayName &&
              this.identification === userData.identification) {
            return;
          }
          this.userName = userData.displayName;
          this.identification = userData.identification;
          this.redirectPage();
        });
    let current = '';
    this.route.events.subscribe(res => {
      if (current !== this.route.url) {
        current = this.route.url;
        switch (this.route.url) {
          case '/authoring/edit/dive':
            return this.store.dispatch(new HeaderActions.SetStepDisplayState('DIVE_DISPLAY'));
          case '/authoring/edit/hierarchy':
            return this.store.dispatch(new HeaderActions.SetStepDisplayState('HIERARCHY_DISPLAY'));
          case '/authoring/edit/blockly':
            return this.store.dispatch(new HeaderActions.SetStepDisplayState('BLOCKLY_DISPLAY'));
          case '/authoring/edit/diagnosis':
            return this.store.dispatch(new HeaderActions.SetStepDisplayState('DIAGNOSIS_DISPLAY'));
          case '/authoring/edit/pass':
            return this.store.dispatch(new HeaderActions.SetStepDisplayState('PASS_DISPLAY'));
          default:
            return this.store.dispatch(new HeaderActions.InitailStepDisplayState);
        }
      }
    });
  }

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(() => resolve(), ms));
  }

  displayMenu() {
    if (this.overlayRef && this.overlayRef.hasAttached()) {
      this.overlayRef.detach();
    } else {
      this.overlayRef.attach(new TemplatePortal(this.menuTmpl, this.viewContainerRef));
    }
  }

  async redirectPage() {
    switch (this.identification) {
      case 'teacher':
        if (this.route.url.indexOf('management') !== -1) {
          if (this.route.url !== '/authoring/management/manageProject') {
            this.route.navigateByUrl('/authoring');
            while (this.route.url !== '/authoring/management/manageProject') {
              await this.sleep(10);
            }
            return this.store.dispatch(new AppActions.TryInitialProjectState());
          }
          return this.route.navigateByUrl('/authoring');
        } else {
          this.store.dispatch(new AppActions.TryInitialStageState());
          return this.route.navigateByUrl('/authoring/management/editProject');
        }
      case 'student':
        if (this.route.url.indexOf('choose') !== -1) {
          if (this.route.url !== '/manipulation/choose/dashboard') {
            this.route.navigateByUrl('/manipulation');
            while (this.route.url !== '/manipulation/choose/dashboard') {
              await this.sleep(10);
            }
            return this.store.dispatch(new AppActions.TryInitialProjectState());
          }
          return this.route.navigateByUrl('/manipulation');
        } else {
          this.store.dispatch(new AppActions.TryInitialStageState());
          return this.route.navigateByUrl('/manipulation/choose/select-stage');
        }
      default:
        return this.route.navigateByUrl('/');
    }

  }
  onSignIn() {
    const userdata = {
      email: this.signInForm.value.mail,
      password: this.signInForm.value.password
    };
    this.store.dispatch(new AuthActions.TrySignin(userdata));
  }

  onSignOut() {
    this.overlayRef.detach();
    this.store.dispatch(new AppActions.TryLogout);
    // this.redirectPage();
  }

}
