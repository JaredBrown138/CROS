import { Component, OnInit } from '@angular/core';
import { APIService } from '../../services/api.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
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
  displayedColumns = ['name', 'quantity']
  constructor(public api: APIService, public snackBar: MatSnackBar) {
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

  calcTotal(arr) {
    let total = 0;
    arr.forEach(element => {
      if (element['quantity'] != undefined) {
        total += element['quantity'];
      }
    });
    return total;
  }

  ngOnInit() {
  }

  prepareChartData() {
    for (let x = 0; x < this.productStats.length; x++) {
      this.chartLabels.push(this.productStats[x]["name"]);
      this.chartData.push(this.productStats[x]["quantity"]);
    }
  }

}
