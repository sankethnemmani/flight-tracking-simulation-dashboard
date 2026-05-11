import { Component, AfterViewInit, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';
import { Flight } from '../../../../core/models/flight.model';
import { APP_CONSTANTS } from '../../../../core/constants/app.constants';

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',

  iconUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',

  shadowUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
});

@Component({
  selector: 'app-flight-map',
  imports: [CommonModule],
  templateUrl: './flight-map.html',
  styleUrl: './flight-map.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlightMap implements AfterViewInit, OnChanges {
  @Input() flights: Flight[] | null = [];

  private map!: L.Map;
  private aircraftMarkers: L.Marker[] = [];
  private departureMarkers: L.Marker[] = [];
  private destinationMarkers: L.Marker[] = [];
  private routeLines: L.Polyline[] = [];

  ngAfterViewInit(): void {
    this.initializeMap();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['flights'] && this.map) {
      this.renderFlights();
    }
  }

  private initializeMap(): void {
    this.map = L.map('flight-map', {
      center: [20.5937, 78.9629],
      zoom: APP_CONSTANTS.MAP.DEFAULT_ZOOM
    });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution: '&copy; OpenStreetMap contributors'
      }
    ).addTo(this.map);
    this.renderFlights();
  }

  private renderFlights(): void {
    this.clearMapLayers();
    this.flights?.forEach(flight => {
      const departureIcon = L.icon({
        iconUrl: 'departure-marker.png',
        iconSize: [32, 32],
        iconAnchor: [16, 32]
      });

      const destinationIcon = L.icon({
        iconUrl: 'destination-marker.png',
        iconSize: [32, 32],
        iconAnchor: [16, 32]
      });

      const aircraftIcon = L.icon({
        iconUrl: 'aircraft-marker.png',
        iconSize: [40, 40],
        iconAnchor: [20, 20]
      });

      const departureMarker = L.marker(
        [flight.route.departureLat, flight.route.departureLng],
        {
          icon: departureIcon
        }
      ).addTo(this.map).bindPopup(`<b>Departure Airport</b><br>${flight.departureAirport}`);

      this.departureMarkers.push(
        departureMarker
      );

      const destinationMarker = L.marker(
        [flight.route.destinationLat, flight.route.destinationLng],
        {
          icon: destinationIcon
        }
      ).addTo(this.map).bindPopup(`<b>Destination Airport</b><br>${flight.destinationAirport}`);

      this.destinationMarkers.push(
        destinationMarker
      );

      const aircraftMarker = L.marker(
        [flight.latitude, flight.longitude],
        {
          icon: aircraftIcon
        }
      ).addTo(this.map).bindPopup(`<div style="min-width:180px">
        <h3>${flight.id}</h3>
        <p>
          ${flight.departureAirport} -> ${flight.destinationAirport}
        </p>
 
        <p>
          <b>Status:</b>
          ${flight.status}
        </p>
 
        <p>
          <b>Speed:</b>
          ${flight.speed} km/h
        </p>
 
        <p>
          <b>Altitude:</b>
          ${flight.altitude} ft
        </p>
 
        <p>
          <b>Coordinates:</b><br>
          ${flight.latitude.toFixed(2)},
          ${flight.longitude.toFixed(2)}
        </p>
 
      </div>
    `);

      this.aircraftMarkers.push(
        aircraftMarker
      );

      const routeLine = L.polyline(
        [
          [
            flight.route.departureLat,
            flight.route.departureLng
          ],
          [
            flight.route.destinationLat,
            flight.route.destinationLng
          ]
        ],
        {
          color: '#38bdf8',
          weight: 3
        }
      );
      routeLine.addTo(this.map);
      this.routeLines.push(routeLine);
    });
  }

  private clearMapLayers(): void {
    this.aircraftMarkers.forEach(marker => {
      this.map.removeLayer(marker);
    });

    this.departureMarkers.forEach(marker => {
      this.map.removeLayer(marker);
    });

    this.destinationMarkers.forEach(marker => {
      this.map.removeLayer(marker);
    });

    this.routeLines.forEach(line => {
      this.map.removeLayer(line);
    });

    this.aircraftMarkers = [];
    this.departureMarkers = [];
    this.destinationMarkers = [];
    this.routeLines = [];
  }
}
