import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { AnalyticsPage } from '../pages/analytics/analytics';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { SignupPage } from '../pages/signup/signup';
import {AuthData} from '../providers/auth-data';


import { ReactiveFormsModule } from '@angular/forms';
// Import the AF2 Module
import { AngularFireModule } from 'angularfire2';
import firebase from 'firebase';

import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
// Observable class extensions
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/concat';

const cloudSettings: CloudSettings = {
  core: {
    app_id: '38d6fbe6'
  }
};

export const firebaseConfig = {
  apiKey: "AIzaSyDr3iH5ZWDYl_Xg8zwxkmSQWPr5oGJdetg",
    authDomain: "salerporter1.firebaseapp.com",
    databaseURL: "https://salerporter1.firebaseio.com",
    storageBucket: "salerporter1.appspot.com",
    messagingSenderId: "6947372782"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AnalyticsPage,
    ResetPasswordPage,
    SignupPage,
    LoginPage
    
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
   // firebase.initializeApp(firebaseConfig),
    ReactiveFormsModule,
    CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
   MyApp,
    HomePage,
    AnalyticsPage,
    LoginPage,
    ResetPasswordPage,
    SignupPage
   
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, AuthData]
})
export class AppModule {}
