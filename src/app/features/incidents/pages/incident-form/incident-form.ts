import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-incident-form',
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule],
  templateUrl: './incident-form.html',
  styleUrls: ['./incident-form.css']
})
export class IncidentForm implements OnInit {

  incidentForm!: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
    this.initializeDynamicValidation();
  }

  private initializeForm(): void {
    this.incidentForm = this.fb.group({
      flightId: ['', Validators.required],
      incidentType: ['', Validators.required],
      severity: ['', Validators.required],
      description: ['', [
        Validators.required,
        Validators.minLength(10)
      ]],
      timestamp: [new Date().toISOString(), Validators.required],
      assignedTeam: [''],
      communicationChannel: [''],
      communicationFailureReason: ['']
    });
  }

  private initializeDynamicValidation(): void {
    this.incidentForm.get('severity')?.valueChanges.subscribe(severity => {
      const assignedTeamControl =
        this.incidentForm.get('assignedTeam');
      if (severity === 'HIGH') {
        assignedTeamControl?.setValidators(Validators.required);
      } else {
        assignedTeamControl?.clearValidators();
      }
      assignedTeamControl?.updateValueAndValidity();
    });
    this.incidentForm.get('incidentType')?.valueChanges.subscribe(type => {
      const communicationChannel =
        this.incidentForm.get(
          'communicationChannel'
        );
      const communicationReason =
        this.incidentForm.get(
          'communicationFailureReason'
        );

      if (type === 'Communication Failure') {
        communicationChannel?.setValidators(Validators.required);
        communicationReason?.setValidators(Validators.required);
      } else {
        communicationChannel?.clearValidators();
        communicationReason?.clearValidators();
      }
      communicationChannel?.updateValueAndValidity();
      communicationReason?.updateValueAndValidity();
    });
  }

  submitIncident(): void {
    if (this.incidentForm.invalid) {
      this.incidentForm.markAllAsTouched();
      return;
    }
    console.log(this.incidentForm.value);
    alert('Incident submitted successfully');
    this.incidentForm.reset();
  }
}