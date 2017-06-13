import { Component } from '@angular/core';
import {NavController, NavParams, ActionSheetController, LoadingController, ToastController} from 'ionic-angular';
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
  selectOptions: any;
  isManualActive: Boolean;

  constructor(
    public navCtrl: NavController,
    public actionSheetCtrl: ActionSheetController,
    public loadingCtrl: LoadingController,
    private camera: Camera,
    public dataprovider: DataProvider,
    public formBuilder: FormBuilder,
    public toastCtrl: ToastController,
  ) {
    // this.addReceiptForm = this.formBuilder.group({
    //   'itemName': ['', [Validators.required, Validators.minLength(3)]],
    //   'itemPrice': ['']
    // });

    this.receipt = {};
    this.selectOptions = { title: 'Category' };
    this.restartForm();
    this.isManualActive = false;
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
      {name: '', val: 1, price: 0., value: 1},
    ];
    this.restart();
  }

  addItemToReceipt() {
    if(!this.isManualActive) {
      this.isManualActive = true;
    } else {
      this.receipt.items.push({name: '', val: 1, price: 0., value: 1});
    }
  }

  presentActionSheet() {
    const actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Choose Photo',
          handler: () => {
            console.log('Choose Photo')
            this.getPicture(0) // 0 == Library
              .then(imagePath => this.analyze(imagePath));
          }
        },{
          text: 'Take Photo',
          handler: () => {
            console.log('Take Photo')
            this.getPicture(1) // 1 == Camera
              .then(imagePath => this.analyze(imagePath));
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  getPicture(sourceType: number) {
    console.log('getPicture start');
    return new Promise(resolve => {
      this.camera.getPicture({
        quality: 100,
        sourceType,
        allowEdit: true,
        saveToPhotoAlbum: true,
        correctOrientation: true
      }).then((imagePath) => {
        console.log('getPicture success')
        console.log(imagePath);
        resolve(imagePath);
      }, (err) => {
        console.log(`ERROR -> ${JSON.stringify(err)}`);
      });
    })
  }

  analyze(imagePath) {
    console.log('analyze start');
    let loader = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loader.present();
    this.dataprovider.sendPhoto(imagePath).then(res => {
      loader.dismissAll();
      console.log('analyze success');
      this.receipt = res;
      console.log(this.receipt);
      this.isManualActive = true;
      console.log(this.receipt.feedbackToken);
    });
  }

  restart() {

  }

  onSubmit() {
    console.log('onSubmit start');
    let loader = this.loadingCtrl.create({
      content: 'Please wait...',
    });
    loader.present()
    console.log(this.receipt.items);

    if(this.isManualActive) {
      this.dataprovider.sendManualReceipt(JSON.stringify(this.receipt)).then(res => {
        console.log('onSubmit success');
        console.log(JSON.stringify(res));
        this.receipt = {};
        this.isManualActive = false;
        loader.dismissAll();
      })
    }
    else {
      this.dataprovider.sendUserFeedback(JSON.stringify(this.receipt), this.receipt.feedbackToken).then(res => {
        console.log('onSubmit success');
        console.log(JSON.stringify(res));
        this.receipt = {};
        this.isManualActive = false;
        loader.dismissAll();
      });
    }
  }
}
