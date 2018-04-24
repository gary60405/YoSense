import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ShareService {

  constructor() { }
  progressBarSubject = new Subject<boolean>();
}
