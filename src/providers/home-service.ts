import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import firebase from 'firebase';
import { AngularFire, FirebaseListObservable,FirebaseObjectObservable} from 'angularfire2';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
/*
  Generated class for the HomeService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class HomeService {
Products: FirebaseListObservable<any>;
saletransaction: FirebaseListObservable<any>;

  constructor(public http: Http, private af: AngularFire) {
    console.log('Hello AnalyticsService Provider');
    this.Products = af.database.list('/Products');
      this.saletransaction=af.database.list('/saletrxn/trxn/saledetails/');
  }
  
settrxnPerSalesPerson(trxndata,frmarray,userid){   
    var pidarray=[];
    var fmap={};
    var tstamp=trxndata.timestamp;
    for (var count=0;count<frmarray.length;count++){
       //pidarray = fmap((tstamp, count) => ({ [frmarray.at(count).get('productid').value]: tstamp }));
       const key = frmarray.at(count).get('productid').value;
    fmap = { [key] : tstamp};
    pidarray.push(fmap);
    };
    var amap={[userid]:pidarray};
    //console.log("amap"+amap);
    return(amap);
}
//*****************************************************************************
settrxnPerproduct(trxndata){
}

//*****************************************************************************

// *******************************************************************************
}
