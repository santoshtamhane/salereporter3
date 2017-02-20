
export class AnalyticsService {

  constructor() {
              }
            
  /*getSaleItems(): Observable<any> {
  return this.af.database.list('Products')
    .map(carts => {
      return carts.map(item => {
        item.product = this.af.database.object('Products/${item.productid});
        return item;
      });});
  }
  
  cartTotals(qty = 0, total = 0) {
    return this.af.database.list('saletrxn')
      .switchMap(items => {
        return Observable.from(items)
        .mergeMap(cart => {
          return this.af.database.object('Products/${cart.productid}')
            .map(product => ({cart, product}))
        })
        .scan((acc, val) => {
          acc.qty += val.cart.prodqty;
          acc.total += val.cart.prodqty * val.product.price;
          return acc;
        }, {qty, total});
      })
  }*/
}