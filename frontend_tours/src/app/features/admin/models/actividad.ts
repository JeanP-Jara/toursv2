export interface Actividad {
  n_id_actividad: number,
  n_id_tours: number,
  c_detalle: string
}

export interface IPrototypeActividad {
    n_id_actividad: number,
    n_id_tours: number,
    tour: string,
    c_detalle: string,
    clone(): IPrototypeActividad;
}

export interface ResponseActividad{
    estado: boolean,
    mensaje: string,
    data: IPrototypeActividad[]
}

export class PrototypeActividad implements IPrototypeActividad {
    constructor(
        public n_id_actividad: number,
        public n_id_tours: number,
        public tour: string,
        public c_detalle: string,
    ) {}
  
    clone(): IPrototypeActividad {
      return new PrototypeActividad(
        this.n_id_actividad,
        this.n_id_tours,
        this.tour,
        this.c_detalle
      );
    }
}

export class PrototypeActividadFactory {
    private prototypes: { [key: string]: IPrototypeActividad } = {};
  
    registerPrototype(key: string, prototype: IPrototypeActividad): void {
      this.prototypes[key] = prototype;
    }
  
    createClone(key: string): IPrototypeActividad {
      const prototype = this.prototypes[key];
      return prototype.clone();
    }
}
