import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {Http, Headers} from "@angular/http";

/*
  Generated class for the DataProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DataProvider {

  data: String;
  endpoint: String = "http://54.172.121.49/api";
  userToken: String = "userToken";
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

  constructor(public http: Http) {
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
    let headers = new Headers();
    return new Promise(resolve => {
      // this.http.post(`${this.endpoint}/receipt/feedback?userToken=${this.userToken},feedbackToken=${feedbackToken}`,
      // inputJson);

      resolve(this.confiredRec);

    })
  }

  sendPhoto(imgData) {
    let headers = new Headers();
    headers.append('mimeType', 'multipart/form-data');

    return new Promise(resolve => {

      // this.http.post(`${this.endpoint}/receipt/ocr?userToken=${this.userToken}`, {receipt: imgData}, {headers: headers})
      //   .map(res => res.json())
      //   .subscribe(data => resolve(data));

      resolve(this.receiptRes);
    });
  }
}
