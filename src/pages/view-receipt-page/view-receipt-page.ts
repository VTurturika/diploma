import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ViewReceiptPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
// @IonicPage()
@Component({
  selector: 'page-view-receipt-page',
  templateUrl: 'view-receipt-page.html',
})
export class ViewReceiptPage {
  receipt: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log("navparams");
    console.log(navParams);
    this.receipt = navParams.get('receipt');
    console.log("view page");
    console.log(this.receipt);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewReceiptPage');
  }

}
