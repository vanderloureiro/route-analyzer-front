import { Component, OnInit, OnDestroy } from '@angular/core';

import { concatMap } from 'rxjs/operators';

import { RouteService } from 'src/app/core/services/route.service';
import { CoordinateForm } from 'src/app/core/models/coordinate-form';
import { CoordinateStoreService } from 'src/app/core/services/coordinate-store.service';
import { AnalyzerService } from 'src/app/core/services/analyzer.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  route1: any;
  route2: any;
  createStopsCompleted: boolean;
  createClock;
  createClockCoordinate;
  coordinateList: CoordinateForm[];
  currentCoordinateRequest: CoordinateForm;
  currentCoordinateIndex: number;

  constructor(
    private routeService: RouteService,
    private coordinateStoreService: CoordinateStoreService,
    private analyzerService: AnalyzerService
  ) { }

  ngOnInit() {
    this.coordinateStoreService.coordinates$.subscribe(
      response => this.coordinateList = response
    );
  }

  ngOnDestroy() {
    if (this.createClock) {
      clearInterval(this.createClock);
    }
    if (this.createClockCoordinate) {
      clearInterval(this.createClockCoordinate);
    }
  }

  initializeCoordinateForm() {
    this.currentCoordinateIndex   = 0;
    this.currentCoordinateRequest = this.coordinateList[0];
    this.setCorrectIdRoute();
  }

  setCorrectIdRoute() {
    if (this.currentCoordinateRequest.routeId === 1) {
      this.currentCoordinateRequest.routeId = this.route1.id;
    } else {
      this.currentCoordinateRequest.routeId = this.route2.id;
    }
  }

  createRoutes() {
    const route1 = { routePlan: 'M Dias Branco' };
    const route2 = { routePlan: 'Coca Cola' };
    this.routeService.createRoute(route1).pipe(concatMap(
      response1 => {
        this.route1 = response1.body;
        return this.routeService.createRoute(route2);
      }
    )).subscribe(
      response2 => {
        this.route2 = response2.body;
        this.initializeCoordinateForm();
      },
      erro => console.log(erro)
    );
  }

  createStopForRoute() {
    const stop1 = {
      routeId: this.route1.id,
      latitude: -4.836297,
      longitude: -37.779205,
      sequence: 1,
      description: 'Mercadinho 1',
      deliveryRadius: 50,
    };
    const stop2 = {
      routeId: this.route1.id,
      latitude: -4.8410472,
      longitude: -37.7821715,
      sequence: 2,
      description: 'Mercadinho 2',
      deliveryRadius: 50,
    };
    const stop3 = {
      routeId: this.route1.id,
      latitude: -4.8451713,
      longitude: -37.7830719,
      sequence: 3,
      description: 'Bar',
      deliveryRadius: 50,
    };
    const stop4 = {
      deliveryRadius: 50,
      description: 'Super mercado 1',
      latitude: -4.835797,
      longitude: -37.781079,
      routeId: this.route2.id,
      sequence: 1
    };
    const stop5 = {
      deliveryRadius: 50,
      description: 'Super mercado 2',
      latitude: -4.840811,
      longitude: -37.785255,
      routeId: this.route2.id,
      sequence: 2
    };
    this.routeService.createStop(stop1).pipe(
      concatMap(result1 => this.routeService.createStop(stop2)),
      concatMap(result2 => this.routeService.createStop(stop3)),
      concatMap(result3 => this.routeService.createStop(stop4)),
      concatMap(result4 => this.routeService.createStop(stop5)),
    ).subscribe(
      result5 => {
        this.createStopsCompleted = true;
        this.startGetDetailsRoutes();
        console.log('sucess', result5);
      },
      erro => console.log('Error', erro)
    );
  }

  startGetDetailsRoutes() {
    this.getDetailsRoutes();
    this.createClock = setInterval(() => this.getDetailsRoutes(), 1000);
  }

  getDetailsRoutes() {
    this.routeService.getRouteById(this.route1.id).subscribe(
      response => this.route1 = response.body
    );
    this.routeService.getRouteById(this.route2.id).subscribe(
      response => this.route2 = response.body
    );
  }


  startPostCoordinate() {
    this.postCoordinate();
    this.createClockCoordinate = setInterval(() => this.postCoordinate(), 3000);
  }

  postCoordinate() {
    this.currentCoordinateIndex += 1;
    if (this.currentCoordinateIndex < this.coordinateList.length ) {
      this.currentCoordinateRequest = this.coordinateList[this.currentCoordinateIndex];
      this.setCorrectIdRoute();
      console.log('request: ', this.currentCoordinateRequest);
      this.analyzerService.sendCoordinate(this.currentCoordinateRequest).subscribe(
        response => {}
      );
    }
  }




}
