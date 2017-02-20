import { Component,OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
//import { HomePage } from '../pages/home/home';
//import {AnalyticsService} from '../../providers/analytics-service';
import { AngularFire} from 'angularfire2';
//import { Observable } from 'rxjs/Observable';
import { AuthData } from '../../providers/auth-data';
import firebase from 'firebase';
/*
  Generated class for the Analytics page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-analytics',
  templateUrl: 'analytics.html',
 // providers:[AnalyticsService] add private anltService: AnalyticsService in constructor
})

export class AnalyticsPage implements OnInit{
    currentUserid:any;
currentUser:any;
result:any;
trxnlist:any;
trxnref:any;
  constructor(public navCtrl: NavController,public af: AngularFire,public authData: AuthData) {
this.currentUser =this.authData.getUser();
   this.currentUserid=this.currentUser.uid;
  
  }
  ngOnInit() {
         
  }
  
  ionViewDidLoad() {
  //  console.log('ionViewDidLoad AnalyticsPage');
  }
   gettotal(stime){
      var userid =this.currentUserid;
      var starttime;
     switch (starttime) {
                        case 1: //from today
                            var d = new Date();
                                d.setHours(0,0,0,0);
                            starttime=d.getTime();
                        break;
                        case 2: //from start of month
                            var firstDay = new Date(d.getFullYear(), d.getMonth(), 1);
                            starttime=firstDay.getTime();
      
                        }
    var subtotal=0;
     var trxnval=0;
this.trxnref=firebase.database().ref('saletrxn/'+userid).orderByChild('timestamp').startAt(starttime);
  this.trxnref.on('value', trxnlist => {
                    trxnlist.forEach(trxn => {
        if(trxn.val()){
      trxnval=trxn.val().trxnvalue*1;
      subtotal +=trxnval;
     // console.log("subtotal="+subtotal);
     }
    });
  });
        return subtotal;
 }

  } // class ends here
