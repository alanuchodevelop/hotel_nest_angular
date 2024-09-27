import {ChangeDetectionStrategy, ChangeDetectorRef, Component, inject} from '@angular/core';
import {HeaderComponent} from "@app/components/header/header.component";
import {Room} from "@app/models";
import {RoomsService} from "@app/services";
import {User} from "@app/models/users.model";
import {UsersService} from "@app/services/users.service";

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [
    HeaderComponent
  ],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientsComponent {
  // variables generales
  users: User[] = [];
  showModal = false;

  private userService = inject(UsersService);
  private cdr = inject(ChangeDetectorRef);  // Inyecta ChangeDetectorRef

  ngOnInit(): void {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
      this.cdr.markForCheck();  // Forzar la detección de cambios
    });
  }

  // Método para abrir el modal
  openModal() {
    this.showModal = true;
  }

  // Método para cerrar el modal
  closeModal() {
    this.showModal = false;
  }

  eliminarCliente() {
    this.userService
  }
}
