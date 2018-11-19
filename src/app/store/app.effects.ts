import { UserDataState } from './../model/auth/auth.model';
import { map, switchMap, mergeMap, take } from 'rxjs/operators';
import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as AppActions from './app.actions';
import * as AuthActions from './../auth/store/auth.actions';
import * as HeaderActions from './../header/store/header.actions';
import * as ManipulationActions from './../manipulation/store/manipulation.actions';
import * as ManagementActions from './../authoring/management/store/management.actions';
import * as AuthoringStageActions from './../authoring/edit/store/authoringStage.actions';
import { ProjectState, StagesState } from './../model/authoring/management.model';
import { AddProjectState, AddStageState, DeleteStageState, JoinProjectSetState, DeleteProjectState } from '../model/selector/selector.model';
@Injectable()
export class AppEffects {

@Effect()
tryAddProjectEffects = this.action$
  .ofType(AppActions.TRY_ADD_PROJECT)
  .pipe(
    map((action: AppActions.TryAddProject) => action.payload),
    switchMap((addProjectData: AddProjectState) => {
      const addPorjectPromise = new Promise((resolve, reject) => {
        const submit = uid => {
          this.afStore.collection('project').doc(uid).ref.get()
          .then(response => {
            if (response.data() === undefined) {
              addProjectData.projectData.uid = uid;
              addProjectData.projectData.createDate = new Date();
              addProjectData.projectData.lastModify = new Date();
              addProjectData.projectData.author = addProjectData.email;
              addProjectData.project.push(addProjectData.projectData.uid);
              this.afStore.doc(`user/${addProjectData.email}`).update({project: addProjectData.project});
              this.afStore.doc(`project/${addProjectData.projectData.uid}`).set(addProjectData.projectData).then(() => resolve(addProjectData));
            } else {
              submit(this.genUid());
            }
          })
          .catch(err => console.log(err));
        };
        submit(this.genUid());
      });
      return addPorjectPromise.then((data: AddProjectState) => data);
    }),
    mergeMap((addProjectData: AddProjectState) => {
      return [
        {
          type: AuthActions.UPDATE_USER_PROJECT,
          payload: addProjectData.project
        },
        {
          type: AppActions.ADD_PROJECT,
          payload: addProjectData.projectData
        }
    ];
    })
  );

@Effect()
tryAddStageEffects = this.action$
  .ofType(AppActions.TRY_ADD_STAGE)
  .pipe(
    map((action: AppActions.TryAddStage) => action.payload),
    switchMap((addStageData: AddStageState) => {
      const addStagePromise = new Promise((resolve, reject) => {
        const submit = uid => {
          this.afStore.doc(`project/${addStageData.projectUid}/stage/${uid}`).ref.get()
          .then(response => {
            if (response.data() === undefined) {
              addStageData.stageData.uid = uid;
              addStageData.stageData.order = addStageData.stagesLength;
              addStageData.stageData.createDate = new Date();
              addStageData.stageData.lastModify = new Date();
              addStageData.stageData.stageData = {
                bindingData: [],
                blocklyData: [],
                conditionData: [],
                diveData: {inValue: [], outValue: []},
                diveId: '',
                passcondition: [],
                hierarchyData: []
              };
              this.afStore.doc(`project/${addStageData.projectUid}/stage/${uid}`).set(addStageData.stageData).then(() => resolve(addStageData));
            } else {
              submit(this.genUid());
            }
          })
          .catch(err => console.log(err));
        };
        submit(this.genUid());
      });
      return addStagePromise.then((data: AddStageState) => data);
    }),
    mergeMap((addStageData: AddStageState) => {
      return [{
        type: AppActions.ADD_STAGE,
        payload: addStageData.stageData
      }];
    })
  );

@Effect()
tryDeleteProjectEffects = this.action$
  .ofType(AppActions.TRY_DELETE_PROJECT)
  .pipe(
    map((action: AppActions.TryDeleteProject) => action.payload),
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
      this.afStore.collection(`project/${uid}/stage`).get()
        .pipe(take(1))
        .subscribe(rows => rows.docs.forEach(data => this.afStore.doc(`project/${uid}/stage/${data.id}`).delete()));
      this.afStore.doc(`project/${uid}`).delete();
      return [{
          type: AppActions.DELETE_PROJECT,
          payload: uid
        },
        {
          type: AuthActions.DELETE_USER_PROJECT,
          payload: uid
        }];
    })
  );

  @Effect()
  tryDeleteStageEffects = this.action$
    .ofType(AppActions.TRY_DELETE_STAGE)
    .pipe(
      map((action: AppActions.TryDeleteStage) => action.payload),
      mergeMap((deleteDataSet: DeleteStageState) => {
        this.afStore.doc(`project/${deleteDataSet.projectUid}/stage/${deleteDataSet.stageUid}`).delete();
        return [{
          type: AppActions.DELETE_STAGE,
          payload: deleteDataSet
        }];
      })
    );
@Effect()
trySetProjectSideInfoEffects = this.action$
  .ofType(AppActions.SET_PROJECT_SIDE_INFO)
  .pipe(
    map((action: AppActions.SetProjectSideInfo) => action.payload.index),
    mergeMap((index: number) => {
      return [{
        type: AppActions.SET_EDIT_PROJECT_INDEX,
        payload: index
      }];
    })
  );

