import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

import { AppState } from '../../../model/app/app.model';
import * as AppActions from './../../../store/app.actions';
import * as AuthoringStageActions from './../../edit/store/authoringStage.actions';
import * as AuthoringManagementActions from './../store/management.actions';
import { ProjectState, StagesState } from '../../../model/authoring/management.model';
import { projectSideInfoSelector, selectedStageDataSelector, editModeSelector, stageSideInfoSelector } from './../../../store/app.selectors';
import { HttpClient, HttpHeaders, HttpEventType } from '@angular/common/http';
import { uploadProjectInfoSelector, uploadStageInfoSelector } from '../store/management.selectors';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-side-info',
  templateUrl: './side-info.component.html',
  styleUrls: ['./side-info.component.css']
})
export class SideInfoComponent implements OnInit {

  constructor(private store: Store<AppState>,
              private httpClient: HttpClient,
              private afStore: AngularFirestore) {
    this.editMode$ = store.select(editModeSelector);
    this.projectInfo$ = store.select(projectSideInfoSelector);
    this.stageInfo$ = store.select(stageSideInfoSelector);
  }
  editMode$: Observable<string>;
  projectInfo$: Observable<ProjectState>;
  stageInfo$: Observable<StagesState>;
  ngOnInit() {}
  sleep(ms: number) {
    return new Promise((resolve => setTimeout(() => resolve(), ms)));
  }
  onEditStage() {
    this.store
        .pipe(select(selectedStageDataSelector), take(1))
        .subscribe(selectedStage => {
          this.store.dispatch(new AuthoringStageActions.TryLoadSelectedStage(selectedStage));
          this.store.dispatch(new AppActions.InitailStageInfo());
        });
  }
  async uploadFile(event) {
    let mode = '';
    let token = '';
    let formData = new FormData();
    this.store.dispatch(new AuthoringManagementActions.SetToastDisplayState(true));
    await this.getEditMode().then((data: string) => mode = data);
    await this.getToken().then((data: string) => token = data);
    await this.getFileFormData(mode, event).then((data: FormData) => formData = data);
    this.uploadToImgur(mode, token, formData);
  }

  getEditMode() {
    return new Promise(resolve => this.editMode$.pipe(take(1)).subscribe(mode => resolve(mode)));
  }

  getFileFormData(mode: string, event) {
    return new Promise(resolve => {
      if (mode === 'PROJECT_MODE') {
        return this.store.pipe(select(uploadProjectInfoSelector), take(1))
          .subscribe((data: {email: string, uid: string}) => {
            const form = new FormData();
            form.append('image', <File>event.target.files[0]);
            form.append('title', `${data.email}的專案`);
            form.append('description', `上傳者：${data.email}\n專案編號：${data.uid}\n上傳時間：${this.getCurrentTime()}`);
            form.append('album', 'NvLeTiV');
            resolve(form);
          });
      }
      this.store.pipe(select(uploadStageInfoSelector), take(1))
          .subscribe((data: {email: string, projectUid: string, stageUid: string}) => {
            const form = new FormData();
            form.append('image', <File>event.target.files[0]);
            form.append('title', `${data.email}的關卡`);
            form.append('description', `上傳者：${data.email}\n專案編號：${data.projectUid}\n關卡編號：${data.stageUid}\n上傳時間：${this.getCurrentTime()}`);
            form.append('album', 'NvLeTiV');
            resolve(form);
          });
    });
  }

  getToken() {
    return new Promise(resolve => {
      this.afStore.collection('token').doc('imgur').valueChanges().pipe(take(1))
          .subscribe(res => resolve(res['token']));
    });
  }

  uploadToImgur(mode: string, token: string, formData: FormData) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).append('Accept', 'application/json');
    this.httpClient.post('https://api.imgur.com/3/image', formData, {headers: headers, observe: 'events', reportProgress: true})
        .subscribe(async (res) => {
          if (res.type === HttpEventType.UploadProgress) {
            const percentage = Math.round(res.loaded / res.total * 100);
            this.store.dispatch(new AuthoringManagementActions.UpdateToastContent(`已上傳${percentage}%...`));
            this.store.dispatch(new AuthoringManagementActions.SetUploadProgress(percentage));
            if (res.loaded === res.total) {
              this.store.dispatch(new AuthoringManagementActions.UpdateToastContent('已完成上傳！'));
              await this.sleep(5000);
              this.store.dispatch(new AuthoringManagementActions.SetToastDisplayState(false));
              this.store.dispatch(new AuthoringManagementActions.SetUploadProgress(0));
              this.store.dispatch(new AuthoringManagementActions.InitailToastContent);
            }
            return;
          }
          if (res.type === HttpEventType.Response) {
            return mode === 'PROJECT_MODE' ?
              this.store.dispatch(new AuthoringManagementActions.TryProjectUploadImage(res.body['data']['link']))
                : this.store.dispatch(new AuthoringManagementActions.TryStageUploadImage(res.body['data']['link']));
          }
        });
  }

  getCurrentTime() {
    const now = new Date();
    return `${now.getFullYear()}年 ${now.getMonth() + 1}月 ${now.getDate()}日 ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
  }
}
