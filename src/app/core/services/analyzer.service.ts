import { Injectable } from '@angular/core';
import { HttpResponse, HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AnalyzerService {

    private resourceUrl = environment.apiUrl + ':8080';

    constructor(private httpClient: HttpClient) {

    }

    sendCoordinate(form: any): Observable<HttpResponse<any>> {
        const path = `${this.resourceUrl}/receive-coordinate`;
        return this.httpClient.post(path, form, {observe: 'response'});
    }

}
