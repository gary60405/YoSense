import { AuthEffects } from './auth/store/auth.effects';
import { reducers } from './store/app.reducers';
import { NgModule } from '@angular/core';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
// import { HeaderComponent } from './header/header.component';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { environment } from '../environments/environment';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AuthoringEffects } from './authoring/store/authoring.effects';

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
    EffectsModule.forRoot([AuthEffects, AuthoringEffects]),
    StoreRouterConnectingModule,
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
