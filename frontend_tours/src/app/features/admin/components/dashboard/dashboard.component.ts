import { Component, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public pieChartOptions: ChartConfiguration<'pie'>['options'] = {
    responsive: true,
  };

  public pieChartLabels = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public pieChartData = {
    labels: this.pieChartLabels,
    datasets: [{
      data: [300, 500, 100]
    }]
  };
  public pieChartType: 'pie' = 'pie';


  ///////

  public barChartOptionsBar: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    scales: {
      x: {},
      y: {
        min: 0
      }
    }
  };

  public barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartTypeBar: 'bar' = 'bar';
  public barChartLegend = true;

  public barChartDataBar = {
    labels: this.barChartLabels,
    datasets: [
      { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
      { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
    ]
  };

  constructor() { }

  ngOnInit(): void {
  }

}
