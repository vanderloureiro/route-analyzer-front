import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RouteService {

    private resourceUrl = environment.apiUrl + ':8080';

    constructor(private httpClient: HttpClient) {

    }

    createRoute(form: any): Observable<HttpResponse<any>> {
        const path = `${this.resourceUrl}/route`;
        return this.httpClient.post(path, form, {observe: 'response'});
    }

    createStop(form: any): Observable<HttpResponse<any>> {
        const path = `${this.resourceUrl}/route/stop`;
        return this.httpClient.post(path, form, {observe: 'response'});
    }

    getRouteById(routeId: number): Observable<HttpResponse<any>> {
        const path = `${this.resourceUrl}/route/${routeId}`;
        return this.httpClient.get(path, {observe: 'response'});
    }

}
