import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';
import { UserRole } from '../enums/user-role.enum';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private currentUserSubject = new BehaviorSubject<User>({
      id: '1',
      name: 'ATC Supervisor',
      role: UserRole.SUPERVISOR
    });

  currentUser$ = this.currentUserSubject.asObservable();

  get currentUser(): User {
    return this.currentUserSubject.value;
  }

  setRole(role: UserRole): void {
    this.currentUserSubject.next({...this.currentUser, role});
  }

  hasRole(roles: UserRole[]): boolean {
    return roles.includes(
      this.currentUser.role
    );
  }
}