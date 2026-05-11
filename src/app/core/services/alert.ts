import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FlightAlert } from '../models/alert.model';

@Injectable({
  providedIn: 'root',
})
export class Alert {

  private alertsSuject = new BehaviorSubject<FlightAlert[]>([]);
  alerts$ = this.alertsSuject.asObservable();

  addAlert(alert: FlightAlert): void {
    const currentAlert = this.alertsSuject.value;
    this.alertsSuject.next([alert, ...currentAlert]);
  }

}
