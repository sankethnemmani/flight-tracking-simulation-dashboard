import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Flight } from '../../../../core/models/flight.model';
import { FlightSimulationService } from '../../../../core/services/flight-simulation';

@Component({
  selector: 'app-flight-details',
  imports: [CommonModule],
  templateUrl: './flight-details.html',
  styleUrl: './flight-details.css',
})
export class FlightDetails {
  flight$!: Observable<Flight | undefined>;

  constructor(private route: ActivatedRoute, private flighSimulationService: FlightSimulationService) {
    const flightId = this.route.snapshot.paramMap.get('id');
    this.flight$ = this.flighSimulationService.flights$.pipe(map(
      flights => flights.find(flight => flight.id === flightId)
    ))
  }
}
