import { Component,OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable,FirebaseObjectObservable} from 'angularfire2';
import { NavController,ToastController } from 'ionic-angular';
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Geolocation } from 'ionic-native'; /* in index.html add   <script src="http://maps.google.com/maps/api/js"></script> */
//import { AnalyticsPage } from '../pages/analytics/analytics';
import firebase from 'firebase';
import { AuthData } from '../../providers/auth-data';
import {LoginPage} from '../../pages/login/login';
import { EmailValidator } from '../../validators/email';
//import {HomeService} from '../../providers/home-service';
/*import * as firebase from 'firebase';  to get timestamp. Also open src/typings.d.ts and add: declare namespace firebase.database.ServerValue {   let TIMESTAMP: any;}*/
@Component({
   
  selector: 'page-home',
  templateUrl: 'home.html',
//providers:[HomeService]
})
export class HomePage implements OnInit{
public myForm: FormGroup; // our form model
Products: FirebaseListObservable<any>;
saletransaction: FirebaseListObservable<any>;

productObject:FirebaseObjectObservable<any>;
Lat:number;
Long:number;
productList: any;
loadedproductList: any;
productref:any;
currentUser:any;
trxnPerSalesPerson:any;
salesteam:any;
currentUserid:any;
  constructor(public navCtrl: NavController,private _fbr:FormBuilder,public af: AngularFire,public toastCtrl: ToastController,public authData: AuthData) {
      this.Products = af.database.list('/Products');
      this.saletransaction=af.database.list('/saletrxn/');

      this.salesteam=af.database.list('/userProfile');
      /* for autocomplete*/
      this.productref = firebase.database().ref('/Products');
      this.productref.on('value', productList => {
                        let items = [];
                        let pids=[];
                            productList.forEach( prod => {
                                                  items.push(prod.val());
                                                  pids.push(prod.$key);
                                                          });
                        this.productList = items
                        this.loadedproductList = items;
                     
                        });
     /* auto complete end */
   this.currentUser =this.authData.getUser();
   this.currentUserid=this.currentUser.uid;
   
       Geolocation.getCurrentPosition().then((position) => {
                    this.Lat= position.coords.latitude;
                    this.Long= position.coords.longitude;}
                    , (err) => {
      console.log(err.message);});
      
    
  }
ngOnInit() {
    
        
    // we will initialize our form here
    this.myForm = this._fbr.group({
            custname: ['', [Validators.required, Validators.minLength(3)]],
            saledetails:this._fbr.array([this.initsaledetails()]),
            contactnum:['',Validators.minLength(10)],
            email:['',EmailValidator.isValid],
            custcat:[''],
            model:[''],
            custpay:[''],
           
        });

  
            }
    initsaledetails() {
        // initialize our saledetails
        return this._fbr.group({
            // productmake:[{value:null ,disabled:true}],
          //  searchTerm:[,[Validators.required, Validators.minLength(3)]],
            prodqty: [,Validators.required], 
            productid:[],
            productprice:[]
           
        });
    }
    
      

getTotal(){
    var group = this.myForm as FormGroup;
    var array = group.controls['saledetails'] as FormArray;
    var total=0;
    var price =0;
var makekey;
var qty=0;
    
    for (var n=0;n< array.length;n++){
        makekey=array.at(n).get('productid').value;
        qty=array.at(n).get('prodqty').value*1;
        price=array.at(n).get('productprice').value*1;
      total += (price*  qty);
        
        /*price = this.Products.orderByChild("Make").equalTo(array.at(n).get('prodqty').value)*1;
        
      //pricelist=this.af.database.object('/Products/'+makekey,{ preserveSnapshot: true} ).subscribe(product =>{price = product.val().Price*1;subtotal = price*qty;});
        
        this.productObject = this.af.database.object('/Products/'+ makekey ,{ preserveSnapshot: true})
        this.productObject.subscribe(snapshot => { 
        var priceOBJ = snapshot.val(); 
        if (priceOBJ){
                    price=priceOBJ.Price*1;
                    subtotal = price*  qty;
}
    });
    
        total+=subtotal;     */    
    };
    return total;
}
 itemSelected(i:number,product) {
     
        var group = this.myForm as FormGroup;
        var array = group.controls['saledetails'] as FormArray;
        array.at(i).get('searchTerm').reset(null);
       array.at(i).get('productid').patchValue(product.$key,{onlySelf: true});
        array.at(i).get('productmake').patchValue(product.Make,{onlySelf: true});     
  }
  
