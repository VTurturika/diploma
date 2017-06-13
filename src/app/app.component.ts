import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import {LoginPage} from "../pages/login-page/login-page";
import {ShareService} from '../services/ShareService';

@Component({
  templateUrl: 'app.html',
    providers: [ShareService]
})
export class MyApp {
  rootPage:any = LoginPage;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private shareService: ShareService
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      shareService.set('apiEndpoint', 'http://54.197.180.84/api');
    });
  }
}
