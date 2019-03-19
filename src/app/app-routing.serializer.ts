import * as fromRouter from '@ngrx/router-store';
import { RouterStateUrl } from './model/app/app.model';
import { RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

export class CustomSerializer implements fromRouter.RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    const { url } = routerState;
    const { queryParams } = routerState.root;

    let state: ActivatedRouteSnapshot = routerState.root;
    while (state.firstChild) {
      state = state.firstChild;
    }

    const { params } = state;

    return { url, queryParams, params};
  }
}
