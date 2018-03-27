import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {Http, Headers} from "@angular/http";
import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import {ShareService} from '../services/ShareService';
/*
  Generated class for the DataProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DataProvider {

  data: String;
  endpoint: String;
  userToken: String;

  constructor(
    public http: Http,
    private transfer: Transfer,
    private file: File,
    private filePath: FilePath,
    private shareService: ShareService
  ) {
    console.log('Hello DataProvider Provider');
    this.userToken = this.shareService.get('userToken');
    this.endpoint = this.shareService.get('endpoint');
  }

  loadListing(input : any) {
    return new Promise(resolve => {
      let url = `${this.endpoint}/user/list?userToken=${this.userToken}`;
      if(input.dateFrom) url = `${url}&dateFrom=${input.dateFrom}`;
      if(input.dateTo) url = `${url}&dateTo=${input.dateTo}`;
      if(input.minTotal) url = `${url}&minTotal=${input.minTotal}`;
      if(input.maxTotal) url = `${url}&maxTotal=${input.maxTotal}`;
      if(input.category) url = `${url}&category=${input.category}`;
      if(input.currency) url = `${url}&currency=${input.currency}`;
      this.http.get(url)
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

    console.log('sendUserFeedback start');
    console.log('inputJson: ' + JSON.stringify(inputJson));

    return new Promise(resolve => {
      const url = `${this.endpoint}/receipt/feedback?userToken=${this.userToken}&feedbackToken=${feedbackToken}`;
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.post(url,inputJson, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          console.log('sendUserFeedback success');
          console.log(JSON.stringify(data));
          resolve(data);
        });
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
          resolve(JSON.parse(data.response))
        }, err => {
            console.log(`ERROR -> ${JSON.stringify(err)}`);
            resolve({err:err})
      });
    });
  }

  sendManualReceipt(inputJson : any) {

    console.log('sendManualReceipt start');
    console.log('inputJson: ' + JSON.stringify(inputJson));

    return new Promise(resolve => {
      const url = `${this.endpoint}/receipt/manual?userToken=${this.userToken}`;
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.post(url,inputJson, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          console.log('sendManualReceipt success');
          console.log(JSON.stringify(data));
          resolve(data);
        });
    });
  }
}
