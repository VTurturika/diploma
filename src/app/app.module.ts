import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { DetailPage } from '../pages/detail/detail';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {Camera} from "@ionic-native/camera";
import {HttpModule} from "@angular/http";
import {AddReceiptPage} from "../pages/add-receipt-page/add-receipt-page";
import {ViewReceiptPage} from "../pages/view-receipt-page/view-receipt-page";
import {StatisticsProfilePage} from "../pages/statistics-profile-page/statistics-profile-page";
import {ListingPage} from "../pages/listing-page/listing-page";
import {LoginPage} from "../pages/login-page/login-page";

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    DetailPage,
    AddReceiptPage,
    ListingPage,
    LoginPage,
    StatisticsProfilePage,
    ViewReceiptPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    DetailPage,
    AddReceiptPage,
    ListingPage,
    LoginPage,
    StatisticsProfilePage,
    ViewReceiptPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Camera
  ]
})
export class AppModule {}
