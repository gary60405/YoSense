import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ShareService {

  constructor() { }
  progressBarSubject = new Subject<boolean>();
  displayStepArray = [false, false, false, false, false];
}
