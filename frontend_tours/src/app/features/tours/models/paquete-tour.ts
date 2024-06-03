import { Observable } from "rxjs";
import { ResponseTour } from "./tour";
import { TourService } from "../services/tour.service";

export interface PaqueteTour {
    getPaqueteTours(): Observable<ResponseTour>
}

export class ConcretePaqueteTour implements PaqueteTour {
    constructor(private excursionTourService: TourService, private request: any) {        
    }
    
    getPaqueteTours(): Observable<ResponseTour> {
        return this.excursionTourService.getTours(this.request);
    }
}
