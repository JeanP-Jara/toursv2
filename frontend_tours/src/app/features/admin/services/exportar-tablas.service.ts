import { Injectable } from '@angular/core';
import { Workbook, Worksheet } from 'exceljs';
import { saveAs } from 'file-saver';
import { PrototypeActividad } from '../models/actividad';
import { Tour } from '../../tours/models/tour';

@Injectable({
  providedIn: 'root'
})
export class ExportarTablasService {
  

  exportarExcelActividad(datosActividad: any) {

    console.log("EXPORTAR", datosActividad);
    const workbook = new Workbook();
    const worksheet: Worksheet = workbook.addWorksheet('Shet 1');

    const indexNum = 1; // index vertical
    worksheet.getCell(`A${indexNum}`).value = 'Tour';
    worksheet.getCell(`B${indexNum}`).value = 'Detalle';
    
    // Establecer un ancho para todas las columnas
    worksheet.columns.forEach((column: any) => {
        column.width = 13;
    });

    //AJUSTAR AL CENTRO, MEDIO Y AUTOMÁTICAMENTE HACIA ABAJO
    worksheet.eachRow({ includeEmpty: true }, function(row: any) {
        row.eachCell({ includeEmpty: true }, function(cell: any) {
            cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
        });
    });

    //AJUSTAR ANCHO
    worksheet.getColumn('A').width = 50;   
    worksheet.getColumn('B').width = 150;   
        

    //DEFINIR CASILLAS CON BORDES
    const casillas = ["A1", "B1"]; 

    //APLICAR BORDE/FONDO/COLOR
    casillas.forEach((casilla) => {
      const celda = worksheet.getCell(casilla);
      celda.border = {
          top: { style: 'thin', color: { argb: '000000' } },    // Borde superior negro
          left: { style: 'thin', color: { argb: '000000' } },   // Borde izquierdo negro
          bottom: { style: 'thin', color: { argb: '000000' } }, // Borde inferior negro
          right: { style: 'thin', color: { argb: '000000' } }   // Borde derecho negro
      };
      celda.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: '456D98' } // Azul opaco
      };

      celda.font = {
          color: { argb: 'FFFFFF' } // Blanco
      }; 
    });

    // LLENAR DATA DE COLUMNAS
    datosActividad.forEach((element: PrototypeActividad, index: number) => {
      const rowNumber = index + 2; // Incrementar el número de fila con cada iteración
      worksheet.getCell(`A${rowNumber}`).value = element.tour;
      worksheet.getCell(`B${rowNumber}`).value = element.c_detalle;                                            
  });

    // Guardar el libro de Excel
    workbook.xlsx.writeBuffer().then((data: any) => {
        const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob, 'Actividades.xlsx');
    });
  }

  exportarExcelDepartamento(datos: any) {

    console.log("EXPORTAR", datos);
    const workbook = new Workbook();
    const worksheet: Worksheet = workbook.addWorksheet('Shet 1');

    const indexNum = 1; // index vertical
    worksheet.getCell(`A${indexNum}`).value = 'Departamento';
    
    // Establecer un ancho para todas las columnas
    worksheet.columns.forEach((column: any) => {
        column.width = 13;
    });

    //AJUSTAR AL CENTRO, MEDIO Y AUTOMÁTICAMENTE HACIA ABAJO
    worksheet.eachRow({ includeEmpty: true }, function(row: any) {
        row.eachCell({ includeEmpty: true }, function(cell: any) {
            cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
        });
    });

    //AJUSTAR ANCHO
    worksheet.getColumn('A').width = 50;   
        

    //DEFINIR CASILLAS CON BORDES
    const casillas = ["A1"]; 

    //APLICAR BORDE/FONDO/COLOR
    casillas.forEach((casilla) => {
      const celda = worksheet.getCell(casilla);
      celda.border = {
          top: { style: 'thin', color: { argb: '000000' } },    // Borde superior negro
          left: { style: 'thin', color: { argb: '000000' } },   // Borde izquierdo negro
          bottom: { style: 'thin', color: { argb: '000000' } }, // Borde inferior negro
          right: { style: 'thin', color: { argb: '000000' } }   // Borde derecho negro
      };
      celda.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: '456D98' } // Azul opaco
      };

      celda.font = {
          color: { argb: 'FFFFFF' } // Blanco
      }; 
    });

    // LLENAR DATA DE COLUMNAS
    datos.forEach((element: any, index: number) => {
      const rowNumber = index + 2; // Incrementar el número de fila con cada iteración
      worksheet.getCell(`A${rowNumber}`).value = element.c_nombre;                                           
  });

    // Guardar el libro de Excel
    workbook.xlsx.writeBuffer().then((data: any) => {
        const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob, 'Departamentos.xlsx');
    });
  }

  exportarExcelLugar(datos: any) {

    console.log("EXPORTAR", datos);
    const workbook = new Workbook();
    const worksheet: Worksheet = workbook.addWorksheet('Shet 1');

    const indexNum = 1; // index vertical
    worksheet.getCell(`A${indexNum}`).value = 'Lugar';
    worksheet.getCell(`A${indexNum}`).value = 'Departamento';
    
    // Establecer un ancho para todas las columnas
    worksheet.columns.forEach((column: any) => {
        column.width = 13;
    });

    //AJUSTAR AL CENTRO, MEDIO Y AUTOMÁTICAMENTE HACIA ABAJO
    worksheet.eachRow({ includeEmpty: true }, function(row: any) {
        row.eachCell({ includeEmpty: true }, function(cell: any) {
            cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
        });
    });

    //AJUSTAR ANCHO
    worksheet.getColumn('A').width = 30;   
    worksheet.getColumn('B').width = 30;   
        

    //DEFINIR CASILLAS CON BORDES
    const casillas = ["A1", "B1"]; 

    //APLICAR BORDE/FONDO/COLOR
    casillas.forEach((casilla) => {
      const celda = worksheet.getCell(casilla);
      celda.border = {
          top: { style: 'thin', color: { argb: '000000' } },    // Borde superior negro
          left: { style: 'thin', color: { argb: '000000' } },   // Borde izquierdo negro
          bottom: { style: 'thin', color: { argb: '000000' } }, // Borde inferior negro
          right: { style: 'thin', color: { argb: '000000' } }   // Borde derecho negro
      };
      celda.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: '456D98' } // Azul opaco
      };

      celda.font = {
          color: { argb: 'FFFFFF' } // Blanco
      }; 
    });

    // LLENAR DATA DE COLUMNAS
    datos.forEach((element: any, index: number) => {
      const rowNumber = index + 2; // Incrementar el número de fila con cada iteración
      worksheet.getCell(`A${rowNumber}`).value = element.c_nombre;                                           
      worksheet.getCell(`B${rowNumber}`).value = element.departamento;  
  });

    // Guardar el libro de Excel
    workbook.xlsx.writeBuffer().then((data: any) => {
        const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob, 'Lugar.xlsx');
    });
  }

  exportarExcelTipoTour(datos: any) {

    console.log("EXPORTAR", datos);
    const workbook = new Workbook();
    const worksheet: Worksheet = workbook.addWorksheet('Shet 1');

    const indexNum = 1; // index vertical
    worksheet.getCell(`A${indexNum}`).value = 'Código';
    worksheet.getCell(`A${indexNum}`).value = 'Descripción';
    
    // Establecer un ancho para todas las columnas
    worksheet.columns.forEach((column: any) => {
        column.width = 13;
    });

    //AJUSTAR AL CENTRO, MEDIO Y AUTOMÁTICAMENTE HACIA ABAJO
    worksheet.eachRow({ includeEmpty: true }, function(row: any) {
        row.eachCell({ includeEmpty: true }, function(cell: any) {
            cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
        });
    });

    //AJUSTAR ANCHO
    worksheet.getColumn('A').width = 30;   
    worksheet.getColumn('B').width = 100;   
        

    //DEFINIR CASILLAS CON BORDES
    const casillas = ["A1", "B1"]; 

    //APLICAR BORDE/FONDO/COLOR
    casillas.forEach((casilla) => {
      const celda = worksheet.getCell(casilla);
      celda.border = {
          top: { style: 'thin', color: { argb: '000000' } },    // Borde superior negro
          left: { style: 'thin', color: { argb: '000000' } },   // Borde izquierdo negro
          bottom: { style: 'thin', color: { argb: '000000' } }, // Borde inferior negro
          right: { style: 'thin', color: { argb: '000000' } }   // Borde derecho negro
      };
      celda.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: '456D98' } // Azul opaco
      };

      celda.font = {
          color: { argb: 'FFFFFF' } // Blanco
      }; 
    });

    // LLENAR DATA DE COLUMNAS
    datos.forEach((element: any, index: number) => {
      const rowNumber = index + 2; // Incrementar el número de fila con cada iteración
      worksheet.getCell(`A${rowNumber}`).value = element.c_codigo;                                           
      worksheet.getCell(`B${rowNumber}`).value = element.c_desripcion;  
  });

    // Guardar el libro de Excel
    workbook.xlsx.writeBuffer().then((data: any) => {
        const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob, 'TipoTours.xlsx');
    });
  }

  exportarExcelContenido(datos: any) {

    console.log("EXPORTAR", datos);
    const workbook = new Workbook();
    const worksheet: Worksheet = workbook.addWorksheet('Shet 1');

    const indexNum = 1; // index vertical
    worksheet.getCell(`A${indexNum}`).value = 'Tour';
    worksheet.getCell(`B${indexNum}`).value = 'Detalle';
    
    // Establecer un ancho para todas las columnas
    worksheet.columns.forEach((column: any) => {
        column.width = 13;
    });

    //AJUSTAR AL CENTRO, MEDIO Y AUTOMÁTICAMENTE HACIA ABAJO
    worksheet.eachRow({ includeEmpty: true }, function(row: any) {
        row.eachCell({ includeEmpty: true }, function(cell: any) {
            cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
        });
    });

    //AJUSTAR ANCHO
    worksheet.getColumn('A').width = 50;   
    worksheet.getColumn('B').width = 150;   
        

    //DEFINIR CASILLAS CON BORDES
    const casillas = ["A1", "B1"]; 

    //APLICAR BORDE/FONDO/COLOR
    casillas.forEach((casilla) => {
      const celda = worksheet.getCell(casilla);
      celda.border = {
          top: { style: 'thin', color: { argb: '000000' } },    // Borde superior negro
          left: { style: 'thin', color: { argb: '000000' } },   // Borde izquierdo negro
          bottom: { style: 'thin', color: { argb: '000000' } }, // Borde inferior negro
          right: { style: 'thin', color: { argb: '000000' } }   // Borde derecho negro
      };
      celda.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: '456D98' } // Azul opaco
      };

      celda.font = {
          color: { argb: 'FFFFFF' } // Blanco
      }; 
    });

    // LLENAR DATA DE COLUMNAS
    datos.forEach((element: any, index: number) => {
      const rowNumber = index + 2; // Incrementar el número de fila con cada iteración
      worksheet.getCell(`A${rowNumber}`).value = element.tour;
      worksheet.getCell(`B${rowNumber}`).value = element.c_detalle;                                            
  });

    // Guardar el libro de Excel
    workbook.xlsx.writeBuffer().then((data: any) => {
        const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob, 'ContenidoTour.xlsx');
    });
  }

  exportarExcelNoContenido(datos: any) {

    console.log("EXPORTAR", datos);
    const workbook = new Workbook();
    const worksheet: Worksheet = workbook.addWorksheet('Shet 1');

    const indexNum = 1; // index vertical
    worksheet.getCell(`A${indexNum}`).value = 'Tour';
    worksheet.getCell(`B${indexNum}`).value = 'Detalle';
    
    // Establecer un ancho para todas las columnas
    worksheet.columns.forEach((column: any) => {
        column.width = 13;
    });

    //AJUSTAR AL CENTRO, MEDIO Y AUTOMÁTICAMENTE HACIA ABAJO
    worksheet.eachRow({ includeEmpty: true }, function(row: any) {
        row.eachCell({ includeEmpty: true }, function(cell: any) {
            cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
        });
    });

    //AJUSTAR ANCHO
    worksheet.getColumn('A').width = 50;   
    worksheet.getColumn('B').width = 150;   
        

    //DEFINIR CASILLAS CON BORDES
    const casillas = ["A1", "B1"]; 

    //APLICAR BORDE/FONDO/COLOR
    casillas.forEach((casilla) => {
      const celda = worksheet.getCell(casilla);
      celda.border = {
          top: { style: 'thin', color: { argb: '000000' } },    // Borde superior negro
          left: { style: 'thin', color: { argb: '000000' } },   // Borde izquierdo negro
          bottom: { style: 'thin', color: { argb: '000000' } }, // Borde inferior negro
          right: { style: 'thin', color: { argb: '000000' } }   // Borde derecho negro
      };
      celda.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: '456D98' } // Azul opaco
      };

      celda.font = {
          color: { argb: 'FFFFFF' } // Blanco
      }; 
    });

    // LLENAR DATA DE COLUMNAS
    datos.forEach((element: any, index: number) => {
      const rowNumber = index + 2; // Incrementar el número de fila con cada iteración
      worksheet.getCell(`A${rowNumber}`).value = element.tour;
      worksheet.getCell(`B${rowNumber}`).value = element.c_detalle;                                            
  });

    // Guardar el libro de Excel
    workbook.xlsx.writeBuffer().then((data: any) => {
        const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob, 'No-ContenidoTour.xlsx');
    });
  }

  exportarExcelRecomendacion(datos: any) {

    console.log("EXPORTAR", datos);
    const workbook = new Workbook();
    const worksheet: Worksheet = workbook.addWorksheet('Shet 1');

    const indexNum = 1; // index vertical
    worksheet.getCell(`A${indexNum}`).value = 'Tour';
    worksheet.getCell(`B${indexNum}`).value = 'Detalle';
    
    // Establecer un ancho para todas las columnas
    worksheet.columns.forEach((column: any) => {
        column.width = 13;
    });

    //AJUSTAR AL CENTRO, MEDIO Y AUTOMÁTICAMENTE HACIA ABAJO
    worksheet.eachRow({ includeEmpty: true }, function(row: any) {
        row.eachCell({ includeEmpty: true }, function(cell: any) {
            cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
        });
    });

    //AJUSTAR ANCHO
    worksheet.getColumn('A').width = 50;   
    worksheet.getColumn('B').width = 150;   
        

    //DEFINIR CASILLAS CON BORDES
    const casillas = ["A1", "B1"]; 

    //APLICAR BORDE/FONDO/COLOR
    casillas.forEach((casilla) => {
      const celda = worksheet.getCell(casilla);
      celda.border = {
          top: { style: 'thin', color: { argb: '000000' } },    // Borde superior negro
          left: { style: 'thin', color: { argb: '000000' } },   // Borde izquierdo negro
          bottom: { style: 'thin', color: { argb: '000000' } }, // Borde inferior negro
          right: { style: 'thin', color: { argb: '000000' } }   // Borde derecho negro
      };
      celda.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: '456D98' } // Azul opaco
      };

      celda.font = {
          color: { argb: 'FFFFFF' } // Blanco
      }; 
    });

    // LLENAR DATA DE COLUMNAS
    datos.forEach((element: any, index: number) => {
      const rowNumber = index + 2; // Incrementar el número de fila con cada iteración
      worksheet.getCell(`A${rowNumber}`).value = element.tour;
      worksheet.getCell(`B${rowNumber}`).value = element.c_detalle;                                            
  });

    // Guardar el libro de Excel
    workbook.xlsx.writeBuffer().then((data: any) => {
        const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob, 'Recomendacion.xlsx');
    });
  }

  exportarExcelTour(datos: any) {

    console.log("EXPORTAR", datos);
    const workbook = new Workbook();
    const worksheet: Worksheet = workbook.addWorksheet('Shet 1');

    const indexNum = 1; // index vertical
    worksheet.getCell(`A${indexNum}`).value = 'Tour';
    worksheet.getCell(`B${indexNum}`).value = 'Precio';
    worksheet.getCell(`C${indexNum}`).value = 'Departamento';
    worksheet.getCell(`D${indexNum}`).value = 'Lugar';
    worksheet.getCell(`E${indexNum}`).value = 'Disponibilidad';
    worksheet.getCell(`F${indexNum}`).value = 'Edad';
    worksheet.getCell(`G${indexNum}`).value = 'N° personas';
    worksheet.getCell(`H${indexNum}`).value = 'Tipo Tour';
    
    // Establecer un ancho para todas las columnas
    worksheet.columns.forEach((column: any) => {
        column.width = 16;
    });

    //AJUSTAR AL CENTRO, MEDIO Y AUTOMÁTICAMENTE HACIA ABAJO
    worksheet.eachRow({ includeEmpty: true }, function(row: any) {
        row.eachCell({ includeEmpty: true }, function(cell: any) {
            cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
        });
    });

    //AJUSTAR ANCHO
    worksheet.getColumn('A').width = 80;   
    worksheet.getColumn('D').width = 20;   
    worksheet.getColumn('H').width = 50;    
        

    //DEFINIR CASILLAS CON BORDES
    const casillas = ["A1", "B1", "C1", "D1", "E1","F1" ,"G1" ,"H1"]; 

    //APLICAR BORDE/FONDO/COLOR
    casillas.forEach((casilla) => {
      const celda = worksheet.getCell(casilla);
      celda.border = {
          top: { style: 'thin', color: { argb: '000000' } },    // Borde superior negro
          left: { style: 'thin', color: { argb: '000000' } },   // Borde izquierdo negro
          bottom: { style: 'thin', color: { argb: '000000' } }, // Borde inferior negro
          right: { style: 'thin', color: { argb: '000000' } }   // Borde derecho negro
      };
      celda.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: '456D98' } // Azul opaco
      };

      celda.font = {
          color: { argb: 'FFFFFF' } // Blanco
      }; 
    });

    // LLENAR DATA DE COLUMNAS
    datos.forEach((element: Tour, index: number) => {
      const rowNumber = index + 2; // Incrementar el número de fila con cada iteración
      worksheet.getCell(`A${rowNumber}`).value = element.nombre;
      worksheet.getCell(`B${rowNumber}`).value = element.precio;                                            
      worksheet.getCell(`C${rowNumber}`).value = element.departamento;      
      worksheet.getCell(`D${rowNumber}`).value = element.lugar;      
      worksheet.getCell(`E${rowNumber}`).value = element.c_disponibilidad;      
      worksheet.getCell(`F${rowNumber}`).value = element.n_edad_min;      
      worksheet.getCell(`G${rowNumber}`).value = element.n_person_max;      
      worksheet.getCell(`H${rowNumber}`).value = element.c_desripcion;      
  });

    // Guardar el libro de Excel
    workbook.xlsx.writeBuffer().then((data: any) => {
        const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob, 'Tours.xlsx');
    });
  }
}
