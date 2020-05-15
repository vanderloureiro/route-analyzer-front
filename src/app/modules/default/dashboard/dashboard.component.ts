import { Component, OnInit } from '@angular/core';

import { concatMap } from 'rxjs/operators';

import { RouteService } from 'src/app/core/services/route.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  route1: any;
  route2: any;
  stops1Completed: boolean;
  stops2Completed: boolean;

  constructor(
    private routeService: RouteService
  ) { }

  ngOnInit() {
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
      },
      erro => console.log(erro)
    );
  }

  createStopForRoute() {
    this.createStopForRoute1();
    this.createStopForRoute2();
  }


  createStopForRoute1() {
    const stop1 = {
      routeId: 1,
      latitude: -4.8367977,
      longitude: -37.7802403,
      sequence: 1,
      description: 'Mercadinho 1',
      deliveryRadius: 50,
    };
    const stop2 = {
      routeId: 1,
      latitude: -4.8410472,
      longitude: -37.7821715,
      sequence: 2,
      description: 'Mercadinho 2',
      deliveryRadius: 50,
    };
    const stop3 = {
      routeId: 1,
      latitude: -4.8451713,
      longitude: -37.7830719,
      sequence: 3,
      description: 'Bar',
      deliveryRadius: 50,
    };
    this.routeService.createStop(stop1).pipe(
      concatMap(result1 => this.routeService.createStop(stop2)),
      concatMap(result2 => this.routeService.createStop(stop3))
    ).subscribe(
      result3 => {
        this.stops1Completed = true;
        console.log('sucess', result3);
      },
      erro => console.log('Error', erro)
    );
  }

  createStopForRoute2() {
    const stop1 = {
      deliveryRadius: 50,
      description: 'Super mercado 1',
      latitude: -4.835797,
      longitude: -37.781079,
      routeId: 2,
      sequence: 1
    };
    const stop2 = {
      deliveryRadius: 50,
      description: 'Super mercado 2',
      latitude: -4.840811,
      longitude: -37.785255,
      routeId: 2,
      sequence: 2
    };
    this.routeService.createStop(stop1).pipe(
      concatMap(result1 => this.routeService.createStop(stop2))
    ).subscribe(
      result2 => {
        this.stops2Completed = true;
        console.log('sucess', result2);
      },
      erro => console.log('Error', erro)
    );

  }

}
