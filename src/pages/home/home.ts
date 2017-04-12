import {Component} from "@angular/core";
import {NavController, LoadingController, ActionSheetController} from "ionic-angular";
import {DetailPage} from "../detail/detail";
import {Camera} from "@ionic-native/camera";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  srcImage: string;
  tesseract: any;

  constructor(
    public navCtrl: NavController,
    public actionSheetCtrl: ActionSheetController,
    public loadingCtrl: LoadingController,
    private camera: Camera
  ) {}

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
    // (<any>window).tesseract.recognize(img, text => {
    //   loader.dismissAll();
    //   alert(text);
    //   console.log(text);
    // });
  }

  restart() {
    this.srcImage = '';
    this.presentActionSheet();
  }

}
