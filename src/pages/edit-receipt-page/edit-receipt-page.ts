import {Component} from "@angular/core";
import {NavController, NavParams, ActionSheetController, LoadingController, ToastController} from "ionic-angular";
import {DataProvider} from "../../providers/dataprovider";
import {Camera} from "@ionic-native/camera";
import {FormBuilder, Validators} from "@angular/forms";

/**
 * Generated class for the EditReceiptPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
// @IonicPage()
@Component({
  selector: 'page-edit-receipt-page',
  templateUrl: 'edit-receipt-page.html',
  providers: [DataProvider]
})
export class EditReceiptPage {

  receipt: any;
  selectOptions: any;

  constructor(public navCtrl: NavController,
              public actionSheetCtrl: ActionSheetController,
              public loadingCtrl: LoadingController,
              private camera: Camera,
              public dataprovider: DataProvider,
              public formBuilder: FormBuilder,
              public toastCtrl: ToastController,
              public navParams: NavParams) {
    this.selectOptions = {title: 'Category'};
    this.receipt = navParams.get('receipt') || {};
  }

  initItem() {
    return this.formBuilder.group({
      'name': ['', [Validators.required, Validators.minLength(3)]],
      "val": [''],
      'price': ['']
    });
  }

  addItemToReceipt() {
    this.receipt.items.push({name: '', val: 1, price: 0., value: 1});
  }

  onSubmit() {
    console.log('onSubmit start');
    let loader = this.loadingCtrl.create({
      content: 'Please wait...',
    });
    loader.present()
    console.log(this.receipt.items);
    this.dataprovider.sendUserFeedback(JSON.stringify(this.receipt), this.receipt.feedbackToken).then(res => {
      console.log('onSubmit success');
      console.log(JSON.stringify(res));
      // this.receipt = res;
      loader.dismissAll();
    });
  }


}
