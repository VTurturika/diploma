import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {Camera} from "@ionic-native/camera";
import {HttpModule} from "@angular/http";
import {AddReceiptPage} from "../pages/add-receipt-page/add-receipt-page";
import {ViewReceiptPage} from "../pages/view-receipt-page/view-receipt-page";
import {StatisticsProfilePage} from "../pages/statistics-profile-page/statistics-profile-page";
import {ListingPage} from "../pages/listing-page/listing-page";
import {LoginPage} from "../pages/login-page/login-page";
import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import {EditReceiptPage} from "../pages/edit-receipt-page/edit-receipt-page";

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    AddReceiptPage,
    ListingPage,
    LoginPage,
    StatisticsProfilePage,
    ViewReceiptPage,
    EditReceiptPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    AddReceiptPage,
    ListingPage,
    LoginPage,
    StatisticsProfilePage,
    ViewReceiptPage,
    EditReceiptPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Camera,
    File,
    Transfer,
    FilePath
  ]
})
export class AppModule {}
