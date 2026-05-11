import { Routes } from '@angular/router';
import { MainLayout } from './layout/main-layout/main-layout';
import { roleGuard } from './core/guards/role-guard';
import { UserRole } from './core/enums/user-role.enum';

export const routes: Routes = [
    {
        path: '',
        component: MainLayout,
        children: [
            {
                path: '',
                loadComponent: () => import('./features/dashboard/pages/flight-dashboard/flight-dashboard').then(m => m.FlightDashboard)
            },
            {
                path: 'flight/:id',
                loadComponent: () => import('./features/dashboard/pages/flight-details/flight-details').then(m => m.FlightDetails)
            },
            {
                path: 'incidents',
                canActivate:[roleGuard],
                data: {roles:[UserRole.SUPERVISOR,UserRole.CONTROLLER]},
                loadComponent: () => import('./features/incidents/pages/incident-form/incident-form').then(m => m.IncidentForm)
            }
        ]
    },
    {
        path: '**',
        redirectTo: ''
    }
];
