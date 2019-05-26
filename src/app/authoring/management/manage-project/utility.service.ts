import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { UserDataState } from '../../../model/auth/auth.model';
import { ProjectState } from '../../../model/authoring/management.model';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(public afStore: AngularFirestore) { }

  updateUserFeild(email: string, payload: any) {
    this.afStore.collection('user').doc(email).update({...payload});
  }
  updateAllUserFeild(payload: any) {
    this.getAllUserEmail().then((emails: string[]) => emails.forEach(email => this.afStore.collection('user').doc(email).update({...payload})));
  }

  updateProjectFeild(uid: string, payload: any) {
    this.afStore.collection('project').doc(uid).update({...payload});
  }

  updateAllProjectFeild(payload: any) {
    this.getAllProjectUid().then((uids: string[]) => uids.forEach(uid => this.afStore.collection('project').doc(uid).update({...payload})));
  }

  getAllProjectUid() {
    return new Promise(resolve => this.afStore.collection('project').valueChanges().subscribe(projects => resolve(projects.map(project => project['uid']))));
  }
  getAllUserEmail() {
    return new Promise(resolve => this.afStore.collection('user').valueChanges().subscribe(users => resolve(users.map(project => project['email']))));
  }

  deleteProject(exceptionUid: string[], exceptionAuthor: string[]) {
    this.afStore.collection('project').valueChanges()
      .subscribe(res => {
        res.filter(data => !exceptionAuthor.includes(data['author']) && !exceptionUid.includes(data['uid']))
           .map(data => data['uid'])
           .forEach(uid => {
              this.afStore.collection('project').doc(uid).collection('stage').valueChanges()
                .subscribe(nestRes => {
                  nestRes
                    .map(nestData => nestData['uid'])
                    .forEach(nestUid => this.afStore.collection('project').doc(uid).collection('stage').doc(nestUid).delete());
                });
              this.afStore.collection('project').doc(uid).delete();
           });
      });
  }

  deleteUser(exceptionEmail: string[]) {
    this.afStore.collection('user').valueChanges()
      .subscribe(res => {
        res.filter(data => !exceptionEmail.includes(data['email']))
           .map(data => data['email'])
           .forEach(email => this.afStore.collection('user').doc(email).delete());
      });
  }
  synchronousCurrentProjectUidToUser() {
    this.afStore.collection('user').valueChanges()
        .subscribe(userDataRows => {
          this.afStore.collection('project').valueChanges()
              .subscribe(projectDataRows => {
                const projectID = projectDataRows.map(projectData => projectData['uid']);
                userDataRows.forEach(userData => {
                  userData['project'].filter(uid => projectID.includes(uid));
                  this.afStore.collection('user').doc(userData['email']).set({
                    ...userData,
                    project: userData['project']
                  });
                });
              });
        });
  }
}
