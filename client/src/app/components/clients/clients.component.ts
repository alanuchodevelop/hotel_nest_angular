import {ChangeDetectionStrategy, ChangeDetectorRef, Component, inject} from '@angular/core';
import {HeaderComponent} from "@app/components/header/header.component";
import {User} from "@app/models/users.model";
import {UsersService} from "@app/services/users.service";
import {Router} from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [
    HeaderComponent,
    ReactiveFormsModule
  ],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientsComponent {
  // variables generales
  users: User[] = [];
  showModal = false;
  showModalEdit = false;
  IdSelected: number = 0;
  selectedUser: User | null = null;
  isEditMode = false;  // Bandera para identificar si es edición o creación


  // Formulario Reactivo
  userForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone_number: new FormControl('', [Validators.required])
  });

  private userService = inject(UsersService);
  private cdr = inject(ChangeDetectorRef);  // Inyecta ChangeDetectorRef
  private router = inject(Router);  // Inyecta ChangeDetectorRef
  private toastr = inject(ToastrService);
  ngOnInit(): void {
    this.getUser()
  }

  getUser() {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
      this.cdr.markForCheck();  // Forzar la detección de cambios
    });
  }

  eliminarCliente() {
    this.userService.deleteUser(this.IdSelected).subscribe({
      next: (data) => {
        this.getUser();
        this.closeModal();
        this.toastr.success('Operación exitosa!', 'Éxito');
      },
      error: (error) => {
        console.log(error)
        this.toastr.error('Fallo en eliminación')
      }
    })
  }

  redirect() {
    this.router.navigate(['inicio']);
  }

  // Método para abrir el modal y cargar los datos del usuario seleccionado
  openModalEdit(user: User) {
    this.showModalEdit = true
    this.IdSelected = user.id;
    this.selectedUser = user;

    this.isEditMode = true
    // Pre-cargar el formulario con los datos del usuario seleccionado
    this.userForm.setValue({
      name: user.name,
      email: user.email,
      phone_number: user.phone_number
    });
  }

  // Método para cerrar el modal
  closeModalEdit() {
    this.showModalEdit = false;
    this.IdSelected = 0;
    this.userForm.reset();  // Reiniciar el formulario
    this.isEditMode = false;
  }

  /**
   * add user or edit
   */
  saveUser() {
    if (this.userForm.valid) {
      const userData = this.userForm.value;

      if (this.isEditMode && this.IdSelected) {
        // Actualizar usuario existente
        const updatedUser = { ...this.selectedUser, ...userData };

        this.userService.updateUser(this.IdSelected, updatedUser).subscribe({
          next: () => {
            this.toastr.success('Cliente actualizado con éxito!', 'Éxito');
            this.closeModalEdit();  // Cerrar el modal
            this.getUser();  // Actualizar la lista de usuarios
          },
          error: (error) => {
            console.log(error);
            this.toastr.error('Error al actualizar el cliente', 'Error');
          }
        });
      } else {
        // Crear un nuevo usuario
        this.userService.createUser(userData as User).subscribe({
          next: (user) => {
            this.toastr.success('Usuario creado con éxito!', 'Éxito');
            this.closeModalEdit();  // Cerrar el modal
            this.getUser();  // Actualizar la lista de usuarios
          },
          error: (error) => {
            console.log(error);
            this.toastr.error('Error al crear el usuario', 'Error');
          }
        });
      }
    }
  }

  // Método para abrir el modal (añadir o editar)
  openModal(user?: User) {
    if (user) {
      // Modo edición
      this.isEditMode = true;
      this.IdSelected = user.id;
      this.selectedUser = user;

      // Pre-cargar el formulario con los datos del usuario
      this.userForm.setValue({
        name: user.name,
        email: user.email,
        phone_number: user.phone_number
      });
    } else {
      // Modo añadir
      this.isEditMode = false;
      this.userForm.reset();  // Limpiar el formulario para añadir un nuevo usuario
    }
    this.showModalEdit = true;
  }

  openModalDelete(id: number) {
    this.showModal = true;
    this.IdSelected = id;
  }

  // Método para cerrar el modal
  closeModal() {
    this.showModal = false;
    this.IdSelected = 0;
    this.userForm.reset();
  }

}
