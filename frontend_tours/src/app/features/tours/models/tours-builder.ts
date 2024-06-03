import { Tour, classTour } from "./tour";

export class TourBuilder{
    private n_id_tours!: number;   
    private nombre!: string;
    private precio!: number;
    private n_id_departamento!: number;
    private c_disponibilidad!: string;
    private n_edad_min!: number;
    private n_person_max!: number;
    private c_detalle!: string;
    private c_ubicacion!: string;
    private n_id_foto!: number;
    private n_id_tipo_tour!: number;
    private c_nombre!: string;
    private departamento!: string;
    private lugar!: string;

    public setIdTours(n_id_tours: number): TourBuilder {
        this.n_id_tours = n_id_tours;
        return this;
    }

    public setNombre(nombre: string): TourBuilder {
        this.nombre = nombre;
        return this;
    }

    public setPrecio(precio: number): TourBuilder {
        this.precio = precio;
        return this;
    }

    public setIdDepartamento(n_id_departamento: number): TourBuilder {
        this.n_id_departamento = n_id_departamento;
        return this;
    }

    public setDisponibilidad(c_disponibilidad: string): TourBuilder {
        this.c_disponibilidad = c_disponibilidad;
        return this;
    }

    public setEdadMin(n_edad_min: number): TourBuilder {
        this.n_edad_min = n_edad_min;
        return this;
    }

    public setPersonMax(n_person_max: number): TourBuilder {
        this.n_person_max = n_person_max;
        return this;
    }

    public setDetalle(c_detalle: string): TourBuilder {
        this.c_detalle = c_detalle;
        return this;
    }

    public setUbicacion(c_ubicacion: string): TourBuilder {
        this.c_ubicacion = c_ubicacion;
        return this;
    }

    public setIdFoto(n_id_foto: number): TourBuilder {
        this.n_id_foto = n_id_foto;
        return this;
    }

    public setIdTipoTour(n_id_tipo_tour: number): TourBuilder {
        this.n_id_tipo_tour = n_id_tipo_tour;
        return this;
    }

    public setCNombre(c_nombre: string): TourBuilder {
        this.c_nombre = c_nombre;
        return this;
    }

    public setDepartamento(departamento: string): TourBuilder {
        this.departamento = departamento;
        return this;
    }

    public setLugar(lugar: string): TourBuilder {
        this.lugar = lugar;
        return this;
    }

    build(): Tour {
        return new classTour(
            this.n_id_tours,
            this.nombre,
            this.precio,
            this.n_id_departamento,
            this.c_disponibilidad,
            this.n_edad_min,
            this.n_person_max,
            this.c_detalle,
            this.c_ubicacion,
            this.n_id_foto,
            this.n_id_tipo_tour,
            this.c_nombre,
            this.departamento,
            this.lugar
        );
    }
}