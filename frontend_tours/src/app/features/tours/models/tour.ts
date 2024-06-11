export interface Tour {
    n_id_tours: number,
    nombre: string,
    precio: number,
    n_id_departamento: number,
    c_disponibilidad: string,
    n_edad_min: number,
    n_person_max: number,
    c_detalle: string,
    c_ubicacion: string,
    n_id_foto: number,
    n_id_tipo_tour: number,
    c_nombre: string,
    departamento: string,
    lugar: string,
    c_desripcion: string
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
        public c_ubicacion: string,
        public n_id_foto: number,
        public n_id_tipo_tour: number,
        public c_nombre: string,
        public departamento: string,
        public lugar: string,
        public c_desripcion: string
    ) {}
  }
