import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  chartLabels: string[] = [];
  chartData: number[] = [];
  chartType: string = 'doughnut';
  productStats: Array<object> = [
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
  constructor() {
    this.prepareChartData();
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
