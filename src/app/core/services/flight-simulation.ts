import { Injectable } from '@angular/core';

import { BehaviorSubject, interval } from 'rxjs';
import { Flight } from '../models/flight.model';
import { MOCK_FLIGHTS } from '../../mock-data/mock-flights';
import { FlightStatus } from '../enums/flight-status.enum';
import { Alert } from './alert';
import { AlertSeverity } from '../enums/alert-severity.enum';
import { APP_CONSTANTS } from '../constants/app.constants';

@Injectable({
  providedIn: 'root'
})
export class FlightSimulationService {

  private flightsSubject = new BehaviorSubject<Flight[]>(MOCK_FLIGHTS);

  flights$ = this.flightsSubject.asObservable();

  constructor(private alertService: Alert) {
    this.startSimulation();
  }

  private startSimulation(): void {

    interval(APP_CONSTANTS.SIMULATION.UPDATE_INTERVAL).subscribe(() => {
      const updatedFlights = this.flightsSubject.value.map(flight => {
        const latDiff = flight.route.destinationLat - flight.latitude;
        const lngDiff = flight.route.destinationLng - flight.longitude;

        const movementFactor = 0.05;

        const newLatitude = flight.latitude + (latDiff * movementFactor);
        const newLongitude = flight.longitude + (lngDiff * movementFactor);

        const altitudeChange = Math.floor(Math.random() * 1000 - 500);
        const speedChange = Math.floor(Math.random() * 30 - 15);
        const reachedDestination = Math.abs(latDiff) < 0.1 && Math.abs(lngDiff) < 0.1;

        if (altitudeChange < -400) {
          this.alertService.addAlert({
            id: crypto.randomUUID(),
            flightId: flight.id,
            message:'Sudden altitude drop detected',
            severity: AlertSeverity.HIGH,
            timestamp: new Date()
          });
        }
        if (flight.speed > 850) {
          this.alertService.addAlert({
            id: crypto.randomUUID(),
            flightId: flight.id,
            message:'Speed threshold exceeded',
            severity: AlertSeverity.MEDIUM,
            timestamp: new Date()
          });
        }

        return {
          ...flight,
          latitude: reachedDestination ? flight.route.destinationLat : newLatitude,
          longitude: reachedDestination ? flight.route.destinationLng : newLongitude,
          altitude: reachedDestination ? 0 : Math.max(1000, flight.altitude + altitudeChange),
          speed: reachedDestination ? 0 : Math.max(300, flight.speed + speedChange),
          status: reachedDestination ? FlightStatus.LANDED : FlightStatus.ENROUTE,
          lastUpdated: new Date()
        };
      });
      this.flightsSubject.next(updatedFlights);
    });

  }
}