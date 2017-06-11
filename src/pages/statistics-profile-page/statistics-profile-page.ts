import {Component, ViewChild} from "@angular/core";
import {NavController, NavParams, LoadingController} from "ionic-angular";
import {DataProvider} from "../../providers/dataprovider";
import {Chart} from 'chart.js';

/**
 * Generated class for the StatisticsProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
// @IonicPage()
@Component({
  selector: 'page-statistics-profile-page',
  templateUrl: 'statistics-profile-page.html',
  providers: [DataProvider],
})
export class StatisticsProfilePage {

  @ViewChild('lineChart') lineChartCanvas;
  lineChart: any;
  @ViewChild('donChart') donChartCanvas;
  donChart: any;

  stats: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public someData: DataProvider) {
    this.stats = {};
    this.getStats();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StatisticsProfilePage');
  }

  getStats() {
    let loader = this.loadingCtrl.create({
      content: 'Please wait...',
      duration: 12000
    });
    loader.present();
    let receipts = [];
    this.someData.loadListing({}).then((data:any) => {
      console.log("DATA: "+data);
      receipts = data.receipts;
      console.log("RECEIPTS: "+receipts);
      receipts.push(receipts[0]);

      this.stats.numOfReceipts = receipts.length;
      this.stats.totalSpent = 0;
      this.stats.spentByTotal = {};
      receipts.forEach(receipt => {
        this.stats.totalSpent += receipt.total;
        this.stats.mostExpensive = receipt.items[0];
        if(!this.stats.spentByTotal[receipt.date]) this.stats.spentByTotal[receipt.date] = 0;
        this.stats.spentByTotal[receipt.date] += receipt.total;
        receipt.items.forEach(item => {
          if(item.price > this.stats.mostExpensive) this.stats.mostExpensive = item;
        });
      });
      this.stats.totalSpent = this.stats.totalSpent.toFixed(2);
      console.log(JSON.stringify(this.stats.spentByTotal, null, 4));
      loader.dismissAll();

      this.showCharts();
    });
  }

  public showCharts() {
    let spendings = [];
    let labelsData = [];
    for(let k in this.stats.spentByTotal) {
      console.log(this.stats.spentByTotal[k]);
      spendings.push(this.stats.spentByTotal[k]);
      labelsData.push(k);
    }
    this.lineChart = new Chart(this.lineChartCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: labelsData,
        datasets: [{
          fill: true,
          lineTension: 0.1,
          borderDash: [],
          borderDashOffset: 0.0,
          label: 'Timeline',
          data: spendings,
          pointRadius: 1,
          pointHitRadius: 10,
          spanGaps: false,
          pointBorderColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(255, 206, 86, 0.2)',
          backgroundColor: 'rgba(255, 159, 64, 0.2)',
        }],
      },
    });
    this.donChart = new Chart(this.donChartCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: labelsData,
        datasets: [{
          label: 'Spendings',
          data: spendings,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
        }],
      },
    });
  }
}
