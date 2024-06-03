import { Observable } from "rxjs";
import { TourService } from "../services/tour.service";
import { ConcreteExcursionTour, ExcursionTour } from "./excursion-tour";
import { ConcretePaqueteTour, PaqueteTour } from "./paquete-tour";
import { ResponseTour } from "./tour";

export interface AbstractTourFactory {
    getExcursionTour(): Observable<ResponseTour>;
    getPaqueteTour(): Observable<ResponseTour>;
}

export class ExcursionTourFactory implements AbstractTourFactory {

    constructor(private excursionTourService: TourService, private request: any) {        
    }

    getExcursionTour(): Observable<ResponseTour> {
        return new ConcreteExcursionTour(this.excursionTourService, this.request).getExcursionTours();
    }

    getPaqueteTour(): Observable<ResponseTour> {
        return new ConcretePaqueteTour(this.excursionTourService, this.request).getPaqueteTours();
    }
}

export class PaqueteTourFactory implements AbstractTourFactory {
    
    constructor(private excursionTourService: TourService, private request: any) {        
    }

    getExcursionTour(): Observable<ResponseTour> {
        return new ConcreteExcursionTour(this.excursionTourService, this.request).getExcursionTours();
    }

    getPaqueteTour(): Observable<ResponseTour> {
        return new ConcretePaqueteTour(this.excursionTourService, this.request).getPaqueteTours();
    }
}