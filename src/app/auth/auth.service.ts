import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AuthService {
  isLoginSubject = new Subject<boolean>();
  singnInSubject = new Subject<string>();
  singnUpSubject = new Subject<string>();
  userInfo = {};
  constructor(public afAuth: AngularFireAuth,
              public afStore: AngularFirestore) {}
  getUserInfo() {
    return this.userInfo;
  }
  signIn(email, password) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(res => {
        this.afStore.collection('user').doc(email).ref.get()
          .then(userInfo => {
            this.userInfo = userInfo.data();
          });
        return '登入成功！';
      })
      .catch(err => {
        switch (err.code) {
          case 'auth/invalid-email':
           return '請輸入正確的電子郵件格式';
          case 'auth/user-disabled':
           return '此用戶已被停權，請聯絡管理員';
          case 'auth/user-not-found':
           return '找不到此帳戶';
          case 'auth/wrong-password':
           return '密碼輸入錯誤';
          default:
           return err.code;
        }
      })
      .then(message => {
        this.singnInSubject.next(message);
      });
  }
  signUp(userInfo) {
    const email = userInfo.email;
    const password = userInfo.password;
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(res => {
        // const settings = {timestampsInSnapshots: true};
        // this.afStore.app.firestore().settings(settings);
        this.afStore.collection('user').doc(email).set({
          email: email,
          displayName: userInfo.displayName,
          identification: userInfo.identification,
          createDate: new Date()
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
          default:
           return err.code;
        }
      })
      .then(message => {
        this.singnUpSubject.next(message);
      });
  }
  signOut() {
    this.isLoginSubject.next(false);
    this.afAuth.auth.signOut();
  }
}
