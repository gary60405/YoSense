import { ShareService } from './../share/share.service';
import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { MatMenuTrigger } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLogin = false;
  userName = '';
  identification = '';
  @ViewChild('toolbar') toolbar;
  @ViewChild('menuTmpl') menuTmpl;
  signInForm: FormGroup;
  overlayRef: OverlayRef;
  displayStepArray = [false, false, false, false, false];
  constructor(private shareService: ShareService,
              private authService: AuthService,
              private route: Router,
              private overlay: Overlay,
              private viewContainerRef: ViewContainerRef) { }

  ngOnInit() {
    const strategy = this.overlay.position()
                      .connectedTo(this.toolbar._elementRef, { originX: 'end', originY: 'bottom' }, { overlayX: 'end', overlayY: 'top' });
    this.overlayRef = this.overlay.create({positionStrategy: strategy});
    this.signInForm = new FormGroup({
      mail: new FormControl(),
      password: new FormControl()
    });
    this.authService.isLoginSubject
      .subscribe(isLogin => {
        this.isLogin = isLogin;
      });
    this.authService.userInfoSubject
      .subscribe(res => {
        this.userName = res['displayName'];
        this.identification = res['identification'];
      });
    this.shareService.stepperSubject
      .subscribe(() => {
        if (this.route.url === '/authoring/management/editProject') {
          this.displayStepArray[0] = true;
        } else if (this.route.url === '/authoring/edit/dive') {
          this.displayStepArray[1] = true;
        } else if (this.route.url === '/authoring/edit/blockly') {
          this.displayStepArray[2] = true;
        } else if (this.route.url === '/authoring/edit/bind') {
          this.displayStepArray[3] = true;
        } else if (this.route.url === '/authoring/edit/diagnosis') {
          this.displayStepArray[4] = true;
        } else if (this.route.url === '/authoring/edit/pass') {
          this.displayStepArray = [false, false, false, false, false];
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

  switchToHome() {
    if (this.identification === 'teacher') {
      if (this.route.url.indexOf('management') !== -1) {
        return '/authoring';
      } else {
        return '/authoring/management/editProject';
      }
    } else if (this.identification === 'student') {
      if (this.route.url.indexOf('choose') !== -1) {
        return '/manipulation';
      } else {
        return '/manipulation/select-stage';
      }
    } else {
      return '/';
    }
  }
  onSignIn() {
    this.authService.signIn(this.signInForm.value.mail, this.signInForm.value.password);
    this.shareService.progressBarSubject.next(true);
  }

  onSignOut() {
    this.overlayRef.detach();
    this.authService.signOut();
  }

}
