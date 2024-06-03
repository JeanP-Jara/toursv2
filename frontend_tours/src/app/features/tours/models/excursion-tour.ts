import { Observable } from "rxjs";
import { TourService } from "../services/tour.service";
import { ResponseTour } from "./tour";

export interface ExcursionTour {
    getExcursionTours(): Observable<ResponseTour>
}

export class ConcreteExcursionTour implements ExcursionTour {
    constructor(
        private excursionTourService: TourService,
        private request: any
    ) {}
    
    getExcursionTours(): Observable<ResponseTour> {
        return this.excursionTourService.getTours(this.request);
    }
}