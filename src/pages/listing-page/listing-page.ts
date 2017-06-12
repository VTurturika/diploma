import { Component } from '@angular/core';
import {NavController, NavParams, LoadingController} from 'ionic-angular';
import {ViewReceiptPage} from "../view-receipt-page/view-receipt-page";
import {DataProvider} from "../../providers/dataprovider";

/**
 * Generated class for the ListingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
// @IonicPage()
@Component({
  selector: 'page-listing-page',
  templateUrl: 'listing-page.html',
  providers: [DataProvider],
})
export class ListingPage {

  public receipts: any[];

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public navParams: NavParams, public someData: DataProvider) {

    let item = {
      "receipt": {
        "date": "16.04.2017",
        "time": "13:12",
        "total": "72.03",
        "currency": "$",
        "items": [
          {"number": 1, "itemName": "oranges", "itemPrice": 13.12},
          {"number": 2, "itemName": "apples", "itemPrice": 33.12}
        ],
        "category": "electronics"
      }
    };

    this.receipts = [];

    let loader = this.loadingCtrl.create({
      content: 'Please wait...',
    });
    loader.present();
    this.someData.loadListing({}).then((data:any) => {
      loader.dismissAll();
      this.receipts = data.receipts;
    });
  }

  public doRefresh(refresher) {
    this.someData.loadListing({}).then((data:any) => {
      this.receipts = data.receipts;
      refresher.complete();
    });
  }

  public itemSelected(receipt : any) {
    console.log(`clicked on : + ${receipt}`);
    this.navCtrl.push(ViewReceiptPage, {
      receipt: receipt
    });
  };

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListingPage');
  }
}
