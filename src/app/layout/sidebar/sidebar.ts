import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list'
import { MatIconModule } from '@angular/material/icon'
import { CommonModule } from '@angular/common';
import { Auth } from '../../core/services/auth';
import { UserRole } from '../../core/enums/user-role.enum';

@Component({
  selector: 'app-sidebar',
  imports: [RouterModule, MatListModule, MatIconModule, CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  UserRole = UserRole;
  constructor(public authService: Auth){}
}
