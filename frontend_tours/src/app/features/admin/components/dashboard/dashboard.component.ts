import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, registerables } from 'chart.js';
import { DashboardService } from '../../services/dashboard.service';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TipoToursService } from '../../services/tipo-tours.service';
import { TourService } from 'src/app/features/tours/services/tour.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent extends HeaderComponent implements OnInit {
  @ViewChild('cards', { static: false }) cards!: ElementRef;
  @ViewChild('pieChart1', { static: false }) pieChart1!: ElementRef;
  @ViewChild('pieChart2', { static: false }) pieChart2!: ElementRef;
  @ViewChild('barChart', { static: false }) barChart!: ElementRef;

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

  cantidadPersonas: number = 0;
  cantidadIngresos: number = 0;
  cintidadTours: number = 0;

  constructor(
    private _servive: DashboardService,
    private _tipoTour_service: TipoToursService,
    private _tours_service: TourService,
    public override snackBar: MatSnackBar
  ) { 
    super(snackBar)
  }

  override ngOnInit(): void {
    this.listarDatosTipoTour();
    this.listarTours();
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

  listarTours(){
    this._tours_service.getToursAll({}).subscribe((res=>{
      if(res.estado){
        console.log(res.data);        
        this.cintidadTours = res.data.length;
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

        this.barChartDataBar = {
          labels: this.barChartLabels,
          datasets: datasets
        };


        this.cantidadPersonas = res.data.ventas[0].personas;
        this.cantidadIngresos = res.data.ventas[0].ingresos;

      }else{
        this.openSnackBar(res.mensaje, 2500);
      }      
    });
  }

  exportPdf() {
    let pieChart1 = this.pieChart1.nativeElement;
    let pieChart2 = this.pieChart2.nativeElement;
    let barChart = this.barChart.nativeElement;
    let cards = this.cards.nativeElement;

    const pdf = new jsPDF('p', 'mm', 'a4');

    html2canvas(cards, { backgroundColor: null }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 210;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 10, imgWidth, imgHeight);

      html2canvas(pieChart1, { backgroundColor: null }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const imgWidth = 120;
        const imgHeight = canvas.height * imgWidth / canvas.width;
        pdf.addImage(imgData, 'PNG', 40, 40, imgWidth, imgHeight);

        html2canvas(pieChart2, { backgroundColor: null }).then(canvas => {
          const imgData = canvas.toDataURL('image/png');
          const imgWidth = 120;
          const imgHeight = canvas.height * imgWidth / canvas.width;
          pdf.addImage(imgData, 'PNG', 40, imgHeight + 30, imgWidth, imgHeight);
          pdf.addPage('a4', 'landscape');


          html2canvas(barChart, { backgroundColor: null }).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const imgWidth = 280;
            const imgHeight = canvas.height * imgWidth / canvas.width;
            pdf.addImage(imgData, 'PNG', 10, 30, imgWidth, imgHeight);

            pdf.save('dashboard.pdf');
          });
        });
      });
    });
    
    
  }
}
