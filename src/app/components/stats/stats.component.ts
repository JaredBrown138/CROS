import { Component, OnInit, ViewChild } from '@angular/core';
import { APIService } from '../../services/api.service';
import { MatSnackBar } from '@angular/material';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;
  total: number;
  chartLabels: string[] = [];
  chartData: number[] = [];
  chartType: string = 'doughnut';

  productStats: any = [
    { name: "Password Reset", quantity: "332", id: "pswd" },
    { name: "Spyware Removal", quantity: "125", id: "spyw" },
    { name: "RAM Upgrade", quantity: "34", id: "ram" },
    { name: "Software Installation", quantity: "249", id: "sftw" },
    { name: "Tune-up", quantity: "560", id: "tune" },
    { name: "Keyboard Cleaning", quantity: "87", id: "keyc" },
    { name: "Disk Clean-up", quantity: "149", id: "disc" },
    { name: "Custom Service", quantity: "219", id: "custom" }
  ]

  chartColors: any[] = [{ backgroundColor: ["#d44242", "#bd3c6b", "#8eb93a", "#be5085", "#924783", "#614f85", "#3a4f74", "#2f4858"] }];

  displayedColumns = ['name', 'quantity']

  constructor(public api: APIService, public snackBar: MatSnackBar) {

  }

  ngOnInit() { }

  ngAfterViewInit() {
    this.api.getStats().subscribe(
      res => {
        this.total = res[8];
        res[8] = { name: "Total (count):", quantity: this.calcTotal(res) };
        res[9] = { name: "Total ($):", quantity: this.total['totalSales'] };
        this.productStats = res;
        this.prepareChartData();
      },
      err => {
        this.snackBar.open(err.error['message'], '', {
          panelClass: ['bad', 'snack'],
          duration: 5000
        });
      }
    )
    this.prepareChartData();
  }

  /**
   * Get the total of services of all
   * types.
   * @param arr 
   */
  calcTotal(arr) {
    let total = 0;
    arr.forEach(element => {
      if (element['quantity'] != undefined) {
        total += element['quantity'];
      }
    });
    return total;
  }



  /**
   * Iterate through the productStats array and put
   * the appropriate values in the chart label and data
   * arrays.
   */
  prepareChartData() {
    this.chartData.length = 0;
    this.chartLabels.length = 0;

    for (let x = 0; x < this.productStats.length - 2; x++) {
      this.chartLabels.push(this.productStats[x]["name"]);
      this.chartData.push(this.productStats[x]["quantity"]);
    }
    console.log(this.chartLabels);
    console.log(this.chartData);
    this.chart.chart.update();
  }

}
