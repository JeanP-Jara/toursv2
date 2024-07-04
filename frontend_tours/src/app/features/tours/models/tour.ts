export interface Tour {
    n_id_tours: number,
    nombre: string,
    precio: number,
    n_id_departamento: number,
    c_disponibilidad: string,
    n_edad_min: number,
    n_person_max: number,
    c_detalle: string,
    c_latitud: string,
    c_longitud: string,
    n_id_tipo_tour: number,
    c_nombre: string,
    departamento: string,
    n_id_lugar: number,
    lugar: string,
    c_desripcion: string,
    c_nombre1:string,
    c_ruta1: string,
    c_nombre2:string,
    c_ruta2: string
}

export interface ResponseTour{
    estado: boolean,
    mensaje: string,
    data: Tour[]
}

export class classTour implements Tour {
    constructor(
        public n_id_tours: number,
        public nombre: string,
        public precio: number,
        public n_id_departamento: number,
        public c_disponibilidad: string,
        public n_edad_min: number,
        public n_person_max: number,
        public c_detalle: string,
        public c_latitud: string,
        public c_longitud: string,
        public n_id_foto: number,
        public n_id_tipo_tour: number,
        public c_nombre: string,
        public departamento: string,
        public n_id_lugar: number,
        public lugar: string,
        public c_desripcion: string,
        public c_nombre1: string,
        public c_ruta1: string,
        public c_nombre2: string,
        public c_ruta2: string
    ) {}
    
  }
