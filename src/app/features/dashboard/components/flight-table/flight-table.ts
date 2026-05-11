import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { Flight } from '../../../../core/models/flight.model';
import { Router } from '@angular/router';
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-flight-table',
  imports: [CommonModule, MatTableModule, MatChipsModule],
  templateUrl: './flight-table.html',
  styleUrl: './flight-table.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlightTable {

  constructor(private router:Router){}

  @Input() flights: Flight[] | null = [];
  displayedColumns: string[] = [
    'id',
    'aircraftType',
    'departureAirport',
    'destinationAirport',
    'firRegion',
    'latitude',
    'longitude',
    'altitude',
    'speed',
    'status',
    'eta',
    'lastUpdated'
  ];

  getStatusClass(status: string): string {
    switch (status) {
      case 'Enroute':
        return 'status-enroute';

      case 'Delayed':
        return 'status-delayed';

      case 'Landed':
        return 'status-landed';

      case 'Boarding':
        return 'status-boarding';

      case 'Departed':
        return 'status-departed';

      default:
        return 'status-default';
    }
  }

  openFlightDetails(flightId:string):void{
    this.router.navigate(['/flight',flightId]);
  }
}
