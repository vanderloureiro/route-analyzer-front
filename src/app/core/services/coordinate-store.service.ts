import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { CoordinateForm } from '../models/coordinate-form';

@Injectable({
    providedIn: 'root'
})
export class CoordinateStoreService {

    private coordinates = new BehaviorSubject<CoordinateForm[]>([]);
    readonly coordinates$ = this.coordinates.asObservable();

    constructor() {
        this.coordinates.next(this.dataBaseCoordinates);
    }

    // coronel raimundo francisco
    private dataBaseCoordinates: CoordinateForm[] = [
        {
            instant: '2020-05-15T00:02:24.311Z',
            latitude: -4.8353324,
            longitude: -37.7786842,
            routeId: 1
        },
        {
            instant: '2020-05-15T00:05:59.322Z',
            latitude: -4.8361357,
            longitude: -37.7791358,
            routeId: 1
        },
        {
            instant: '2020-05-15T00:28:24.292Z',
            latitude: -4.8361357,
            longitude: -37.7791358,
            routeId: 1
        }
        ,
        {
            instant: '2020-05-15T00:42:27.203Z',
            latitude: -4.8370596,
            longitude: -37.7798111,
            routeId: 1
        },
        {
            instant: '2020-05-15T00:45:03.256Z',
            latitude: -4.840927,
            longitude: -37.782094,
            routeId: 1
        },
        {
            instant: '2020-05-15T00:50:07.256Z',
            latitude: -4.841017,
            longitude: -37.782105,
            routeId: 1
        },
        {
            instant: '2020-05-15T00:52:26.017Z',
            latitude: -4.842106,
            longitude: -37.782251,
            routeId: 1
        },
        {
            instant: '2020-05-15T01:46:17.980Z',
            latitude: -4.845021,
            longitude: -37.782672,
            routeId: 1
        },
        {
            instant: '2020-05-15T01:52:17.980Z',
            latitude: -4.845021,
            longitude: -37.782672,
            routeId: 1
        },
        {
            instant: '2020-05-15T01:55:30.659Z',
            latitude: -4.846180,
            longitude: -37.782826,
            routeId: 1
        }

    ];


    // simao de gois
    private dataBaseCoordinates2: CoordinateForm[] = [
        {
            instant: '2020-05-15T02:08:44.438Z',
            latitude: -4.834789,
            longitude: -37.780278,
            routeId: 1
        },
        {
            instant: '2020-05-15T02:08:48.438Z',
            latitude: -4.835748,
            longitude: -37.781088,
            routeId: 1
        },
        {
            instant: '2020-05-15T02:15:48.438Z',
            latitude: -4.835748,
            longitude: -37.781088,
            routeId: 1
        },
        {
            instant: '2020-05-15T02:18:48.438Z',
            latitude: -4.837488,
            longitude: -37.782531,
            routeId: 1
        },
        {
            instant: '2020-05-15T02:22:48.438Z',
            latitude: -4.839158,
            longitude: -37.783821,
            routeId: 1
        },
        {
            instant: '2020-05-15T02:24:48.438Z',
            latitude: -4.840786,
            longitude: -37.785259,
            routeId: 1
        },
        {
            instant: '2020-05-15T02:34:48.438Z',
            latitude: -4.840786,
            longitude: -37.785259,
            routeId: 1
        },
        {
            instant: '2020-05-15T02:38:48.438Z',
            latitude: -4.841342,
            longitude: -37.785895,
            routeId: 1
        }
    ];


}
