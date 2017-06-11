import { Component } from '@angular/core';
import {NavController, NavParams, AlertController} from 'ionic-angular';
import {ViewReceiptPage} from "../view-receipt-page/view-receipt-page";
import {TabsPage} from "../tabs/tabs";

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
// @IonicPage()
@Component({
  selector: 'page-login-page',
  templateUrl: 'login-page.html',
})
export class LoginPage {
  data : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    this.data = {username: "", password: ""}
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  public login() {
    console.log(this.data);
    if(this.data.username == "admin" && this.data.password == "123") {
      console.log("login");
      this.navCtrl.push(TabsPage);
    } else {
      let alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: 'Wrong username or password.\nTry again.',
        buttons: ['OK']
      });

      alert.present();
    }
  }

}
