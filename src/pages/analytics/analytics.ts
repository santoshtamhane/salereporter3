import { Component,OnInit } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { HomePage } from '../pages/home/home';
import {AnalyticsService} from '../../providers/analytics-service';
import { AngularFire, FirebaseListObservable,FirebaseObjectObservable} from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import { AuthData } from '../../providers/auth-data';
/*
  Generated class for the Analytics page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-analytics',
  templateUrl: 'analytics.html',
  providers:[AnalyticsService]
})

export class AnalyticsPage implements OnInit{
    items: Observable<any>;
  cartTotal: Observable<any>;
  currentUserid:any;
currentUser:any;
  constructor(public navCtrl: NavController,public af: AngularFire, private anltService: AnalyticsService,public authData: AuthData) {
this.currentUser =this.authData.getUser();
   this.currentUserid=this.currentUser.uid;
  }
  ngOnInit() {
         
  }
  
  ionViewDidLoad() {
  //  console.log('ionViewDidLoad AnalyticsPage');
  }
  
  getTodaySale(){
  return 200;
  };
  
  } // class ends here
