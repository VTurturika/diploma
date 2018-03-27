import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {Http, Headers} from "@angular/http";
import {ShareService} from '../services/ShareService';

@Injectable()
export class LoginProvider {

  endpoint: String = "";

  constructor(
    public http: Http,
    private shareService: ShareService
  ) {
    console.log('Hello UserProvider Provider');
  }

  login(credentials: any, url: string) {

    this.endpoint = `http://${url}/api`;
    this.shareService.set('endpoint', this.endpoint);

    console.log('login start');
    return new Promise(resolve => {
      const url = `${this.endpoint}/user/login`;
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.post(url, credentials, {headers: headers})
        .map(res => res.json())
        .subscribe(response => {
          console.log('login request success');
          console.log('Response: ' + JSON.stringify(response));

          if(response.userToken) resolve({
            isLogined: true,
            token: response.userToken
          })
          else resolve({
            isLogined: false
          })
        }, err => {
          resolve({
            isLogined: false
          })
        })
    })
  }

  signup(credentials: any, url : string) {

    this.endpoint = `http://${url}/api`;
    this.shareService.set('endpoint', this.endpoint);

    console.log('signup start');
    console.log(credentials);
    return new Promise(resolve => {
      const url = `${this.endpoint}/user/new`;
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.post(url, credentials, {headers: headers})
        .map(res => res.json())
        .subscribe(response => {
          console.log('signup request success');
          console.log('Response: ' + JSON.stringify(response));

          if(response.userToken) resolve({
            isLogined: true,
            token: response.userToken
          })
          else resolve({
            isLogined: false
          })
        }, err => {
          resolve({
            isLogined: false
          })
        })
    })
  }

}
