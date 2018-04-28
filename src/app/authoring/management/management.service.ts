import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AuthService } from '../../auth/auth.service';
@Injectable()
export class ManagementService {

  constructor(private afStore: AngularFirestore, private authService: AuthService) {}
  public editModeSubject = new Subject<boolean>();
  public projectDataSubject = new Subject<{}[]>();
  public stageDataSubject = new Subject<{}[]>();
  public editProjectIndex = -1;
  public editStageIndex = 0;
  public sideInfo = {};
  public projectDataArray = [];
  public stageDataArray = [];
  updateStageProject(stageData) {
    const uid = this.projectDataArray[this.editProjectIndex]['uid'];
    const name = this.stageDataArray[this.editStageIndex]['name'];
    this.afStore.collection('project').doc(uid).collection('stage').doc(name).update(stageData);
  }
  getStageData() {
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
  addStageData(stageData) {
    const uid = this.projectDataArray[this.editProjectIndex]['uid'];
    this.afStore.collection('project').doc(uid).collection('stage').doc(stageData['name']).set(stageData);
  }
  deleteStageData(index) {
    const stageData = this.stageDataArray[index];
    const uid = this.projectDataArray[this.editProjectIndex]['uid'];
    this.afStore.collection('project').doc(uid).collection('stage').doc(stageData['name']).delete();
  }
  addProjectData(projectData) {
    const submit = uid => {
      this.afStore.collection('project').doc(uid).ref.get()
        .then(res => {
          if (res.data() === undefined) {
            projectData['uid'] = uid;
            projectData['createDate'] = new Date();
            projectData['lastModify'] = new Date();
            projectData['author'] = this.authService.getUserInfo()['email'];
            this.authService.addUserProject(uid);
            return this.afStore.collection('project').doc(uid).set(projectData);
          }
          submit(this.genUid());
        })
        .catch(err => {
          console.log(err);
        });
    };
    submit(this.genUid());
  }
  deleteProjectData(uid) {
    this.afStore.collection('project').doc(uid).delete();
  }
  genUid() {
    const random = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    let id = '';
    let i = 4;
    const charSet = [{min: 48, max: 57}, {min: 65, max: 90}, {min: 97, max: 122}];
    while (i !== 0) {
      const range = charSet[random(0, 2)];
      id += String.fromCharCode(random(range['min'], range['max']));
      i--;
    }
    return id;
  }
}
