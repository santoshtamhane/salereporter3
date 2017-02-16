import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Observable } from 'rxjs/Rx';
import firebase from 'firebase';
import { AngularFire, FirebaseListObservable,FirebaseObjectObservable} from 'angularfire2';
/*
  Generated class for the AnalyticsService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AnalyticsService {
Products: FirebaseListObservable<any>;
saletransaction: FirebaseListObservable<any>;
  constructor(public http: Http, private af: AngularFire) {
    console.log('Hello AnalyticsService Provider');
    this.Products = af.database.list('/Products');
      this.saletransaction=af.database.list('/saletrxn/trxn/saledetails/');
  }

getUsertrxnItems(): Observable<any> {
  return this.Products
    .map(trxns => {
      return trxns.map(item => {
        item.product = this.af.database.object('Products/${item.productid}');
        return item;
      });
    });
  }

 /* 
  trxnTotals(qty = 0, total = 0) {
    return this.saletransaction
      .switchMap(items => {
        return Observable.from(items)
        .mergeMap(trxn => {
          return this.af.database.object('Products/${trxn.productid}')
            .map(product => ({trxn, product}))
        })
        .scan((acc, val) => {
          acc.qty += val.trxn.prodqty;
          acc.total += val.trxn.prodqty * val.product.Price;
          return acc;
        }, {qty, total});
      })
  }
   ******************************************************************************************************************* 
  findProductKeysForGiventrxn(trxnId: string): Observable<string[]> {
 return this.af.database.list('saletrxn/trxn/saledetails/', {
    query: {
      orderByKey: true,
      equalTo: trxnId
    }
  })
    //.do(console.log)// Check whats coming,
    //.map(result => result[0])// might be needed
    .map(sci => sci.map(product => product.$key));
}
findProductKeysForAllTrxn(): Observable<string[]> {
 return this.af.database.list('saletrxn/trxn/saledetails/', {
    query: {
      orderByKey: true,
    }
  })
    //.do(console.log)// Check whats coming,
    //.map(result => result[0])// might be needed
    .map(sci => sci.map(product => product.$key));
}

findProductsForProductKeys(productKeys$: Observable<string[]>): Observable<Product[]> {
  return productKeys$
    .map(productKeys => productKeys.map(productKey => this.af.database.object('Products/${productid}')))
    .flatMap(prodObservables => Observable.combineLatest(prodObservables));
}


findAllProductsFortrxn(trxnId): Observable<Product[]> {
    //this fn gets your Products for a trxn
    return this.findProductsForProductKeys(this.findProductKeysFortrxn(trxnId));
}
}
******************************************************************************************************************************** */
}