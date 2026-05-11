import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
 
import { Observable } from 'rxjs';
import { FlightAlert } from '../../../../core/models/alert.model';
import { Alert } from '../../../../core/services/alert';
 
@Component({
  selector: 'app-alert-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert-panel.html',
  styleUrls: ['./alert-panel.css']
})
export class AlertPanel {
 
  alerts$!: Observable<FlightAlert[]>;
 
  constructor( private alertService: Alert ) {
    this.alerts$ = this.alertService.alerts$;
  }
  getAlertClass(severity:string):string{
    switch(severity){
      case 'High':
        return 'alert-high';
      case 'Medium':
        return 'alert-medium';
      case 'Low':
        return 'alert-low';
      default:
        return 'alert-default';
    }
  }
 
}