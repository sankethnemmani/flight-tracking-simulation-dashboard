import { Flight } from '../core/models/flight.model';
import { FlightStatus } from '../core/enums/flight-status.enum';
 
export const MOCK_FLIGHTS: Flight[] = [
 
  {
    id: 'AI101',
    aircraftType: 'Airbus A320',
 
    departureAirport: 'DEL',
    destinationAirport: 'BLR',
 
    firRegion: 'Delhi FIR',
 
    latitude: 28.7041,
    longitude: 77.1025,
 
    altitude: 32000,
    speed: 780,
 
    status: FlightStatus.ENROUTE,
 
    eta: '14:30',
 
    lastUpdated: new Date(),
 
    route: {
      departureLat: 28.7041,
      departureLng: 77.1025,
 
      destinationLat: 12.9716,
      destinationLng: 77.5946
    }
  },
 
  {
    id: '6E203',
    aircraftType: 'Boeing 737',
 
    departureAirport: 'HYD',
    destinationAirport: 'BOM',
 
    firRegion: 'Hyderabad FIR',
 
    latitude: 17.3850,
    longitude: 78.4867,
 
    altitude: 29000,
    speed: 720,
 
    status: FlightStatus.DEPARTED,
 
    eta: '16:10',
 
    lastUpdated: new Date(),
 
    route: {
      departureLat: 17.3850,
      departureLng: 78.4867,
 
      destinationLat: 19.0760,
      destinationLng: 72.8777
    }
  },
 
  {
    id: 'UK778',
    aircraftType: 'Airbus A320',
 
    departureAirport: 'MAA',
    destinationAirport: 'CCU',
 
    firRegion: 'Chennai FIR',
 
    latitude: 13.0827,
    longitude: 80.2707,
 
    altitude: 31000,
    speed: 760,
 
    status: FlightStatus.ENROUTE,
 
    eta: '18:00',
 
    lastUpdated: new Date(),
 
    route: {
      departureLat: 13.0827,
      departureLng: 80.2707,
 
      destinationLat: 22.5726,
      destinationLng: 88.3639
    }
  },
 
  {
    id: 'SG512',
    aircraftType: 'Boeing 737 MAX',
 
    departureAirport: 'AMD',
    destinationAirport: 'GOI',
 
    firRegion: 'Mumbai FIR',
 
    latitude: 23.0225,
    longitude: 72.5714,
 
    altitude: 27000,
    speed: 690,
 
    status: FlightStatus.BOARDING,
 
    eta: '17:45',
 
    lastUpdated: new Date(),
 
    route: {
      departureLat: 23.0225,
      departureLng: 72.5714,
 
      destinationLat: 15.2993,
      destinationLng: 74.1240
    }
  },
 
  {
    id: 'EK202',
    aircraftType: 'Boeing 737',
 
    departureAirport: 'DXB',
    destinationAirport: 'LHR',
 
    firRegion: 'Dubai FIR',
 
    latitude: 25.2048,
    longitude: 55.2708,
 
    altitude: 36000,
    speed: 890,
 
    status: FlightStatus.ENROUTE,
 
    eta: '21:15',
 
    lastUpdated: new Date(),
 
    route: {
      departureLat: 25.2048,
      departureLng: 55.2708,
 
      destinationLat: 51.4700,
      destinationLng: -0.4543
    }
  },
 
  {
    id: 'AA450',
    aircraftType: 'Airbus A350',
 
    departureAirport: 'JFK',
    destinationAirport: 'LAX',
 
    firRegion: 'New York FIR',
 
    latitude: 40.7128,
    longitude: -74.0060,
 
    altitude: 34000,
    speed: 850,
 
    status: FlightStatus.ENROUTE,
 
    eta: '11:50',
 
    lastUpdated: new Date(),
 
    route: {
      departureLat: 40.6413,
      departureLng: -73.7781,
 
      destinationLat: 33.9416,
      destinationLng: -118.4085
    }
  },
  {
    id: 'QF12',
    aircraftType: 'Airbus A320',
 
    departureAirport: 'LAX',
    destinationAirport: 'SYD',
 
    firRegion: 'Pacific FIR',
 
    latitude: 34.0522,
    longitude: -118.2437,
 
    altitude: 39000,
    speed: 930,
 
    status: FlightStatus.ENROUTE,
 
    eta: '06:40',
 
    lastUpdated: new Date(),
 
    route: {
      departureLat: 33.9416,
      departureLng: -118.4085,
 
      destinationLat: -33.8688,
      destinationLng: 151.2093
    }
  },
 
  {
    id: 'AF225',
    aircraftType: 'Airbus A350',
 
    departureAirport: 'CDG',
    destinationAirport: 'NRT',
 
    firRegion: 'Paris FIR',
 
    latitude: 48.8566,
    longitude: 2.3522,
 
    altitude: 35000,
    speed: 870,
 
    status: FlightStatus.DELAYED,
 
    eta: '13:10',
 
    lastUpdated: new Date(),
 
    route: {
      departureLat: 49.0097,
      departureLng: 2.5479,
 
      destinationLat: 35.7719,
      destinationLng: 140.3929
    }
  },
 
  {
    id: 'LH760',
    aircraftType: 'Boeing 737 MAX',
 
    departureAirport: 'FRA',
    destinationAirport: 'DEL',
 
    firRegion: 'Frankfurt FIR',
 
    latitude: 50.1109,
    longitude: 8.6821,
 
    altitude: 37000,
    speed: 900,
 
    status: FlightStatus.ENROUTE,
 
    eta: '19:30',
 
    lastUpdated: new Date(),
 
    route: {
      departureLat: 50.0379,
      departureLng: 8.5622,
 
      destinationLat: 28.5562,
      destinationLng: 77.1000
    }
  }
 
];