import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { Auth } from '../../core/services/auth';
import { UserRole } from '../../core/enums/user-role.enum';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, FormsModule, MatToolbarModule, MatSelectModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  UserRole = UserRole;

  selectedRole = UserRole.SUPERVISOR;

  constructor(private authService: Auth, private router: Router) { }

  changeRole(role: UserRole): void {
    this.selectedRole = role;
    this.authService.setRole(role);

    const currentUrl = this.router.url;
    const restrictedRoutes = ['/incidents'];

    const isRestictedRoute = restrictedRoutes.includes(currentUrl);
    const isViewer = role === UserRole.VIEWER;
    if (isViewer && isRestictedRoute) {
      this.router.navigate(['/']);
    }
  }
}
