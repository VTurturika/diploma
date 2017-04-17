import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {Http} from "@angular/http";

/*
  Generated class for the SomeData provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class SomeData {

  data: String;

  constructor(public http: Http) {
    console.log('Hello SomeData Provider');
  }

  load() {
    if(this.data) {
      return Promise.resolve(this.data);
    }

    // return new Promise(resolve => {
    //   this.http.get("")
    //     .map(res => res.json())
    //     .subscribe(data => resolve(data));
    // });
  }
}
