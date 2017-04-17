import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {ViewReceiptPage} from "../view-receipt-page/view-receipt-page";

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
})
export class ListingPage {

  items: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {

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

    this.items = [];
    this.items.push(item);
    this.items.push(item);
    this.items.push(item);
    console.log(this.items);
  }

  itemSelected(item) {
    this.navCtrl.push(ViewReceiptPage, {
      item: item
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListingPage');
  }
}
