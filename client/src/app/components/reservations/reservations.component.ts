import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ToastrService} from 'ngx-toastr';
import {ReservationsService} from '@app/services/reservations.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {User} from "@app/models/users.model";
import {Reservation, Room} from "@app/models";
import {RoomsService, UsersService} from "@app/services";
import {HeaderComponent} from "@app/components/header/header.component";

@Component({
  selector: 'app-reservations',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, HeaderComponent],
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReservationsComponent implements OnInit {
  reservationForm: FormGroup;
  today: Date = new Date();
  users: User[] = [];
  rooms: Room[] = [];
  todayString: string = '';
  endDateMin: string = '';
  reservations: Reservation[] = [];
  showModalDelete = false;
  idForDeleteSelected: number = 0;
  isEditMode: boolean = false;  // Para alternar entre crear y editar
  reservationToEdit: Reservation | null = null;  // Para almacenar la reservación a editar

  constructor(
    private fb: FormBuilder,
    private reservationsService: ReservationsService,
    private toastr: ToastrService,
    private usersService: UsersService,
    private roomsService: RoomsService,
    private cdr: ChangeDetectorRef
  ) {
    this.reservationForm = this.fb.group({
      userId: ['', Validators.required],  // Campo para el usuario
      roomId: ['', Validators.required],
      startDate: ['', [Validators.required, this.futureDateValidator.bind(this)]],
      endDate: [{
        value: '',
        disabled: true
      }, [Validators.required, this.maxStayValidator.bind(this), this.bookingWindowValidator.bind(this)]]
    });
  }

  ngOnInit(): void {
    this.loadReservations() // carga las reservaciones
    this.loadUsers();
    this.loadAvailableRooms();

    // Calcular el valor mínimo de startDate (la fecha de hoy)
    this.todayString = this.formatDate(this.today);
    // cambios en startDate
    this.reservationForm.get('startDate')?.valueChanges.subscribe((startDateValue) => {
      if (startDateValue) {
        this.endDateMin = this.formatDate(new Date(startDateValue));  // Definir mínimo de endDate
        this.reservationForm.get('endDate')?.enable();  // Habilitar endDate
      } else {
        this.reservationForm.get('endDate')?.disable();  // Si no hay startDate, deshabilitar endDate
      }
    });
  }


  loadReservations() {
    this.reservationsService.getReservations().subscribe({
      next: (data) => {
        this.reservations = data;
        this.cdr.markForCheck()
      },
      error: (error) => {
        this.toastr.error('Error al cargar las reservaciones');
        console.error(error);
      },
    });
  }

  // Método para formatear la fecha como YYYY-MM-DD
  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  // Validador para asegurar que la reserva no sea para el mismo día
  futureDateValidator(control: AbstractControl): ValidationErrors | null {
    const startDateValue = control.value;
    const startDate = startDateValue ? new Date(startDateValue) : new Date();
    const today = new Date();
    today.setHours(0, 0, 0, 0);  // Establecer las horas a medianoche
    return startDate > today ? null : {futureDate: true};
  }

  // Validador para asegurar que la estadía no supere los 3 días
  maxStayValidator(control: AbstractControl): ValidationErrors | null {
    const startDateValue = this.reservationForm?.get('startDate')?.value;
    const startDate = startDateValue ? new Date(startDateValue) : new Date();
    const endDate = new Date(control.value);
    const diffDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays <= 3 ? null : {maxStay: true};
  }

  // Validador para asegurar que la reserva no sea con más de 30 días de anticipación
  bookingWindowValidator(control: AbstractControl): ValidationErrors | null {
    const endDate = new Date(control.value);
    const today = new Date();
    const diffDays = Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays <= 30 ? null : {bookingWindow: true};
  }

  // Método para crear una reserva
  makeReservation() {
    if (this.reservationForm.valid) {
      const reservationData = {
        userId: this.reservationForm.value.userId,
        roomId: this.reservationForm.value.roomId,
        startDate: this.reservationForm.value.startDate,
        endDate: this.reservationForm.value.endDate
      };

      this.reservationsService.createReservation(reservationData).subscribe({
        next: () => {
          this.toastr.success('Reserva realizada con éxito');
          this.reservationForm.reset();
          this.loadReservations();
          this.cdr.markForCheck();  // Forzar la detección de cambios

        },
        error: (error) => {
          this.toastr.error('Error al realizar la reserva');
          console.error(error);
        }
      });
    } else {
      this.toastr.error('Formulario inválido');
    }
  }

  loadUsers(): void {
    this.usersService.getUsers().subscribe({
      next: (data) => (this.users = data),
      error: (error) => {
        console.error('Error al cargar usuarios', error);
        this.toastr.error('Error al cargar usuarios');
      },
    });
  }

  loadAvailableRooms(): void {
    this.roomsService.getAvailableRooms().subscribe({
      next: (data) => (this.rooms = data),
      error: (error) => {
        console.error('Error al cargar habitaciones', error);
        this.toastr.error('Error al cargar habitaciones');
      },
    });
  }

  deleteReservation() {
    this.reservationsService.deleteReservation(this.idForDeleteSelected).subscribe({
      next: () => {
        this.toastr.success('Reserva eliminada con éxito');
        this.loadReservations();
        this.closeModalDelete();
      },
      error: (error) => {
        this.toastr.error('Error al eliminar la reserva');
        console.error(error);
        this.closeModalDelete();
      }
    });

  }

  openModalDelete(id: number) {
    this.showModalDelete = true;
    this.idForDeleteSelected = id;
  }

  closeModalDelete() {
    this.showModalDelete = false;
    this.idForDeleteSelected = 0;
  }

  // Cargar una reservación para editar
  openEditReservation(reservation: Reservation) {
    console.log(reservation)
    this.isEditMode = true;  // Cambiar a modo edición
    this.reservationToEdit = reservation;  // Guardar la reservación que se va a editar
    this.reservationForm.patchValue({  // Llenar el formulario con los valores de la reservación a editar
      userId: reservation.userId,
      roomId: reservation.roomId,
      startDate: reservation.start_date,
      endDate: reservation.end_date
    });
  }

  // Método para guardar o actualizar una reservación
  saveReservation() {
    if (this.reservationForm.valid) {
      const reservationData = {
        userId: Number(this.reservationForm.value.userId),
        roomId: this.reservationForm.value.roomId,
        startDate: this.reservationForm.value.startDate,
        endDate: this.reservationForm.value.endDate
      };

      console.log(18)
      debugger
      if (this.isEditMode && this.reservationToEdit) {
        // Si estamos en modo edición, actualizar la reservación existente
        this.reservationsService.updateReservation(this.reservationToEdit.id, reservationData).subscribe({
          next: () => {
            this.toastr.success('Reservación actualizada con éxito');
            this.loadReservations();
            this.resetForm();
          },
          error: (error) => {
            this.toastr.error('Error al actualizar la reservación');
            console.error(error);
          }
        });
      } else {
        debugger
        // Si no estamos en modo edición, crear una nueva reservación
        this.reservationsService.createReservation(reservationData).subscribe({
          next: () => {
            this.toastr.success('Reservación creada con éxito');
            this.loadReservations();
            this.resetForm();
          },
          error: (error) => {
            this.toastr.error('Error al crear la reservación');
            console.error(error);
          }
        });
      }
    } else {
      this.toastr.error('Formulario inválido');
    }
  }

  resetForm() {
    this.reservationForm.reset();
    this.isEditMode = false;
    this.reservationToEdit = null;
  }
}

