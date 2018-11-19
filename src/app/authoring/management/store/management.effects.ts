import { UserDataState } from './../../../model/auth/auth.model';
import { map, switchMap, mergeMap, take } from 'rxjs/operators';
import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as AuthActions from './../../../auth/store/auth.actions';
import * as ManipulationActions from './../../../manipulation/store/manipulation.actions';

@Injectable()
export class ManagementEffects {



constructor(private action$: Actions,
            public afStore: AngularFirestore) {}
}
