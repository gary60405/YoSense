import { StepDisplayState } from './../model/header/header.model';
import { authenticateStateSelector, userDataStateSelector } from './../auth/store/auth.selectors';
import { Appstate } from './../store/app.reducers';
import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import * as AuthActions from '../auth/store/auth.actions';
import * as HeaderActions from './store/header.actions';
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
              private store: Store<Appstate>) {
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
    this.store.pipe(select(userDataStateSelector))
      .subscribe(userData => {
        this.userName = userData.displayName;
        this.identification = userData.identification;
        this.redirectPage();
      });
    let current = '';
    this.route.events.subscribe(res => {
      if (current !== this.route.url) {
        current = this.route.url;
        if (this.route.url === '/authoring/edit/dive') {
          this.store.dispatch(new HeaderActions.SetStepDisplayState('DIVE_DISPLAY'));
        } else if (this.route.url === '/authoring/edit/hierarchy') {
          this.store.dispatch(new HeaderActions.SetStepDisplayState('HIERARCHY_DISPLAY_DISPLAY'));
        } else if (this.route.url === '/authoring/edit/blockly') {
          this.store.dispatch(new HeaderActions.SetStepDisplayState('BLOCKLY_DISPLAY'));
        } else if (this.route.url === '/authoring/edit/bind') {
          this.store.dispatch(new HeaderActions.SetStepDisplayState('BINDING_DISPLAY'));
        } else if (this.route.url === '/authoring/edit/diagnosis') {
          this.store.dispatch(new HeaderActions.SetStepDisplayState('DIAGNOSIS_DISPLAY'));
        } else if (this.route.url === '/authoring/edit/pass') {
          this.store.dispatch(new HeaderActions.SetStepDisplayState('PASS_DISPLAY'));
        } else {
          this.store.dispatch(new HeaderActions.InitailStepDisplayState);
        }
      }
    });
  }

  displayMenu() {
    if (this.overlayRef && this.overlayRef.hasAttached()) {
      this.overlayRef.detach();
    } else {
      this.overlayRef.attach(new TemplatePortal(this.menuTmpl, this.viewContainerRef));
    }
  }

  redirectPage() {
    if (this.identification === 'teacher') {
      if (this.route.url.indexOf('management') !== -1) {
        this.route.navigateByUrl('/authoring');
      } else {
        this.route.navigateByUrl('/authoring/management/editProject');
      }
    } else if (this.identification === 'student') {
      if (this.route.url.indexOf('choose') !== -1) {
        this.route.navigateByUrl('/manipulation');
      } else {
        this.route.navigateByUrl('/manipulation/choose/select-stage');
      }
    } else {
      this.route.navigateByUrl('/');
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
    this.store.dispatch(new AuthActions.Logout);
    this.redirectPage();
  }

}
