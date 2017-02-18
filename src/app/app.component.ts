import { Component, ViewChild ,NgZone} from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { AnalyticsPage } from '../pages/analytics/analytics';
import firebase from 'firebase';
 
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
 
  rootPage : any;
 zone: NgZone;

  pages: Array<{title: string, component: any,icon:string}>;
 currentuser:any;
  constructor(public platform: Platform) {
      this.zone = new NgZone({});
     firebase.initializeApp({
      apiKey: "AIzaSyDr3iH5ZWDYl_Xg8zwxkmSQWPr5oGJdetg",
    authDomain: "salerporter1.firebaseapp.com",
    databaseURL: "https://salerporter1.firebaseio.com",
    storageBucket: "salerporter1.appspot.com",
    messagingSenderId: "6947372782"
    });
    const unsubscribe = firebase.auth().onAuthStateChanged((user)=> {
      this.zone.run( () => {
        if (!user) {
          this.rootPage = LoginPage;
          unsubscribe();
        } else { 
          this.rootPage = HomePage;
          this.currentuser=user;
          unsubscribe();
        }
      });     
    });
    this.initializeApp();
 
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Sale Details', component: HomePage,icon:'create' },
      { title: 'Analytics', component: AnalyticsPage,icon:'trending-up' }
    ];
 
  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
 
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}