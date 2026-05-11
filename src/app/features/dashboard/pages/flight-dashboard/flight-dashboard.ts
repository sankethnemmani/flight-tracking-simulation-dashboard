import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { BehaviorSubject, combineLatest, debounceTime, distinctUntilChanged, map, Observable } from 'rxjs';

import { Flight } from '../../../../core/models/flight.model';
import { FlightSimulationService } from '../../../../core/services/flight-simulation';
import { FlightTable } from '../../components/flight-table/flight-table';
import { FlightMap } from '../../../map/components/flight-map/flight-map';
import { AlertPanel } from '../../../map/components/alert-panel/alert-panel';
import { FlightAlert } from '../../../../core/models/alert.model';
import { Alert } from '../../../../core/services/alert';
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-flight-dashboard',
  imports: [CommonModule, FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule, FlightTable, FlightMap, AlertPanel],
  templateUrl: './flight-dashboard.html',
  styleUrls: ['./flight-dashboard.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlightDashboard {
  flights$!: Observable<Flight[]>;
  search$ = new BehaviorSubject<string>('');
  alerts$!: Observable<FlightAlert[]>;

  statusFilter$ = new BehaviorSubject<string>('');

  aircraftFilter$ = new BehaviorSubject<string>('');

  firFilter$ = new BehaviorSubject<string>('');

  constructor(private flightSimulationService: FlightSimulationService, private alertService: Alert) {
    this.flights$ = combineLatest([
      this.flightSimulationService.flights$,
      this.search$.pipe(
        debounceTime(300),
        distinctUntilChanged()
      ),
      this.statusFilter$,
      this.aircraftFilter$,
      this.firFilter$
    ]).pipe(map(([flights, searchTerm, status, aircraft, fir]) => {
      return flights.filter(flight => {
        const matchesSearch = !searchTerm || flight.id.toLowerCase().includes(searchTerm.toLowerCase()) || flight.departureAirport.toLowerCase().includes(searchTerm.toLowerCase()) || flight.destinationAirport.toLowerCase().includes(searchTerm.toLowerCase()) || flight.firRegion.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = !status || flight.status === status;
        const matchesAircraft = !aircraft || flight.aircraftType === aircraft;
        const matchesFir = !fir || flight.firRegion === fir;
        return (matchesSearch && matchesStatus && matchesAircraft && matchesFir);
      });
    })
    );
    this.alerts$ = this.alertService.alerts$;
  }

  onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.search$.next(value);
  }

  onStatusChange(value: string): void {
    this.statusFilter$.next(value);
  }

  onAircraftChange(value: string): void {
    this.aircraftFilter$.next(value);
  }

  onFirChange(value: string): void {
    this.firFilter$.next(value);
  }
}