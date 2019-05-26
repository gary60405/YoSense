import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../model/app/app.model';
import { toastDisplayStateSelector, toastContentStateSelector, uploadProgressStateSelector } from './store/management.selectors';

import * as AuthoringManagementActions from './store/management.actions';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit {

  constructor(private store: Store<AppState>) {
    this.toastDisplyState$ = store.pipe(select(toastDisplayStateSelector));
    this.toastContentState$ = store.pipe(select(toastContentStateSelector));
    this.uploadProgress$ = store.pipe(select(uploadProgressStateSelector));
  }
  toastDisplyState$: Observable<boolean>;
  toastContentState$: Observable<string>;
  uploadProgress$: Observable<number>;
  ngOnInit() {

  }

  closeToast() {
    this.store.dispatch(new AuthoringManagementActions.SetToastDisplayState(false));
  }
}
