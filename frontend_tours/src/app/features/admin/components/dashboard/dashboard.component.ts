import { Component, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { DashboardService } from '../../services/dashboard.service';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TipoToursService } from '../../services/tipo-tours.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent extends HeaderComponent implements OnInit {
  cards = [
    { title: 'Personas', icon: 'group_add', count: 1234, color: 'primary' },
    { title: 'Ganancias', icon: 'attach_money', count: 5678, color: 'success' },
    // Añade más tarjetas según sea necesario
  ];

  listTipotours = [];

  public pieChartOptions: ChartConfiguration<'pie'>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'right',
        labels: {
          boxWidth: 20,
          boxHeight: 10,
          padding: 15
        },
        maxHeight: 200,
        maxWidth: 200,
      },     
    },
  };

  public pieChartLabels = [''];
  public pieChartData = {
    labels: this.pieChartLabels,
    datasets: [{
      data: [1]
    }]
  };

  public pieChartLabels2 = [''];
  public pieChartData2 = {
    labels: this.pieChartLabels2,
    datasets: [{
      data: [1]
    }]
  };

  public pieChartType: 'pie' = 'pie';

  public barChartOptionsBar: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    scales: {
      x: {},
      y: {
        min: 0
      }
    }
  };

  public barChartLabels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  public barChartTypeBar: 'bar' = 'bar';
  public barChartLegend = true;

  public barChartDataBar = {
    labels: this.barChartLabels,
    datasets: [
      { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
      { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
    ]
  };

  constructor(
    private _servive: DashboardService,
    private _tipoTour_service: TipoToursService,
    public override snackBar: MatSnackBar
  ) { 
    super(snackBar)
  }

  override ngOnInit(): void {
    this.listarDatosTipoTour();
    this.getDatos();
  }

  listarDatosTipoTour(){
    this._tipoTour_service.listar({}).subscribe((res=>{
      if(res.estado){
        console.log(res.data);
        this.listTipotours = res.data;   
      }else{
        //this.openSnackBar(res.mensaje, 2500);
        console.log("OCURRIO UN ERROR");
      }      
    }));
  }

  getDatos(){
    this._servive.getDataDashboard({}).subscribe(res=>{
      if(res.estado){
        console.log(res.data); 

        this.pieChartLabels = [];
        let dataPieChartData: number[] = [];

        res.data.cantTour.forEach((element: any) => {
          this.pieChartLabels.push(element.nombre);
          dataPieChartData.push(element.cantidad);
        });

        this.pieChartData = {
          labels: this.pieChartLabels,
          datasets: [{
            data: dataPieChartData
          }]
        };


        this.pieChartLabels2 = [];
        let dataPieChartData2: number[] = [];
        res.data.cantTipoTour.forEach((element: any) => {
          this.pieChartLabels2.push(element.c_desripcion);
          dataPieChartData2.push(element.cantidad);
        });

        this.pieChartData2 = {
          labels: this.pieChartLabels2,
          datasets: [{
            data: dataPieChartData2
          }]
        };

        let datasets: { data: number[], label: string }[] = [];

        this.listTipotours.forEach((element: any) => {
          let tipoTour = res.data.cantTipoTourMes.filter((e: any) => e.c_codigo == element.c_codigo );
          let data:number[] = [];
          tipoTour.forEach((j: any) => {
            data.push(j.cantidad)
          });
          datasets.push(
            { data: data, label: element.c_desripcion }
          )
          console.log("tipoTour", tipoTour);          
        });

        
        
        /* enero.forEach((element: any) => {
          datasets.push(
            { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' }
          )
        }); */
        this.barChartDataBar = {
          labels: this.barChartLabels,
          datasets: datasets
        };

      }else{
        this.openSnackBar(res.mensaje, 2500);
      }      
    });
  }
}
