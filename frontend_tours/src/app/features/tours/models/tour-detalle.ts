import { Actividad } from "../../admin/models/actividad";
import { Contenido } from "../../admin/models/contenido";
import { NoContenido } from "../../admin/models/no-contenido";
import { Recomendacion } from "../../admin/models/recomendacion";

export interface TourDetalle {
    n_id_tours: number,
    nombre: string,
    precio: number,
    n_id_departamento: number,
    departamento: string,
    c_disponibilidad: string,
    n_edad_min: number,
    n_person_max: number,
    c_detalle: string,
    c_ubicacion: string,
    n_id_foto: number,
    foto: string,
    n_id_tipo_tour: number,
    c_nombre: string,    
    lugar: string,
    c_desripcion: string,
    c_latitud: string,
    c_longitud: string,
    c_nombre1: string,
    c_ruta1: string,
    c_nombre2: string,
    c_ruta2: string,
    actividades: Actividad[],
    contenido: Contenido[],
    no_contenido: NoContenido[],
    recomendaciones: Recomendacion[]
}
