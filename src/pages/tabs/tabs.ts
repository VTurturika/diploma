import { Component } from '@angular/core';

import {ListingPage} from "../listing-page/listing-page";
import {AddReceiptPage} from "../add-receipt-page/add-receipt-page";
import {StatisticsProfilePage} from "../statistics-profile-page/statistics-profile-page";


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = AddReceiptPage;
  tab2Root = ListingPage;
  tab3Root = StatisticsProfilePage;

  constructor() {

  }
}
