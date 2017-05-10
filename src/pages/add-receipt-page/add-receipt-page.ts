import { Component } from '@angular/core';
import {NavController, NavParams, ActionSheetController, LoadingController} from 'ionic-angular';
import {DataProvider} from "../../providers/dataprovider";
import {Camera} from "@ionic-native/camera";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";

/**
 * Generated class for the AddReceiptPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
// @IonicPage()
@Component({
  selector: 'page-add-receipt-page',
  templateUrl: 'add-receipt-page.html',
  providers: [DataProvider]
})
export class AddReceiptPage {

  receipt : any;
  srcImage: string;

  constructor(
    public navCtrl: NavController,
    public actionSheetCtrl: ActionSheetController,
    public loadingCtrl: LoadingController,
    private camera: Camera,
    public dataprovider: DataProvider,
    public formBuilder: FormBuilder
  ) {
    // this.addReceiptForm = this.formBuilder.group({
    //   'itemName': ['', [Validators.required, Validators.minLength(3)]],
    //   'itemPrice': ['']
    // });

    this.restartForm();
  }

  initItem() {
    return this.formBuilder.group({
      'name': ['', [Validators.required, Validators.minLength(3)]],
      "val": [''],
      'price': ['']
    });
  }

  restartForm() {
    this.receipt = {};
    this.receipt.currency = "";
    this.receipt.items = [];
    this.receipt.items = [
      {name: '', val: 1, price: 0.},
      {name: '', val: 1, price: 0.}
    ];
    this.restart();
  }

  addItemToReceipt() {
    this.receipt.items.push({name: '', val: 1, price: 0.});
  }

  presentActionSheet() {
    const actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Choose Photo',
          handler: () => {
            this.getPicture(0); // 0 == Library
            this.analyze();
          }
        },{
          text: 'Take Photo',
          handler: () => {
            this.getPicture(1); // 1 == Camera
            this.analyze();
          }
        },{
          text: 'Demo Photo',
          handler: () => {
            this.srcImage = 'assets/img/demo.jpg';
            this.analyze();
          }
        },{
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  getPicture(sourceType: number) {
    this.camera.getPicture({
      quality: 100,
      destinationType: 0, // DATA_URL
      sourceType,
      allowEdit: true,
      saveToPhotoAlbum: true,
      correctOrientation: true
    }).then((imageData) => {
      this.srcImage = `data:image/jpeg;base64,${imageData}`;
    }, (err) => {
      console.log(`ERROR -> ${JSON.stringify(err)}`);
    });
  }

  analyze() {
    let loader = this.loadingCtrl.create({
      content: 'Please wait...',
      duration: 12000
    });
    loader.present();
    console.log(this.srcImage);
    this.dataprovider.sendPhoto(this.srcImage).then(res => {
      console.log(res);
      setTimeout(() => {this.receipt = res;
        loader.dismissAll();}, 7000);
    });
  }

  restart() {
    this.srcImage = '';
  }

  onSubmit() {
    let loader = this.loadingCtrl.create({
      content: 'Please wait...',
      duration: 12000
    });
    loader.present();
    console.log(this.receipt.items);
    this.dataprovider.sendUserFeedback(JSON.stringify(this.receipt), this.receipt.feedbackToken).then(res => {
      console.log(res);
      setTimeout(() => {this.receipt = res;
        loader.dismissAll();}, 5000);

    });
  }

}
