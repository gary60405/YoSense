import { AuthEffects } from './auth/store/auth.effects';
import { reducers } from './store/app.reducers';
import { NgModule } from '@angular/core';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { environment } from '../environments/environment';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AuthoringStageEffects } from './authoring/edit/store/authoringStage.effects';
import { ManagementEffects } from './authoring/management/store/management.effects';
import { ManipulationEffects } from './manipulation/store/manipulation.effects';
import { AppEffects } from './store/app.effects';
import { BlocklyEffects } from './authoring/edit/blockly/store/blockly.effects';
import { BlocklyService } from './authoring/edit/blockly/blockly.service';
import { CustomSerializer } from './app-routing.serializer';

export const firebaseConfig = {
  apiKey: 'AIzaSyBoTwHjqBNIluVzQJUyHu2spnB2AtlkNY8',
  authDomain: 'yosense-de69d.firebaseapp.com',
  databaseURL: 'https://yosense-de69d.firebaseio.com',
  projectId: 'yosense-de69d',
  storageBucket: 'yosense-de69d.appspot.com',
  messagingSenderId: '1072783958907'
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    CoreModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([AuthEffects, ManagementEffects, AuthoringStageEffects, ManipulationEffects,   AppEffects, BlocklyEffects]),
    StoreRouterConnectingModule.forRoot({
      serializer: CustomSerializer
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [BlocklyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
