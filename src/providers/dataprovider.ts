import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {Http, Headers} from "@angular/http";
import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
/*
  Generated class for the DataProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DataProvider {

  data: String;
  endpoint: String = "http://54.197.180.84/api";
  userToken: String = "592ec7814953200cd50b00bb";
  receiptRes: any = {
    feedbackToken: "abcd1234",
    date: "2017-04-23",
    time: "15:30",
    total: 39.24,
    currency: "UAH",
    commonCategory: "food",
    items:[
      {
        number: 1,
        name: "Пампушки з часткм",
        price: 6.4,
        category: "food",
        measure: "г",
        value: 250,
      },{
        number: 2,
        name: "МаслоСелянськеВершк",
        price: 28.99,
        category: "others",
        measure: "г",
        value: 200,
      }
    ]
  };
  confiredRec : any = {
    feedbackToken: "abcd1234",
    date: "2017-04-23",
    time: "15:30",
    total: 39.24,
    currency: "UAH",
    commonCategory: "food",
    items:[
      {
        number: 1,
        name: "Пампушки з часником",
        price: 6.49,
        category: "food",
        measure: "г",
        value: 250,
      },{
        number: 2,
        name: "Масло Селянське Вершкове",
        price: 28.99,
        category: "food",
        measure: "г",
        value: 200,
      }
    ]
  };

  constructor(
    public http: Http,
    private transfer: Transfer,
    private file: File,
    private filePath: FilePath,
  ) {
    console.log('Hello DataProvider Provider');
  }

  loadListing(input : any) {

    return new Promise(resolve => {
      this.http.get(`${this.endpoint}/user/list?userToken=${this.userToken}&dateFrom=${input.dateFrom||""}&dateTo=${input.dateTo||""}&minTotal=${input.minTotal||""}&maxTotal=${input.maxTotal||""}&category=${input.category||""}&currency=${input.currency||""}`)
        .map(res => res.json())
        .subscribe(data => resolve(data));
    })
  }

  syncUserData() {
    return new Promise(resolve => {
      this.http.get(`${this.endpoint}/user/sync?userToken${this.userToken}`)
        .map(res => res.json())
        .subscribe(data => resolve(data));
    });
  }

  sendUserFeedback(inputJson : any, feedbackToken : String) {

    return new Promise(resolve => {
      // this.http.post(`${this.endpoint}/receipt/feedback?userToken=${this.userToken},feedbackToken=${feedbackToken}`,
      // inputJson);

      resolve(this.confiredRec);

    })
  }

  sendPhoto(imgPath) {

    console.log('sendPhoto start')

    return new Promise(resolve => {

      const options = {
        fileKey: "receipt",
        fileName: "filename",
        chunkedMode: false,
        mimeType: "multipart/form-data"
      };
      const url = `${this.endpoint}/receipt/ocr?userToken=${this.userToken}`;
      const fileTransfer: TransferObject = this.transfer.create();
      console.log('upload start');
      fileTransfer.upload(imgPath, url, options).then(data => {
          console.log('upload success');
          console.log(JSON.stringify(data));
          console.log('sendPhoto success')
          resolve(data.response)
        }, err => {
            console.log(`ERROR -> ${JSON.stringify(err)}`);
            resolve({err:err})
      });
    });
  }
}
