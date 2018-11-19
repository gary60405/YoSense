  import { AngularFirestore } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Subject } from 'rxjs';

@Injectable()
export class ChooseService {
  public editProjectIndex = 0;
  public editStageIndex = 0;
  public editMode: boolean;
  public sideInfo = {};
  public projectDataArray = [];
  public stageDataArray = [];
  public projectDataSubject = new Subject<{}[]>();
  public stageDataSubject = new Subject<{}[]>();
  constructor(private afStore: AngularFirestore, private authService: AuthService) { }
  getSatageData() {
    const uid = this.projectDataArray[this.editProjectIndex]['uid'];
    this.afStore.collection('project').doc(uid).collection('stage').valueChanges()
      .subscribe(data => {
        data.map(stage => {
          stage['lastModify'] = stage['lastModify'].toDate();
          stage['createDate'] = stage['createDate'].toDate();
        });
        this.stageDataArray = data;
        this.stageDataSubject.next(data);
    });
  }
  joinProject(code) {
    const userInfo = this.authService.getUserInfo();
    userInfo['project'].push(code);
    this.afStore.collection('user').doc(userInfo['email']).update(userInfo);
  }
  deleteProjectData(projectData) {
    const userInfo = this.authService.getUserInfo();
    projectData = projectData.map(project => project.uid);
    console.log(projectData);
    this.afStore.collection('user').doc(userInfo['email']).update({project: projectData});
  }

  getAllStageDataArray() {
    return this.stageDataArray.slice();
  }
  getStageDataArray() {
    console.log(this.stageDataArray, this.editStageIndex);
    return this.stageDataArray.slice()[this.editStageIndex]['stageData'];
  }
}
