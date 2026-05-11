import { AlertSeverity } from "../enums/alert-severity.enum";

export interface FlightAlert {
    id: string;
    flightId: string;
    message: string;
    severity: AlertSeverity;
    timestamp: Date;
}