 addsaledetails(i: number) {
        const control = <FormArray>this.myForm.controls['saledetails'];
        
        const addCtrl = this.initsaledetails();
        
        control.push(addCtrl);
        
        /* subscribe to individual saledetails value changes */
        // addrCtrl.valueChanges.subscribe(x => {
        //   console.log(x);;
        // })
    }

    removesaledetails(i: number) {
        const control = <FormArray>this.myForm.controls['saledetails'];
        control.removeAt(i);
    }
    getsubTotal(n:number){
        var group = this.myForm as FormGroup;
        var array = group.controls['saledetails'] as FormArray;
        var subtotal =0;
        var makekey;
        var qty;
        var price=0;
        
            makekey=array.at(n).get('productid').value;
            qty=array.at(n).get('prodqty').value*1;
            this.productObject = this.af.database.object('/Products/'+ makekey ,{ preserveSnapshot: true});
            this.productObject.subscribe(snapshot => { 
            var priceOBJ = snapshot.val(); 
            if (priceOBJ){
                        price=priceOBJ.Price*1;
                        array.at(n).get('productprice').patchValue(price);
                        subtotal = price*  qty;
    }
        });
        return subtotal;
}


initializeItems(){
  this.productList = this.loadedproductList;
}
getProducts(searchTerm) {
  // Reset items back to all of the items

  this.initializeItems();

  // set q to the value of the searchbar
  var q = searchTerm.srcElement.value;


  // if the value is an empty string don't filter the items
  if (!q) {
    return;
  }

  this.productList = this.productList.filter((v) => {
     if(v.Make && q) {
      if (v.Make.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
      }
     
      return false;
    }
   });

  //console.log(q, this.productList.length);

}

    save() {
        //let dateNow = firebase.database.ServerValue.TIMESTAMP;
  var curruser=this.currentUser.email;
  var currid=   this.currentUserid;
 var timestamp =Date.now();
 var trxntotal=this.getTotal();

 /* var trxndata={
      [currid]:{salesperson:curruser,
      latitude:this.Lat,
      longitude:this.Long,
      timestamp:timestamp,
      trxnvalue:trxntotal,
      trxndetails:this.myForm.value
      } 
  };*/
  var trxndata={
      salesperson:curruser,
      salepersonid:currid,
      latitude:this.Lat,
      longitude:this.Long,
      timestamp:timestamp,
      trxnvalue:trxntotal,
      trxndetails:this.myForm.value
      } ;
   
  
  this.saletransaction=this.af.database.list('/saletrxn/'+currid);
     var pushref = this.saletransaction.push(trxndata);
  
   //key = this.saletransaction.push({[currid]:{timeofsale:timestamp,salevalue:trxntotal}});
     if(pushref){
         this.trxnPerSalesPerson=this.af.database.list('/trxnPerSalesPerson/');
         
         var trxnmetadata={[currid]:{[pushref.key]:true,
         trxnvalue:trxntotal,
      timestamp:timestamp,
         }};
         var key1=this.trxnPerSalesPerson.push(trxnmetadata);
    //hsrvcs.settrxnPerproduct(trxndata);
                if (key1){
                let toast = this.toastCtrl.create({ message: 'Sale Saved Successfully', duration: 2000,position:'bottom' }); 
                toast.onDidDismiss(() => { this.navCtrl.setRoot(HomePage); })
                toast.present();
                        }
                };
  }
    
    
logOut(){
  this.authData.logoutUser().then(() => {
    this.navCtrl.setRoot(LoginPage);
  });
}


}