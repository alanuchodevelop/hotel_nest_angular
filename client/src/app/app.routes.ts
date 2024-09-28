import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',  // Redirigir sin el '/'
    pathMatch: 'full'
  },
  {
    path: 'rooms',
    loadComponent: () => import('./components/rooms/rooms.component').then(
      (m) => m.RoomsComponent,
    ),
  },
  {
    path: 'usuarios',
    loadComponent: () => import('./components/clients/clients.component').then(
      (m) => m.ClientsComponent,
    ),
  },
  {
    path: 'inicio',
    loadComponent: () => import('./components/inicio/inicio.component').then(
      (m) => m.InicioComponent,
    ),
  },
  {
    path: 'reservaciones',
    loadComponent: () => import('./components/reservations/reservations.component').then(
      (m) => m.ReservationsComponent,
    ),
  },
];
