import { UserDataState } from './../../model/auth/auth.model';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import { map, switchMap, mergeMap } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {

@Effect()
authSigninEffect = this.action$
.pipe(
    ofType(AuthActions.TRY_SIGNIN),
    map((action: AuthActions.TrySignin) => action.payload),
    switchMap((authData: UserDataState) => {
      const email = authData.email;
      const password = authData.password;
      return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(res => {
        const userDataPromise = new Promise((resolve, reject) => {
          this.afStore.collection('user').doc(email).valueChanges()
          .subscribe((userInfo) => {
            resolve({
              stateText: '登入成功！',
              userInfo: {...userInfo}
            });
          });
        });
        return userDataPromise.then(userInfo => userInfo);
      })
      .catch(err => {
        const wrapper = (text: string) => {
          return {
            stateText: text,
            userInfo: {}
          };
        };
        switch (err.code) {
          case 'auth/invalid-email':
           return wrapper('請輸入正確的電子郵件格式');
          case 'auth/user-disabled':
           return wrapper('此用戶已被停權，請聯絡管理員');
          case 'auth/user-not-found':
           return wrapper('找不到此帳戶');
          case 'auth/wrong-password':
           return wrapper('密碼輸入錯誤');
          case 'auth/network-request-failed':
           return wrapper('網路異常：請檢查網路狀態');
          default:
           return wrapper(err.code);
        }
      });
    }),
    mergeMap((wrap: {stateText: string, userInfo: {}}) => {
      return [
        {
          type: AuthActions.INITAIL_DIALOGUE
        },
        {
          type: AuthActions.SIGNIN,
          payload: {
            userData: {...wrap.userInfo},
            stateText: wrap.stateText,
            progressbarState: 'CLOSE',
            dialogueState: 'SIGN_IN_OPEN'
          }
        }
      ];
    })
  );

@Effect()
authSignup = this.action$
.pipe(
    ofType(AuthActions.TRY_SIGNUP),
    map((action: AuthActions.TrySignup) => action.payload),
    switchMap((authData: UserDataState) => {
      const email = authData.email;
      const password = authData.password;
      return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(res => {
        this.afStore.collection('user').doc(email).set({
          email: authData.email,
          displayName: authData.displayName,
          identification: authData.identification,
          createDate: new Date(),
          project: []
        });
        return '註冊成功！請由右上方登入';
      })
      .catch(err => {
        switch (err.code) {
          case 'auth/email-already-in-use':
           return '此電子郵件已經有人註冊';
          case 'auth/invalid-email':
           return '請輸入正確的電子郵件格式';
          case 'auth/operation-not-allowed':
           return '本帳戶尚未啟用，請聯絡管理員';
          case 'auth/weak-password':
           return '請至少輸入六位數的密碼';
          case 'auth/network-request-failed':
           return '網路異常：請檢查網路狀態';
          default:
           return err.code;
        }
      });
    }),
    mergeMap((message: string) => {
      return [
        {
          type: AuthActions.INITAIL_DIALOGUE
        },
        {
          type: AuthActions.SIGNUP,
          payload: {
            stateText: message,
            progressbarState: 'CLOSE',
            dialogueState: 'SIGN_UP_OPEN'
          }
        }
      ];
    })
  );

constructor(private action$: Actions,
            public afAuth: AngularFireAuth,
            public afStore: AngularFirestore) {
    const settings = {timestampsInSnapshots: true};
    afStore.firestore.settings(settings);
}

}


