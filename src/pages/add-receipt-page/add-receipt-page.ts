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
  mustShowForm: Boolean;
  isManual: Boolean;

  constructor(
    public navCtrl: NavController,
    public actionSheetCtrl: ActionSheetController,
    public loadingCtrl: LoadingController,
    private camera: Camera,
    public dataprovider: DataProvider,
    public formBuilder: FormBuilder,
    public toastCtrl: ToastController,
  ) {

    this.receipt = {};
    this.selectOptions = { title: 'Category' };
    this.restartForm();
    this.isManual = false;
    this.mustShowForm = false;
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
  }

  addItemToReceipt() {
    this.isManual = true;
    if(!this.mustShowForm) {
      this.mustShowForm = true;
    } else {
      this.receipt.items.push({name: '', val: 1, price: 0., value: 1});
    }
  }

  presentActionSheet() {
    this.isManual = false;
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
      this.mustShowForm = true;
      console.log(this.receipt.feedbackToken);
    });
  }

  onSubmit() {
    console.log('onSubmit start');
    let loader = this.loadingCtrl.create({
      content: 'Please wait...',
    });
    loader.present()
    console.log(this.receipt.items);

    if(this.isManual) {
      console.log('submiting manual receipt');
      this.dataprovider.sendManualReceipt(JSON.stringify(this.receipt)).then(res => {
        console.log('onSubmit with sendManualReceipt success');
        console.log(JSON.stringify(res));
        this.mustShowForm = false;
        this.restartForm();
        loader.dismissAll();
      })
    }
    else {
      console.log('submiting receipt via feedback');
      this.dataprovider.sendUserFeedback(JSON.stringify(this.receipt), this.receipt.feedbackToken).then(res => {
        console.log('onSubmit with sendUserFeedback success');
        console.log(JSON.stringify(res));
        this.mustShowForm = false;
        this.restartForm();
        loader.dismissAll();
      });
    }
  }
}