@Effect()
trySetStageIndexSideInfoEffects = this.action$
  .ofType(AppActions.SET_STAGE_SIDE_INFO)
  .pipe(
    map((action: AppActions.SetStageSideInfo) => action.payload.index),
    mergeMap((index: number) => {
      return [{
        type: AppActions.SET_EDIT_STAGE_INDEX,
        payload: index
      }];
    })
  );

@Effect()
tryLoadStagesDataEffects = this.action$
    .ofType(AppActions.TRY_LOAD_STAGES_DATA)
    .pipe(
      map((action: AppActions.TryLoadStagesData) => action.payload),
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
            type: AppActions.INITIAL_PROJECT_INFO
          },
          {
            type: AppActions.INITIAL_STAGE_INFO
          },
          {
            type: AppActions.SET_EDIT_MODE_STATE,
            payload: 'STAGE_STATE'
          },
          {
            type: AppActions.LOAD_STAGES_DATA,
            payload: stagesData
          },
          {
            type: AppActions.SET_STAGE_LOADED_STATE,
            payload: true
          }
        ];
      })
    );
@Effect()
tryLoadProjectsDataEffects = this.action$
  .ofType(AppActions.TRY_LOAD_PROJECTS_DATA)
  .pipe(
    map((action: AppActions.TryLoadProjectsData) => action.payload),
    switchMap((userData: UserDataState) => {
      this.afStore.doc(`user/${userData.email}`).valueChanges().pipe(take(1))
          .subscribe((res: UserDataState) => {
            res.project.forEach(data => {
              this.afStore.doc(`project/${data}`).valueChanges().pipe(take(1))
                .subscribe(projectData => {
                  if (projectData === undefined) {
                    const index = res.project.indexOf(data);
                    res.project.splice(index, 1);
                    this.afStore.doc(`user/${userData.email}`).update(res);
                  }
                });
            });
          });
      const projectPromise = new Promise(resolve => {
        this.afStore.collection('project').valueChanges()
          .subscribe(projects => {
            resolve(projects.filter(project => userData['project'].find(projectIndex => project['uid'] === projectIndex))
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
          type: AppActions.LOAD_PROJECTS_DATA,
          payload: projects
        },
        {
          type: AppActions.SET_PROJECTS_LOADED_STATE,
          payload: true
        }
      ];
    })
  );

  @Effect()
  tryAddUserProjectEffect = this.action$
  .ofType(AppActions.TRY_ADD_USER_PROJECT)
  .pipe(
    map((action: AppActions.TryAddUserProject) => action.payload),
    switchMap((joinProjectSet: JoinProjectSetState) => {
      joinProjectSet.userData.project.push(joinProjectSet.projectCode);
      this.afStore.collection('user').doc(joinProjectSet.userData.email).update(joinProjectSet.userData);
      const projectDataPromise = new Promise(resolve => {
        this.afStore.collection('project', ref => ref.where('uid', '==', joinProjectSet.projectCode)).get()
            .pipe(take(1))
            .subscribe(projectData => resolve(projectData.docs[0].data()));
      });
      return projectDataPromise.then(projectData => {
        return {
          joinProjectSet: joinProjectSet,
          project: projectData
        };
      });
    }),
    mergeMap((dataSet: {joinProjectSet: JoinProjectSetState, project: ProjectState}) => {
      return [
        {
          type: AuthActions.UPDATE_USER_PROJECT,
          payload: dataSet.joinProjectSet.userData.project
        },
        {
          type: AppActions.ADD_PROJECT,
          payload: dataSet.project
        }
      ];
    })
  );

  @Effect()
  tryDeleteUserProjectEffects = this.action$
  .ofType(AppActions.TRY_DELETE_USER_PROJECT)
  .pipe(
    map((action: AppActions.TryDeleteUserProject) => action.payload),
    mergeMap((deleteProjectSet: DeleteProjectState) => {
      this.afStore.doc(`user/${deleteProjectSet.email}`).valueChanges()
          .pipe(take(1))
          .subscribe(userInfo => {
            const index = userInfo['project'].indexOf(deleteProjectSet.uid);
            userInfo['project'].splice(index, 1);
            this.afStore.doc(`user/${deleteProjectSet.email}`).update({...userInfo});
          });
      return [
        {
          type: AuthActions.DELETE_USER_PROJECT,
          payload: deleteProjectSet.uid
        },
        {
          type: AppActions.DELETE_PROJECT,
          payload: deleteProjectSet.uid
        }
      ];
    })
  );

  @Effect()
  tryLogoutEffects = this.action$
  .ofType(AppActions.TRY_LOGOUT)
  .pipe(
    mergeMap(() => {
      return [
        {type: AppActions.INITAIL_APP_STATE},
        {type: AuthActions.INITAIL_AUTH_STATE},
        {type: AuthoringStageActions.INITAIL_AUTHORING_STAGE_STATE},
        {type: ManagementActions.INITAIL_MANAGEMENT_STATE},
        {type: ManipulationActions.INITAIL_MANIPULATION_STATE},
        {type: HeaderActions.INITAIL_STEP_DISPLAY_STATE},
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
