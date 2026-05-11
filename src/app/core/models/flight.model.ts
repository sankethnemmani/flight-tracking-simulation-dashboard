import { FlightStatus } from "../enums/flight-status.enum";

export interface Flight {
    id: string;
    aircraftType: string;

    departureAirport: string;
    destinationAirport: string;

    firRegion: string;

    latitude: number;
    longitude: number;

    altitude: number;
    speed: number;

    status: FlightStatus;

    eta: string;
    lastUpdated: Date;

    route: FlightRoute;
}

export interface FlightRoute {
    departureLat: number;
    departureLng: number;

    destinationLat: number;
    destinationLng: number;
}