import { UserDataState } from './../../model/auth/auth.model';
import { map, switchMap, mergeMap, take } from 'rxjs/operators';
import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as AuthoringActions from './authoring.actions';
import * as AuthActions from './../../auth/store/auth.actions';
import { ProjectState, StagesState } from '../../model/authoring/management.model';
@Injectable()
export class AuthoringEffects {

@Effect()
addProject = this.action$
  .ofType(AuthoringActions.TRY_ADD_PROJECT)
  .pipe(
    map((action: AuthoringActions.TryAddProject) => action.payload),
    switchMap((res: {userData: UserDataState, projectData: ProjectState}) => {
      const addPorjectPromise = new Promise((resolve, reject) => {
        const submit = uid => {
          this.afStore.collection('project').doc(uid).ref.get()
          .then(response => {
            if (response.data() === undefined) {
              res.projectData.uid = uid;
              res.projectData.createDate = new Date();
              res.projectData.lastModify = new Date();
              res.projectData.author = res.userData.email;
              res.userData.project.push(res.projectData.uid);
              this.afStore.collection('user').doc(res.userData.email).update({project: res.userData.project});
              this.afStore.collection('project').doc(res.projectData.uid).set(res.projectData)
                .then(() => resolve(res));
            } else {
              submit(this.genUid());
            }
          })
          .catch(err => {
            console.log(err);
          });
        };
        submit(this.genUid());
      });
      return addPorjectPromise.then((data: {userData: UserDataState, projectData: ProjectState}) => data);
    }),
    mergeMap((res: {userData: UserDataState, projectData: ProjectState}) => {
      return [
        {
          type: AuthActions.UPDATE_USER_PROJECT,
          payload: res.userData.project
        },
        {
          type: AuthoringActions.ADD_PROJECT,
          payload: res.projectData
        }
    ];
    })
  );

@Effect()
deleteProject = this.action$
  .ofType(AuthoringActions.TRY_DELETE_PROJECT)
  .pipe(
    map((action: AuthoringActions.TryDeleteProject) => action.payload),
    mergeMap((uid: string) => {
      this.afStore.doc(`project/${uid}`).valueChanges()
        .pipe(take(1))
        .subscribe(projectData => {
            this.afStore.doc(`user/${projectData['author']}`).valueChanges()
              .pipe(take(1))
              .subscribe(userInfo => {
                const index = userInfo['project'].indexOf(uid);
                userInfo['project'].splice(index, 1);
                this.afStore.doc(`user/${projectData['author']}`).update({...userInfo});
              });
        });
      this.afStore.collection(`project/9esW/stage`).get()
        .pipe(take(1))
        .subscribe(rows => rows.docs.forEach(data => this.afStore.doc(`project/${uid}/stage/${data.id}`).delete()));
      this.afStore.collection('project').doc(uid).delete();
      return [{
          type: AuthoringActions.DELETE_PROJECT,
          payload: uid
        },
        {
          type: AuthActions.DELETE_USER_PROJECT,
          payload: uid
        }];
    })
  );

  @Effect()
  deleteStage = this.action$
    .ofType(AuthoringActions.TRY_DELETE_STAGE)
    .pipe(
      map((action: AuthoringActions.TryDeleteStage) => action.payload),
      mergeMap((deleteDataSet: {uid: string, stageName: string, index: number}) => {
        this.afStore.doc(`project/${deleteDataSet.uid}/stage/${deleteDataSet.stageName}`).delete();
        return [{
          type: AuthoringActions.DELETE_STAGE,
          payload: deleteDataSet
        }];
      })
    );
@Effect()
setProjectSideInfo = this.action$
  .ofType(AuthoringActions.SET_PROJECT_SIDE_INFO)
  .pipe(
    map((action: AuthoringActions.SetProjectSideInfo) => action.payload.index),
    mergeMap((index: number) => {
      return [{
        type: AuthoringActions.SET_EDIT_PROJECT_INDEX,
        payload: index
      }];
    })
  );

@Effect()
setStageIndexSideInfo = this.action$
  .ofType(AuthoringActions.SET_STAGE_SIDE_INFO)
  .pipe(
    map((action: AuthoringActions.SetStageSideInfo) => action.payload.index),
    mergeMap((index: number) => {
      return [{
        type: AuthoringActions.SET_EDIT_STAGE_INDEX,
        payload: index
      }];
    })
  );
@Effect()
loadStagesData = this.action$
    .ofType(AuthoringActions.TRY_LOAD_STAGES_DATA)
    .pipe(
      map((action: AuthoringActions.TryLoadStagesData) => action.payload),
      switchMap((uid: string) => {
        const stagesPromise = new Promise((resolve, reject) => {
          this.afStore.collection(`project/${uid}/stage`).valueChanges()
            .subscribe(data => {
              data.map(stage => {
                stage['lastModify'] = stage['lastModify'].toDate();
                stage['createDate'] = stage['createDate'].toDate();
              });
              resolve(data);
            });
        });
        return stagesPromise.then((stagesState: StagesState[]) => stagesState);
      }),
      mergeMap((stagesData: StagesState[]) => {
        return [
          {
            type: AuthoringActions.INITIAL_PROJECT_INFO
          },
          {
            type: AuthoringActions.INITIAL_STAGE_INFO
          },
          {
            type: AuthoringActions.SET_EDIT_MODE_STATE,
            payload: 'STAGE_STATE'
          },
          {
            type: AuthoringActions.LOAD_STAGES_DATA,
            payload: stagesData
          },
          {
            type: AuthoringActions.SET_STAGE_LOADED_STATE,
            payload: true
          }
        ];
      })
    );
@Effect()
loadProjectsData = this.action$
  .ofType(AuthoringActions.TRY_LOAD_PROJECTS_DATA)
  .pipe(
    map((action: AuthoringActions.TryLoadProjectsData) => action.payload),
    switchMap((data: UserDataState) => {
      const projectPromise = new Promise((resolve, reject) => {
        this.afStore.collection('project').valueChanges()
          .subscribe(projects => {
            resolve(projects.filter(project => data['project'].find(projectIndex => project['uid'] === projectIndex))
                            .map(row => {
                              row['lastModify'] = row['lastModify'].toDate();
                              row['createDate'] = row['createDate'].toDate();
                              return row;
                            }));
        });
      });
      return projectPromise.then((projects: ProjectState[]) => projects);
    }),
    mergeMap((projects: ProjectState[]) => {
      return [
        {
          type: AuthoringActions.LOAD_PROJECTS_DATA,
          payload: projects
        },
        {
          type: AuthoringActions.SET_PROJECTS_LOADED_STATE,
          payload: true
        }
      ];
    })
  );
  genUid() {
    const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    let id = '', i = 4;
    const charSet = [{min: 48, max: 57}, {min: 65, max: 90}, {min: 97, max: 122}];
    while (i !== 0) {
      const range = charSet[random(0, 2)];
      id += String.fromCharCode(random(range['min'], range['max']));
      i--;
    }
    return id;
  }

constructor(private action$: Actions,
            public afStore: AngularFirestore) {}
}
