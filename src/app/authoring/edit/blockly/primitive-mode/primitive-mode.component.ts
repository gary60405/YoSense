import * as AuthoringActions from './../../../edit/store/authoringStage.actions';

import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { toolbox, categoryName } from './../js/toolbox';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../../model/app/app.model';
import { take } from 'rxjs/operators';
import { ToolBoxStateSelector } from '../store/blockly.selectors';
import { BlocklyService } from '../blockly.service';

@Component({
  selector: 'app-primitive-mode',
  templateUrl: './primitive-mode.component.html',
  styleUrls: ['./primitive-mode.component.css']
})
export class PrimitiveModeComponent implements OnInit {

  constructor(private store: Store<AppState>,
              private blocklyService: BlocklyService) { }

  toolBox: {};
  categoryName = [];
  isSpinerDisplay = false;

  @Output() preview = new EventEmitter<string>();

  ngOnInit() {
    setTimeout(() => this.isSpinerDisplay = true, 300);
    this.categoryName = categoryName;
    this.store.pipe(select(ToolBoxStateSelector), take(1)).subscribe(toolboxState => {
      this.toolBox = JSON.parse(JSON.stringify(toolbox));
      toolboxState.forEach(blockState => this.toolBox[blockState.category].find(block => block.data === blockState.data).selected = true);
    });
    this.blocklyService.injectWorkspace('blocklyPreviewer1');
  }

  togglePrimitiveBlock(category: string, index: number) {
    this.toolBox[category][index].selected = !this.toolBox[category][index].selected;
    this.toolBox[category][index].selected ?
      this.store.dispatch(new AuthoringActions.AddCategoryBlock({category: category, data: this.toolBox[category][index].data}))
      : this.store.dispatch(new AuthoringActions.DeleteCategoryBlock({category: category, data: this.toolBox[category][index].data}));
  }

  previewPrimitiveBlock(blockData: string) {
    this.preview.emit(blockData);
  }

}
