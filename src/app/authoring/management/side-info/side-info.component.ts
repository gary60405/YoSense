import { TokenData } from './../../../model/authoring/side-info.model';
import { Observable, of } from 'rxjs';
import { take, catchError } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

import { AppState } from '../../../model/app/app.model';
import * as AppActions from './../../../store/app.actions';
import * as AuthoringStageActions from './../../edit/store/authoringStage.actions';
import * as AuthoringManagementActions from './../store/management.actions';
import { ProjectState, StagesState } from '../../../model/authoring/management.model';
import { projectSideInfoSelector, selectedStageDataSelector, editModeSelector, stageSideInfoSelector } from './../../../store/app.selectors';
import { HttpClient, HttpHeaders, HttpEventType, HttpEvent } from '@angular/common/http';
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
  tempEvent: any;
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
    let mode = '', token = '';
    let formData = new FormData();
    this.tempEvent = event;
    this.store.dispatch(new AuthoringManagementActions.SetToastDisplayState(true));
    await this.getEditMode().then((data: string) => mode = data);
    await this.getTokenData().then((data: TokenData) => token = data.access_token);
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
            const formData = new FormData();
            formData.append('image', <File>event.target.files[0]);
            formData.append('title', `${data.email}的專案`);
            formData.append('description', `上傳者：${data.email}\n專案編號：${data.uid}\n上傳時間：${this.getCurrentTime()}`);
            formData.append('album', 'NvLeTiV');
            resolve(formData);
          });
      }
      this.store.pipe(select(uploadStageInfoSelector), take(1))
          .subscribe((data: {email: string, projectUid: string, stageUid: string}) => {
            const formData = new FormData();
            formData.append('image', <File>event.target.files[0]);
            formData.append('title', `${data.email}的關卡`);
            formData.append('description', `上傳者：${data.email}\n專案編號：${data.projectUid}\n關卡編號：${data.stageUid}\n上傳時間：${this.getCurrentTime()}`);
            formData.append('album', 'NvLeTiV');
            resolve(formData);
          });
    });
  }

  getTokenData() {
    return new Promise(resolve => {
      this.afStore.collection('token').doc('imgur').valueChanges().pipe(take(1))
          .subscribe(res => resolve(res));
    });
  }

  async uploadToImgur(mode: string, token: string, formData: FormData) {
    await this.deleteCurrentCover(mode);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).append('Accept', 'application/json');
    this.httpClient.post('https://api.imgur.com/3/image', formData, {headers: headers, observe: 'events', reportProgress: true})
      .pipe(catchError(res => of({type: -1, body: res['error']['data']['error']})))
      .subscribe(async (res: HttpEvent<HttpEventType>) => {
        if (res.type === -1) {
          return this.processError(res['body']);
        }
        if (res.type === HttpEventType.UploadProgress) {
          return this.processProgress(res);
        }
        if (res.type === HttpEventType.Response) {
          return this.processResponse(mode, res);
        }
  });
  }

  async deleteCurrentCover(mode: string) {
    return new Promise(resolve => {
      this.store.pipe(select(mode === 'PROJECT_MODE' ? projectSideInfoSelector : stageSideInfoSelector))
          .pipe(take(1))
          .subscribe(async data => {
            let token = '';
            await this.getTokenData().then(res => token = res['access_token']);
            const imgHash = data['coverImg'].split('/')[3].split('.')[0];
            if (imgHash === 'yUti2d2') {
              return;
            }
            const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
            this.httpClient.delete(`https://api.imgur.com/3/image/${imgHash}`, {headers: headers})
                .pipe(catchError(res => of()))
                .subscribe(res => resolve(res));
          });

    });
  }

  async processError(msg: string) {
    this.httpClient.post(`https://us-central1-yosense-de69d.cloudfunctions.net/sendErrorMail?msg=${msg}`, {})
        .pipe(take(1), catchError(res => of(res))).subscribe(res => res);
    if (msg === 'The access token provided is invalid.') {
      let mode = '', token = '';
      let formData: FormData;
      await this.getEditMode().then((data: string) => mode = data);
      await this.applyToken().then((data: string) => token = data);
      await this.getFileFormData(mode, this.tempEvent).then((data: FormData) => formData = data);
      await this.deleteCurrentCover(mode);
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).append('Accept', 'application/json');
      this.httpClient.post('https://api.imgur.com/3/image', formData, {headers: headers, observe: 'events'})
          .subscribe((res: HttpEvent<HttpEventType>) => {
            if (res.type === HttpEventType.Response) {
              this.processResponse(mode, res);
            }
          });
    }
  }

   applyToken() {
    return new Promise(async resolve => {
      let tokenData: TokenData;
      await this.getTokenData().then((data: TokenData) => tokenData = data);
      const formData = new FormData();
      formData.append('refresh_token', tokenData.refresh_token);
      formData.append('client_id', tokenData.client_id);
      formData.append('client_secret', tokenData.client_secret);
      formData.append('grant_type', 'refresh_token');
      this.httpClient.post('https://api.imgur.com/oauth2/token', formData)
          .subscribe(async res => {
            await this.afStore.collection('token').doc('imgur').update({access_token: res['access_token'], refresh_token: res['refresh_token']});
            resolve(res['access_token']);
          });
    });
  }

  async processProgress(res: HttpEvent<HttpEventType>) {
    const percentage = Math.round(res['loaded'] / res['total'] * 100);
    this.store.dispatch(new AuthoringManagementActions.UpdateToastContent(`已上傳${percentage}%...`));
    this.store.dispatch(new AuthoringManagementActions.SetUploadProgress(percentage));
    if (res['loaded'] === res['total']) {
      this.store.dispatch(new AuthoringManagementActions.UpdateToastContent('已完成上傳！'));
      await this.sleep(5000);
      this.store.dispatch(new AuthoringManagementActions.SetToastDisplayState(false));
      this.store.dispatch(new AuthoringManagementActions.SetUploadProgress(0));
      this.store.dispatch(new AuthoringManagementActions.InitailToastContent);
    }
  }

  processResponse(mode: string, res: HttpEvent<HttpEventType>) {
    if (mode === 'PROJECT_MODE') {
      return this.store.dispatch(new AuthoringManagementActions.TryProjectUploadImage(res['body']['data']['link']));
    }
    this.store.dispatch(new AuthoringManagementActions.TryStageUploadImage(res['body']['data']['link']));
  }

  getCurrentTime() {
    const now = new Date();
    return `${now.getFullYear()}年 ${now.getMonth() + 1}月 ${now.getDate()}日 ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
  }
}
