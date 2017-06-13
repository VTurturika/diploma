import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {Http, Headers} from "@angular/http";

@Injectable()
export class LoginProvider {

  endpoint: String = "http://54.197.180.84/api";

  constructor(
    public http: Http
  ) {
    console.log('Hello UserProvider Provider');
  }

  login(credentials: any) {

    console.log('login start');
    console.log(credentials);
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
        })
    })
  }

  signup(credentials: any) {

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
        })
    })
  }

}
