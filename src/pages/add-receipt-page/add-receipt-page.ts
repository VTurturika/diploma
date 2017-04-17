import { Component } from '@angular/core';
import {NavController, NavParams, ActionSheetController, LoadingController} from 'ionic-angular';
import {SomeData} from "../../providers/some-data";
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
  providers: [SomeData]
})
export class AddReceiptPage {

  addReceiptForm: FormGroup;
  receiptItem: {name: string, price: number} = {name: '', price: 0.};
  inputItems: any[];

  srcImage: string;
  tesseract: any;
  public someD: any;

  constructor(
    public navCtrl: NavController,
    public actionSheetCtrl: ActionSheetController,
    public loadingCtrl: LoadingController,
    private camera: Camera,
    public someData: SomeData,
    public formBuilder: FormBuilder
  ) {

    console.log(this.receiptItem);
    this.addReceiptForm = this.formBuilder.group({
      'itemName': ['', [Validators.required, Validators.minLength(3)]],
      'itemPrice': ['']
    });

    this.inputItems = [];
    this.inputItems.push(this.receiptItem);
    this.inputItems.push(this.receiptItem);
  }

  initItem() {
    return this.formBuilder.group({
      'itemName': ['', [Validators.required, Validators.minLength(3)]],
      'itemPrice': ['']
    });
  }

  addItemToReceipt() {
    this.inputItems.push(this.receiptItem);
  }

  presentActionSheet() {
    const actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Choose Photo',
          handler: () => {
            this.getPicture(0); // 0 == Library
          }
        },{
          text: 'Take Photo',
          handler: () => {
            this.getPicture(1); // 1 == Camera
          }
        },{
          text: 'Demo Photo',
          handler: () => {
            this.srcImage = 'assets/img/demo.png';
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
      saveToPhotoAlbum: false,
      correctOrientation: true
    }).then((imageData) => {
      this.srcImage = `data:image/jpeg;base64,${imageData}`;
    }, (err) => {
      console.log(`ERROR -> ${JSON.stringify(err)}`);
    });
  }

  analyze() {
    let loader = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loader.present();
    let img = document.getElementById('image');
    (<any>window).OCRAD(img, text => {
      loader.dismissAll();
      alert(text);
      console.log(text);
    });
  }

  restart() {
    this.srcImage = '';
    this.presentActionSheet();
  }

  onSubmit() {
    console.log("form submitted");
  }

}
